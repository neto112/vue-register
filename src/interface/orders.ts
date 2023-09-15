export interface IOrder {
  id?: number;
  cliente: string;
  dataEmissao: string;
  valorTotal: number;
  itens: IOrderItem[];
}

export interface IOrderItem {
  descricao: string;
  quantidade: number;
}

export interface IOrdersState {
  pedidos: IOrder[];
}

export interface ICliente {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
}

export interface IItem {
  id: number;
  produto: IOrderItem;
  valor: number;
  quantidade: number;
  subtotal: number;
}
