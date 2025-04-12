import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { transactionService, TransactionFilters, PaginatedResponse } from '../../services/transactionService';
import { Transaction } from '../../models/Transaction';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DatePicker } from '../ui/date-picker';

export function TransactionHistory() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await transactionService.getTransactions(user.id, filters);
        setTransactions(response.data);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user, filters]);

  const handleFilterChange = (key: keyof TransactionFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <div className="flex gap-4 mt-4">
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange('type', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="received">Received</SelectItem>
            </SelectContent>
          </Select>

          <DatePicker
            date={filters.startDate}
            onSelect={(date) => handleFilterChange('startDate', date)}
            placeholder="Start date"
          />

          <DatePicker
            date={filters.endDate}
            onSelect={(date) => handleFilterChange('endDate', date)}
            placeholder="End date"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {format(new Date(transaction.timestamp), 'MMM dd, yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  {transaction.senderId === user?.id ? 'Sent' : 'Received'}
                </TableCell>
                <TableCell>
                  {transaction.amount} {transaction.currency}
                </TableCell>
                <TableCell>
                  <span className={`capitalize ${
                    transaction.status === 'completed' ? 'text-green-500' :
                    transaction.status === 'failed' ? 'text-red-500' :
                    'text-yellow-500'
                  }`}>
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell>
                  {transaction.metadata?.description || 'No description'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Page {filters.page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleFilterChange('page', Math.max(1, (filters.page || 1) - 1))}
              disabled={filters.page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => handleFilterChange('page', Math.min(totalPages, (filters.page || 1) + 1))}
              disabled={filters.page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 