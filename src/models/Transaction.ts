import mongoose from 'mongoose';

export interface Transaction {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  transactionHash?: string;
  metadata?: {
    description?: string;
    category?: string;
    tags?: string[];
  };
}

const transactionSchema = new mongoose.Schema<Transaction>({
  id: { type: String, required: true },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  timestamp: { type: Date, default: Date.now },
  transactionHash: { type: String },
  metadata: {
    description: { type: String },
    category: { type: String },
    tags: { type: [String] }
  }
});

const Transaction = mongoose.models.Transaction || mongoose.model<Transaction>('Transaction', transactionSchema);

export default Transaction;