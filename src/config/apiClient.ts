import axios from 'axios';
import { API_BASE_URL } from './env';

export const createApiClient = (endpoint: string) => {
  return axios.create({
    baseURL: `${API_BASE_URL}/api/${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};