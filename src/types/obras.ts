export interface Obra {
  id: number;
  nome: string;
  descricao: string;
  status: 'Planejada' | 'Em andamento' | 'Concluída' | 'Paralisada';
  data_inicio: string;
  data_conclusao: string | null;
  orcamento_total: number;
  gastos_atualizados: number;
  percentual_concluido: number;
  latitude: number | null;
  longitude: number | null;
  enderecoId: number | null;
}

export interface CreateObraDto {
  nome: string;
  descricao: string;
  status: 'Planejada' | 'Em andamento' | 'Concluída' | 'Paralisada';
  data_inicio: string;
  data_conclusao?: string | null;
  orcamento_total: number;
  gastos_atualizados?: number;
  percentual_concluido?: number;
  latitude?: number | null;
  longitude?: number | null;
  fornecedoresId?: number[];
  equipamentosId?: number[];
}

export interface UpdateObraDto {
  nome?: string;
  descricao?: string;
  status?: 'Planejada' | 'Em andamento' | 'Concluída' | 'Paralisada';
  data_inicio?: string;
  data_conclusao?: string | null;
  orcamento_total?: number;
  gastos_atualizados?: number;
  percentual_concluido?: number;
  latitude?: number | null;
  longitude?: number | null;
  fornecedoresId?: number[];
  equipamentosId?: number[];
}