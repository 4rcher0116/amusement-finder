import { createApiClient } from '../config/apiClient';
import { UserDto } from '../models/dtos';

const apiClient = createApiClient('User');

export const getUserId = async (requestedUsername: string): Promise<UserDto> => {
    const response = await apiClient.post(`/create?username=${requestedUsername}`);
    return response.data as UserDto;
};
