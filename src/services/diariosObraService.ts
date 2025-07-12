import { ApiClient } from '@/lib/api';
import { API_CONFIG } from '@/lib/config';
import { DiarioDeObra } from '@/types/materiais';

class DiariosObraService {
  async getAllDiariosObra(): Promise<DiarioDeObra[]> {
    try {
      const response = await ApiClient.get(API_CONFIG.ENDPOINTS.DIARIO_OBRA);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar diários de obra:', error);
      return [];
    }
  }

  async getDiarioObraById(id: number): Promise<DiarioDeObra | null> {
    try {
      const response = await ApiClient.get(`${API_CONFIG.ENDPOINTS.DIARIO_OBRA}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar diário de obra:', error);
      return null;
    }
  }
}

export default new DiariosObraService();
