// import { IProduct } from "./product";

export interface IOrder {
  id: number;
  cliente: [];
  dataEmissao: string;
  valorTotal: number;
  itens: [];
}



export interface IOrderState {
  orders: IOrder[];
}

