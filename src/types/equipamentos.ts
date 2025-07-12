export interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
  marca: string;
  modelo: string;
  numeroDeSerie: string;
  estado: string;
  fornecedorId: number;
}

export interface Obra {
  id: number;
  data_conclusao?: string;
  data_inicio: string;
  nome: string;
  orcamento_total: number;
  percentual_concluido: number;
  status: string;
}

export interface CreateEquipamentoDto {
  nome: string;
  tipo: string;
  marca: string;
  modelo: string;
  numeroDeSerie: string;
  estado: string;
  fornecedorId: number;
  obrasId?: number[];
}

export interface UpdateEquipamentoDto {
  nome?: string;
  tipo?: string;
  marca?: string;
  modelo?: string;
  numeroDeSerie?: string;
  estado?: string;
  fornecedorId?: number;
  obrasId?: number[];
}

export interface UpdateEquipamentoObrasDto {
  obraIds: number[];
}