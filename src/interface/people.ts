export interface IPerson {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
}

export interface IState {
  pessoas: IPerson[];
}