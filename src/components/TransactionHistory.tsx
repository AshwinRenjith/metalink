
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowUpRight, RefreshCw } from 'lucide-react';
import { TRANSACTIONS } from '@/lib/constants';

const TransactionHistory = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Transaction History</h2>
        <button className="flex items-center text-sm text-slate-400 hover:text-white transition-colors duration-200">
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Currency
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {TRANSACTIONS.map((transaction) => (
                <tr key={transaction.id} className="transaction-item">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'send' 
                          ? 'bg-red-500/10 text-red-400' 
                          : transaction.type === 'receive' 
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {transaction.type === 'send' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : transaction.type === 'receive' ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {transaction.type === 'send' 
                            ? 'Sent' 
                            : transaction.type === 'receive' 
                            ? 'Received' 
                            : 'Exchanged'}
                        </div>
                        <div className="text-sm text-slate-400 truncate max-w-[120px]">
                          {transaction.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">
                      {transaction.type === 'send' ? '-' : '+'}{transaction.amount}
                    </div>
                    <div className="text-xs text-slate-400">
                      ${transaction.valueUSD}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">{transaction.flag}</span>
                      <span className="text-sm text-white">{transaction.currency}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-slate-300">{transaction.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <Badge className={
                      transaction.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                        : transaction.status === 'pending' 
                        ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    }>
                      {transaction.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {TRANSACTIONS.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-slate-400">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
