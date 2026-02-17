import { API_ENDPOINTS, BASE_URL } from '../../../utils/constants/api';

export const fetchTransactions = async () => {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.TRANSACTIONS}`);

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
};
