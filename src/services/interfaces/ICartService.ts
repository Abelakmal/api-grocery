import { ICart } from "../../types/cart.type";

export interface ICartService {
    addCartService(cart:ICart):Promise<void>
    getCartService():Promise<ICart[]>
    updateCartService(id:number,cart:ICart):Promise<ICart>
    deleteCartService(id:number):Promise<void>
}