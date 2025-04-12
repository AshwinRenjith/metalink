import axios from 'axios';
import { env } from '../lib/config';
import { Transaction } from '../models/Transaction';

const API_URL = `http://localhost:${env.VITE_APP_PORT}/api`;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface TransactionFilters {
  page?: number;
  pageSize?: number;
  status?: Transaction['status'];
  startDate?: Date;
  endDate?: Date;
  type?: 'sent' | 'received';
}

export const transactionService = {
  async createTransaction(transaction: Omit<Transaction, 'id' | 'timestamp'>): Promise<Transaction> {
    const response = await axios.post(`${API_URL}/transactions`, transaction, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  async getTransactions(
    userId: string,
    filters: TransactionFilters = {}
  ): Promise<PaginatedResponse<Transaction>> {
    const { page = 1, pageSize = 10, status, startDate, endDate, type } = filters;
    
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(status && { status }),
      ...(startDate && { startDate: startDate.toISOString() }),
      ...(endDate && { endDate: endDate.toISOString() }),
      ...(type && { type })
    });

    const response = await axios.get(`${API_URL}/transactions?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  async getTransactionById(id: string): Promise<Transaction> {
    const response = await axios.get(`${API_URL}/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
}; 