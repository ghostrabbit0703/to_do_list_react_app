import { API_URL } from './api.service.js';
export const getAll = async () => {
  try{
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if(!response.ok){
      throw new Error(`Error con la peticion: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  }catch (e){
    throw e;
  }
};