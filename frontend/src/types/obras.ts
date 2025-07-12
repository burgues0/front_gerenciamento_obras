export interface Obra {
  id: number;
  nome: string;
  status: string;
  data_inicio: string;
  data_conclusao?: string;
  orcamento_total: number;
  percentual_concluido: number;
  endereco?: string;
  descricao?: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}
