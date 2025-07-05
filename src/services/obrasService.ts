import { Obra, CreateObraDto, UpdateObraDto } from '@/types/obras';

const API_BASE_URL = 'http://localhost:3000';

export const obrasService = {
  async getAllObras(): Promise<Obra[]> {
    const response = await fetch(`${API_BASE_URL}/obras`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao listar obras.');
    }
    return response.json();
  },

};
