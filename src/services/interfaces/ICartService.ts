import { ICart } from "../../types/cart.type";

export interface ICartService {
  addCartService(cart: ICart): Promise<void>;
  getCartService(userId: number): Promise<ICart[]>;
  updateCartService(id: number, cart: ICart, userId: number): Promise<ICart>;
  deleteCartService(id: number, userId: number): Promise<void>;
  deleteManyCartService(userId:number): Promise<void>
}
