import { ITransactionUpdate } from "../types/transaction.type";
import { midtranstApiUrl } from "./config";

export const checkPayMethod = (
  data: ITransactionUpdate,
  callback: any
): ITransactionUpdate => {
  if (callback.payment_type === "qris" || callback.payment_type === "gopay") {
    data.payment_method = callback.payment_type;
    data.payment_link = `${midtranstApiUrl}/v2/qris/${callback.transaction_id}/qr-code`;
  } else if (callback.payment_type === "bank_transfer") {
    data.payment_method = callback.payment_type;
    data.va_number = callback.va_numbers[0].va_number;
  } else {
    data.payment_method = callback.payment_type;
  }
  return data;
};
