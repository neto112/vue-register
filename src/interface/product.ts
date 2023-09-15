export interface IProduct {
  id?: number;
  descricao: string;
  valoUnitario: number;
}

export interface IProductsState {
  products: IProduct[];
}