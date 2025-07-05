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

  async getObraById(id: number): Promise<Obra> {
    const response = await fetch(`${API_BASE_URL}/obras/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Obra não encontrada.');
    }
    return response.json();
  },

  async createObra(data: CreateObraDto): Promise<Obra> {
    const response = await fetch(`${API_BASE_URL}/obras`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao criar obra.');
    }
    return response.json();
  },

  async updateObra(id: number, data: UpdateObraDto): Promise<Obra> {
    const response = await fetch(`${API_BASE_URL}/obras/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao atualizar obra.');
    }
    return response.json();
  },

  async deleteObra(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/obras/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao remover obra.');
    }
  },
};
