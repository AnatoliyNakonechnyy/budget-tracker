import { API_ENDPOINTS, BASE_URL } from '../../../utils/constants/api';
import type { RegistrationFormDataType } from '../../auth/model/types';

export const postUser = async (data: RegistrationFormDataType) => {
  const dataForSubmit = {
    name: data.name,
    email: data.email,
    password: data.password,
    currency: 'USD',
    limit: 1000,
  };

  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.USER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataForSubmit),
  });

  if (!response.ok) {
    throw new Error('Failed to post user data');
  }

  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.USER}`);

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
};
