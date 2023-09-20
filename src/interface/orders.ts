export interface IOrder {
  id?: number;
  cliente: ICustomer;
  dataEmissao: string;
  valorTotal: number;
  itens: IItem[];
}

export interface ICustomer {
  id?: number;
  nome: string;
}

export interface IItem {
  id?: number;
  produto: IProduct;
  valor: number;
  quantidade: number;
  subtotal: number;
}

export interface IProduct {
  id?: number;
  description: string;
}

export interface IOrdersState {
  pedidos: IOrder[];
  clientes: ICustomer[];
  produtos: IProduct[];
}
