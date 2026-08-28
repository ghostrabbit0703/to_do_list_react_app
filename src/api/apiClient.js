import {API_ENDPOINTS} from './endpoints';
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};


class ApiClient {
  constructor() {
    this.baseURL = API_URL;
    this.headers = { ...defaultHeaders };
  }

  async handleResponse(response) {
    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {

      }
      
      throw new Error(errorMessage);
    }
    const data = await response.json();

    if (data && typeof data === 'object' && 'success' in data) {
      if (!data.success) {
        throw new Error(data.message || 'Error en la operación');
      }
      return data.data !== undefined ? data.data : data;
    }
    return data;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: options.method || 'GET',
      headers: {
        ...this.headers,
        ...options.headers,
      },
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
      }
      
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

export const get = (endpoint, options) => apiClient.get(endpoint, options);
export const post = (endpoint, body, options) => apiClient.post(endpoint, body, options);
export const put = (endpoint, body, options) => apiClient.put(endpoint, body, options);
export const patch = (endpoint, body, options) => apiClient.patch(endpoint, body, options);
export const del = (endpoint, options) => apiClient.delete(endpoint, options);

export default apiClient;