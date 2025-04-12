
import React from 'react';
import { ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CurrencyData {
  code: string;
  name: string;
  balance: number;
  symbol: string;
  flag: string;
  change: number;
  value: number;
}

interface CurrencyCardProps {
  currency: CurrencyData;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ currency }) => {
  const { code, name, balance, symbol, flag, change, value } = currency;
  const isPositive = change >= 0;
  
  return (
    <div className="currency-card">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center">
          <div className="currency-flag">
            <span className="text-xl">{flag}</span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-bold text-white">{code}</h3>
            <p className="text-sm text-slate-400">{name}</p>
          </div>
        </div>
        <div className={`flex items-center px-2 py-1 rounded ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          <span className="text-xs font-medium">{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-slate-400">Balance</p>
        <h2 className="text-2xl font-bold text-white">{symbol}{balance.toLocaleString()}</h2>
        <p className="text-sm text-slate-400">≈ ${value.toLocaleString()}</p>
      </div>
      
      <Link to={`/exchange?currency=${code}`} className="inline-block w-full">
        <button className="flex items-center justify-between w-full py-2 px-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors duration-200">
          <span className="text-sm font-medium text-white">Exchange</span>
          <ArrowUpRight className="h-4 w-4 text-slate-400" />
        </button>
      </Link>
    </div>
  );
};

export default CurrencyCard;
