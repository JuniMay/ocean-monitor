import axios from 'axios';

export const getUsers = async () => {
  const response = await axios.get('/api/users');
  return response.data;
};

export const updateUserRole = async (userId: number, role: string) => {
  const response = await axios.put(`/api/users/${userId}`, { role });
  return response.data;
};