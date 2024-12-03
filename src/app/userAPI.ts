import axios from 'axios';
import { UserDto } from '../models/dtos';

const apiClient = axios.create({
  baseURL: 'https://localhost:7282/api/User',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUserId = async (requestedUsername: string): Promise<UserDto> => {
    const response = await apiClient.post(`/create?username=${requestedUsername}`);
    
    return response.data as UserDto;
};
