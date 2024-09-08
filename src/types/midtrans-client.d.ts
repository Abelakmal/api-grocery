declare module "midtrans-client" {
  export class CoreApi {
    constructor(options: { isProduction: boolean; serverKey: string });
    charge(args: any): Promise<any>;
  }

  export class Snap {
    constructor(options: { isProduction: boolean; serverKey: string });
    createTransaction(
      args: any
    ): Promise<{ token: string; redirect_url: string }>;
  }
}
