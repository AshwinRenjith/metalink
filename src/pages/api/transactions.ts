import { NextApiRequest, NextApiResponse } from 'next';
import { getTransactions, createTransaction } from '@/services/databaseService';
import { validateSession } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Validate user session
    const session = await validateSession(req);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    switch (req.method) {
      case 'GET':
        const { page, limit, currency, type, status } = req.query;
        
        const result = await getTransactions({
          address: session.address,
          page: Number(page) || 1,
          limit: Number(limit) || 10,
          currency: currency as string,
          type: type as 'send' | 'receive' | 'exchange',
          status: status as 'pending' | 'completed' | 'failed'
        });
        
        return res.status(200).json(result);

      case 'POST':
        const transaction = await createTransaction(req.body);
        return res.status(201).json(transaction);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}