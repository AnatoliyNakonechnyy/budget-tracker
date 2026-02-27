import { API_ENDPOINTS, BASE_URL } from '../../../utils/constants/api';
import type { Transaction } from '../model/types';

export const fetchTransactions = async () => {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.TRANSACTIONS}`);

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
};

export const fetchDeleteTransaction = async (transactionId: string) => {
  const response = await fetch(
    `${BASE_URL}${API_ENDPOINTS.TRANSACTIONS}/${transactionId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to delete transaction');
  }

  return response.json();
};

export const fetchPutTransaction = async (transaction: Transaction) => {
  const response = await fetch(
    `${BASE_URL}${API_ENDPOINTS.TRANSACTIONS}/${transaction.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to put transaction');
  }

  return response.json();
};

export const fetchPostTransaction = async (transaction: Transaction) => {
  const response = await fetch(`${BASE_URL}${API_ENDPOINTS.TRANSACTIONS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error('Failed to post transaction');
  }

  return response.json();
};
