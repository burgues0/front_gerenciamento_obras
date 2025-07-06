import { API_CONFIG } from './config';

export class ApiClient {
  private static getHeaders(includeAuth = true): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && typeof document !== 'undefined') {
      const token = document.cookie
        .split(';')
        .find(row => row.trim().startsWith('auth-token='))
        ?.split('=')[1];
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private static getBaseUrl(isAuthEndpoint: boolean): string {
    return isAuthEndpoint ? API_CONFIG.AUTH_BASE_URL : API_CONFIG.OBRAS_BASE_URL;
  }

  static async post(endpoint: string, data: any, includeAuth = true, isAuthEndpoint = false) {
    const baseUrl = this.getBaseUrl(isAuthEndpoint);
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(includeAuth),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro na requisição');
    }

    return response.json();
  }

  static async get(endpoint: string, includeAuth = true, isAuthEndpoint = false) {
    const baseUrl = this.getBaseUrl(isAuthEndpoint);
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(includeAuth),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro na requisição');
    }

    return response.json();
  }

  static async put(endpoint: string, data: any, includeAuth = true, isAuthEndpoint = false) {
    const baseUrl = this.getBaseUrl(isAuthEndpoint);
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(includeAuth),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro na requisição');
    }

    return response.json();
  }

  static async delete(endpoint: string, includeAuth = true, isAuthEndpoint = false) {
    const baseUrl = this.getBaseUrl(isAuthEndpoint);
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(includeAuth),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro na requisição');
    }

    return response.json();
  }
}

export const AuthService = {
  login: (email: string, senha: string) => 
    ApiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, { email, senha }, false, true),
  
  logout: () => 
    ApiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {}, true, true),
  
  verify: () => 
    ApiClient.get(API_CONFIG.ENDPOINTS.AUTH.VERIFY, true, true),
};

export const ObrasService = {
  getAll: () => ApiClient.get(API_CONFIG.ENDPOINTS.OBRAS, true, false),
  getById: (id: string) => ApiClient.get(`${API_CONFIG.ENDPOINTS.OBRAS}/${id}`, true, false),
  create: (data: any) => ApiClient.post(API_CONFIG.ENDPOINTS.OBRAS, data, true, false),
  update: (id: string, data: any) => ApiClient.put(`${API_CONFIG.ENDPOINTS.OBRAS}/${id}`, data, true, false),
  delete: (id: string) => ApiClient.delete(`${API_CONFIG.ENDPOINTS.OBRAS}/${id}`, true, false),
};

export const MateriaisService = {
  getAll: () => ApiClient.get(API_CONFIG.ENDPOINTS.MATERIAIS, true, false),
  getById: (id: string) => ApiClient.get(`${API_CONFIG.ENDPOINTS.MATERIAIS}/${id}`, true, false),
  create: (data: any) => ApiClient.post(API_CONFIG.ENDPOINTS.MATERIAIS, data, true, false),
  update: (id: string, data: any) => ApiClient.put(`${API_CONFIG.ENDPOINTS.MATERIAIS}/${id}`, data, true, false),
  delete: (id: string) => ApiClient.delete(`${API_CONFIG.ENDPOINTS.MATERIAIS}/${id}`, true, false),
};

export const EquipamentosService = {
  getAll: () => ApiClient.get(API_CONFIG.ENDPOINTS.EQUIPAMENTOS, true, false),
  getById: (id: string) => ApiClient.get(`${API_CONFIG.ENDPOINTS.EQUIPAMENTOS}/${id}`, true, false),
  create: (data: any) => ApiClient.post(API_CONFIG.ENDPOINTS.EQUIPAMENTOS, data, true, false),
  update: (id: string, data: any) => ApiClient.put(`${API_CONFIG.ENDPOINTS.EQUIPAMENTOS}/${id}`, data, true, false),
  delete: (id: string) => ApiClient.delete(`${API_CONFIG.ENDPOINTS.EQUIPAMENTOS}/${id}`, true, false),
};
