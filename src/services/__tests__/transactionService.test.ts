import { transactionService } from '../transactionService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TransactionService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('createTransaction', () => {
    it('should create a transaction successfully', async () => {
      const mockTransaction = {
        senderId: '1',
        receiverId: '2',
        amount: 100,
        currency: 'USD',
        status: 'pending' as const,
        metadata: {
          description: 'Test transaction'
        }
      };

      const mockResponse = {
        data: {
          ...mockTransaction,
          id: '123',
          timestamp: new Date()
        }
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);
      localStorage.setItem('token', 'test-token');

      const result = await transactionService.createTransaction(mockTransaction);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/transactions'),
        mockTransaction,
        {
          headers: {
            Authorization: 'Bearer test-token'
          }
        }
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('should handle transaction creation errors', async () => {
      const error = new Error('Transaction failed');
      mockedAxios.post.mockRejectedValueOnce(error);
      localStorage.setItem('token', 'test-token');

      await expect(transactionService.createTransaction({
        senderId: '1',
        receiverId: '2',
        amount: 100,
        currency: 'USD',
        status: 'pending'
      })).rejects.toThrow('Transaction failed');
    });
  });

  describe('getTransactions', () => {
    it('should fetch transactions successfully', async () => {
      const mockTransactions = [
        {
          id: '1',
          senderId: '1',
          receiverId: '2',
          amount: 100,
          currency: 'USD',
          status: 'completed' as const,
          timestamp: new Date()
        }
      ];

      const mockResponse = {
        data: mockTransactions
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);
      localStorage.setItem('token', 'test-token');

      const result = await transactionService.getTransactions('1');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/transactions?userId=1'),
        {
          headers: {
            Authorization: 'Bearer test-token'
          }
        }
      );

      expect(result).toEqual(mockTransactions);
    });

    it('should handle fetch errors', async () => {
      const error = new Error('Failed to fetch transactions');
      mockedAxios.get.mockRejectedValueOnce(error);
      localStorage.setItem('token', 'test-token');

      await expect(transactionService.getTransactions('1')).rejects.toThrow('Failed to fetch transactions');
    });
  });

  describe('getTransactionById', () => {
    it('should fetch a single transaction successfully', async () => {
      const mockTransaction = {
        id: '1',
        senderId: '1',
        receiverId: '2',
        amount: 100,
        currency: 'USD',
        status: 'completed' as const,
        timestamp: new Date()
      };

      const mockResponse = {
        data: mockTransaction
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);
      localStorage.setItem('token', 'test-token');

      const result = await transactionService.getTransactionById('1');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/transactions/1'),
        {
          headers: {
            Authorization: 'Bearer test-token'
          }
        }
      );

      expect(result).toEqual(mockTransaction);
    });

    it('should handle single transaction fetch errors', async () => {
      const error = new Error('Failed to fetch transaction');
      mockedAxios.get.mockRejectedValueOnce(error);
      localStorage.setItem('token', 'test-token');

      await expect(transactionService.getTransactionById('1')).rejects.toThrow('Failed to fetch transaction');
    });
  });
}); 