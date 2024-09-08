import { nanoid } from "nanoid";
import { ApiError } from "../../error/ApiError";
import { midtransServerkey, midtranstApiUrl } from "../../helper/config";
import { CartRepository } from "../../repository/prisma/CartRepository";
import {
  ITransaction,
  ITransactionResponse,
  ITransactionUpdate,
} from "../../types/transaction.type";
import { ITransactionService } from "../interfaces/ITransactionService";
import midtransClient from "midtrans-client";
import { UserRepository } from "../../repository/prisma/UserRepository";
import { TransactionRepository } from "../../repository/prisma/TransactionRepository";
import crypto from "crypto";
import { checkPayMethod } from "../../helper/checkPayMethod";
import { PENDING_PAYMENT } from "../../helper/constant";
import { transactions_status } from "@prisma/client";
import { updateStatusInMidtrans } from "../../helper/midtrans";

export class TransactionService implements ITransactionService {
  private cartRepository: CartRepository;
  private userRepository: UserRepository;
  private transactionRepository: TransactionRepository;

  constructor() {
    this.cartRepository = new CartRepository();
    this.userRepository = new UserRepository();
    this.transactionRepository = new TransactionRepository();
  }

  public async createService(
    userId: number,
    address_id: number,
    total: number
  ): Promise<ITransactionResponse> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new ApiError("Unauthorized", 401);
      }
      const carts = await this.cartRepository.getByUserIdAndAddressId(
        userId,
        address_id
      );

      if (carts.length < 1) {
        throw new ApiError("Tidak ada Cart", 404);
      }

      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: midtransServerkey,
      });
      const transaction_id = `TRX-${nanoid(4)}-${nanoid(8)}`;
      const ongkosKirim = 50000;
      const biayaJasaAplikasi = 3000;

      const parameter = {
        transaction_details: {
          order_id: transaction_id,
          gross_amount: total,
        },
        item_details: [
          ...carts.map((cart) => {
            return {
              id: cart.id,
              price: cart.price_at_time,
              quantity: cart.quantity,
              name: cart.stock.product.name,
            };
          }),
          {
            id: "ongkos_kirim",
            price: ongkosKirim,
            quantity: 1,
            name: "Ongkos Kirim",
          },
          {
            id: "biaya_jasa_aplikasi",
            price: biayaJasaAplikasi,
            quantity: 1,
            name: "Biaya Jasa Aplikasi",
          },
        ],
        customer_details: {
          first_name: user.name,
          email: user.email,
          phone: user.phone,
        },
      };

      console.log(parameter);

      const { token, redirect_url } = await snap.createTransaction(parameter);

      await this.transactionRepository.create(
        transaction_id,
        total,
        userId,
        token,
        redirect_url,
        address_id,
        carts
      );

      return {
        id: transaction_id,
        status: PENDING_PAYMENT,
        carts: carts,
        snap_token: token,
        snap_redirect_url: redirect_url,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getTransactionService(
    transaction_id: string
  ): Promise<ITransaction> {
    try {
      const data = await this.transactionRepository.getTransactionById(
        transaction_id
      );
      if (!data) {
        throw new ApiError("Transaction is not found", 404);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getTransactionsService(
    status: transactions_status | undefined
  ): Promise<ITransaction[]> {
    try {
      const data = this.transactionRepository.getTransactions(status);

      return data;
    } catch (error) {
      throw error;
    }
  }

  public async handleStatusService(callback: any): Promise<void> {
    try {
      const transaction = await this.transactionRepository.getTransactionById(
        callback.order_id
      );

      if (!transaction) {
        throw new ApiError("Transaction Tidak Ditemukan", 404);
      }

      const hash = crypto
        .createHash("sha512")
        .update(
          `${transaction.id}${callback.status_code}${callback.gross_amount}${midtransServerkey}`
        )
        .digest("hex");

      if (callback.signature_key !== hash) {
        throw new ApiError("Invalid Signature key", 400);
      }

      let transactionStatus = callback.transaction_status;
      let fraudStatus = callback.fraud_status;

      let data: ITransactionUpdate = {
        payment_method: callback.payment_type,
        status: "PAID",
      };

      if (transactionStatus === "capture" && fraudStatus === "accept") {
        for (const item of transaction.transactions_items) {
          if (!item.stock || item.quantity > item.stock.amount) {
            data.status = "CANCELED";
            await Promise.all([
              updateStatusInMidtrans(
                `${midtranstApiUrl}/v2/${callback.order_id}/cancel`
              ),
              this.transactionRepository.updateTransactionStatus(
                transaction.id,
                data
              ),
            ]);

            throw new ApiError("Stock tidak mencukupi", 400);
          }
        }
        await this.transactionRepository.updateTransaction(
          transaction.id,
          data,
          transaction.transactions_items
        );
      } else if (transactionStatus == "settlement") {
        for (const item of transaction.transactions_items) {
          if (!item.stock || item.quantity > item.stock.amount) {
            data.status = "CANCELED";
            await Promise.all([
              updateStatusInMidtrans(
                `${midtranstApiUrl}/v2/${callback.order_id}/refund`
              ),
              this.transactionRepository.updateTransactionStatus(
                transaction.id,
                data
              ),
            ]);

            throw new ApiError("Stock tidak mencukupi", 400);
          }
        }
        await this.transactionRepository.updateTransaction(
          transaction.id,
          data,
          transaction.transactions_items
        );
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        data.status = "CANCELED";
        await this.transactionRepository.updateTransactionStatus(
          transaction.id,
          data
        );
      } else if (transactionStatus == "pending") {
        data = checkPayMethod(data, callback);
        data.status = "PENDING_PAYMENT";
        await this.transactionRepository.updateTransactionStatus(
          transaction.id,
          data
        );
      }
    } catch (error) {
      throw error;
    }
  }
}
