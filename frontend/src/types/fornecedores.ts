export interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
}

export interface CreateFornecedorDto {
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  endereco: string;
}

export interface UpdateFornecedorDto {
  nome?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
}
