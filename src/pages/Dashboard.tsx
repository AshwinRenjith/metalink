
import React from 'react';
import Navbar from '@/components/Navbar';
import CurrencyCard, { CurrencyData } from '@/components/CurrencyCard';
import TransactionHistory from '@/components/TransactionHistory';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, PlusCircle, RefreshCw } from 'lucide-react';
import { CURRENCIES } from '@/lib/constants';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const totalBalanceUSD = CURRENCIES.reduce((sum, currency) => sum + currency.value, 0);
  
  return (
    <div className="min-h-screen bg-metalink-blue">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your BRICS currencies</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" className="flex items-center gap-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            
            <Button className="metalink-button-secondary flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add Funds
            </Button>
            
            <Link to="/exchange">
              <Button className="metalink-button flex items-center gap-1">
                <ArrowRight className="h-4 w-4" />
                Exchange
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-metalink-blue to-slate-900 border border-slate-700 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-slate-300 font-medium">Total Balance</h2>
              <div className="flex items-center">
                <p className="text-3xl font-bold text-white">${totalBalanceUSD.toLocaleString()}</p>
                <span className="ml-2 px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded">+2.5%</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <button className="flex items-center text-slate-300 hover:text-white transition-all duration-200">
                <span className="mr-1">View Details</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Your Currencies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CURRENCIES.map((currency) => (
            <CurrencyCard key={currency.code} currency={currency} />
          ))}
        </div>
        
        <div className="mb-12">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
