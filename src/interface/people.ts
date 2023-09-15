export interface IPerson {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
}

// export interface IOrder {
//   id: number;
//   cliente: IPerson;
//   dataEmissao: string;
//   valorTotal: number;
//   itens: IOrderItem[];
// }

// export interface IOrderItem {
//   id: number;
//   produto: IProduct;
//   valor: number;
//   quantidade: number;
//   subtotal: number;
// }

// export interface IProduct {
//   id: number;
//   descricao: string;
//   valorUnitario: number;
// }

export interface IState {
  pessoas: IPerson[];
}