import { ICart } from "../../types/cart.type";
import { ICartService } from "../interfaces/ICartService";
import { CartRepository } from "../../repository/prisma/CartRepository";
import { ApiError } from "../../error/ApiError";

export class CartService implements ICartService {
  private cartRepository: CartRepository;

  constructor() {
    this.cartRepository = new CartRepository();
  }

  public async addCartService(cart: ICart): Promise<void> {
    try {
      const data = await this.cartRepository.getByProductId(cart.id);

      if (data) {
        throw new ApiError("Product sudah ada", 400); 
      }
      await this.cartRepository.create(cart);
    } catch (error) {
      throw error;
    }
  }

  public async getCartService(): Promise<ICart[]> {
    try {
      const result = await this.cartRepository.get();
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async updateCartService(id: number, cart: ICart): Promise<ICart> {
    try {
      const isExist = await this.cartRepository.getById(id);

      if (!isExist) {
        throw new ApiError("Id is not found", 404);
      }
      const result = await this.cartRepository.update(id, cart);
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async deleteCartService(id: number): Promise<void> {
    try {
      const isExist = await this.cartRepository.getById(id);

      if (!isExist) {
        throw new ApiError("Id is not found", 404);
      }

      await this.cartRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
