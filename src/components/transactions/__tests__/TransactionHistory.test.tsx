import { render, screen, waitFor } from '@testing-library/react';
import { TransactionHistory } from '../TransactionHistory';
import { useAuth } from '../../../hooks/useAuth';
import { transactionService } from '../../../services/transactionService';

jest.mock('../../../hooks/useAuth');
jest.mock('../../../services/transactionService');

const mockUser = {
  id: '1',
  email: 'test@example.com',
  username: 'testuser',
  createdAt: new Date()
};

const mockTransactions = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    amount: 100,
    currency: 'USD',
    status: 'completed' as const,
    timestamp: new Date(),
    metadata: {
      description: 'Test transaction'
    }
  }
];

describe('TransactionHistory', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser
    });
  });

  it('should display loading state initially', () => {
    (transactionService.getTransactions as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(<TransactionHistory />);
    expect(screen.getByText('Loading transactions...')).toBeInTheDocument();
  });

  it('should display transactions when loaded', async () => {
    (transactionService.getTransactions as jest.Mock).mockResolvedValue(mockTransactions);
    
    render(<TransactionHistory />);
    
    await waitFor(() => {
      expect(screen.getByText('Transaction History')).toBeInTheDocument();
      expect(screen.getByText('100 USD')).toBeInTheDocument();
      expect(screen.getByText('Test transaction')).toBeInTheDocument();
    });
  });

  it('should display error message when fetch fails', async () => {
    (transactionService.getTransactions as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    
    render(<TransactionHistory />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch/)).toBeInTheDocument();
    });
  });

  it('should display correct transaction type (Sent/Received)', async () => {
    const transactions = [
      ...mockTransactions,
      {
        id: '2',
        senderId: '2',
        receiverId: '1',
        amount: 50,
        currency: 'USD',
        status: 'completed' as const,
        timestamp: new Date(),
        metadata: {
          description: 'Received transaction'
        }
      }
    ];

    (transactionService.getTransactions as jest.Mock).mockResolvedValue(transactions);
    
    render(<TransactionHistory />);
    
    await waitFor(() => {
      expect(screen.getByText('Sent')).toBeInTheDocument();
      expect(screen.getByText('Received')).toBeInTheDocument();
    });
  });

  it('should display correct status colors', async () => {
    const transactions = [
      ...mockTransactions,
      {
        id: '2',
        senderId: '1',
        receiverId: '2',
        amount: 50,
        currency: 'USD',
        status: 'failed' as const,
        timestamp: new Date(),
        metadata: {
          description: 'Failed transaction'
        }
      }
    ];

    (transactionService.getTransactions as jest.Mock).mockResolvedValue(transactions);
    
    render(<TransactionHistory />);
    
    await waitFor(() => {
      const completedStatus = screen.getByText('completed');
      const failedStatus = screen.getByText('failed');
      
      expect(completedStatus).toHaveClass('text-green-500');
      expect(failedStatus).toHaveClass('text-red-500');
    });
  });
}); 