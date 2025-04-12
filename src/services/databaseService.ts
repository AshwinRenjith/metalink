import mongoose from 'mongoose';
import { config } from '@/lib/config';
import Transaction, { ITransaction } from '@/models/Transaction';

// Initialize MongoDB connection
export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    
    await mongoose.connect(config.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Create new transaction
export const createTransaction = async (transactionData: Omit<ITransaction, 'timestamp'>) => {
  await connectDB();
  const transaction = new Transaction(transactionData);
  return await transaction.save();
};

// Get transactions with pagination and filtering
export const getTransactions = async ({
  address,
  page = 1,
  limit = 10,
  currency,
  type,
  status
}: {
  address: string;
  page?: number;
  limit?: number;
  currency?: string;
  type?: 'send' | 'receive' | 'exchange';
  status?: 'pending' | 'completed' | 'failed';
}) => {
  await connectDB();
  
  const query: any = {
    $or: [
      { fromAddress: address },
      { toAddress: address }
    ]
  };
  
  if (currency) {
    query.$or = [
      { fromCurrency: currency },
      { toCurrency: currency }
    ];
  }
  
  if (type) query.type = type;
  if (status) query.status = status;
  
  const skip = (page - 1) * limit;
  
  const [transactions, total] = await Promise.all([
    Transaction.find(query)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Transaction.countDocuments(query)
  ]);
  
  return {
    transactions,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      hasMore: skip + transactions.length < total
    }
  };
};

// Update transaction status
export const updateTransactionStatus = async (
  transactionId: string,
  status: 'completed' | 'failed',
  hash?: string
) => {
  await connectDB();
  return await Transaction.findByIdAndUpdate(
    transactionId,
    { status, hash },
    { new: true }
  );
};

// Get transaction by hash
export const getTransactionByHash = async (hash: string) => {
  await connectDB();
  return await Transaction.findOne({ hash });
};