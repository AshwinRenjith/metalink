
import React from 'react';
import Navbar from '@/components/Navbar';
import TransactionHistory from '@/components/TransactionHistory';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCw } from 'lucide-react';

const Transactions = () => {
  return (
    <div className="min-h-screen bg-metalink-blue">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Transactions</h1>
            <p className="text-slate-400 mt-1">View your transaction history across all BRICS currencies</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="flex items-center gap-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            <Button variant="outline" className="flex items-center gap-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-sm">Total Transactions</p>
            <h3 className="text-2xl font-bold text-white">15</h3>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-sm">Total Sent</p>
            <h3 className="text-2xl font-bold text-red-400">$125.10</h3>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-sm">Total Received</p>
            <h3 className="text-2xl font-bold text-green-400">$143.65</h3>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-sm">Total Exchanged</p>
            <h3 className="text-2xl font-bold text-blue-400">$18.75</h3>
          </div>
        </div>
        
        <div className="bg-slate-800/10 backdrop-blur-sm border border-slate-800 rounded-xl p-6">
          <TransactionHistory />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-slate-400">
            All transactions are securely stored on the blockchain for transparency and verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
