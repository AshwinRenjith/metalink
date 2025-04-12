
import React from 'react';
import Navbar from '@/components/Navbar';
import ExchangeForm from '@/components/ExchangeForm';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Exchange = () => {
  return (
    <div className="min-h-screen bg-metalink-blue">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Currency Exchange</h1>
          <p className="text-slate-400 mt-1">Convert between BRICS currencies with real-time rates</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Exchange Benefits</h2>
              
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-metalink-gold/10 flex items-center justify-center">
                    <span className="text-metalink-gold text-sm font-bold">1</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white font-medium">Low Fees</h3>
                    <p className="text-slate-400 text-sm">Competitive rates with minimal transaction fees</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-metalink-purple/10 flex items-center justify-center">
                    <span className="text-metalink-purple text-sm font-bold">2</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white font-medium">Real-time Rates</h3>
                    <p className="text-slate-400 text-sm">Exchange at the latest market rates</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-metalink-light-blue/10 flex items-center justify-center">
                    <span className="text-metalink-light-blue text-sm font-bold">3</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white font-medium">Secure Transactions</h3>
                    <p className="text-slate-400 text-sm">Protected by blockchain technology</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-green-500 text-sm font-bold">4</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white font-medium">Fast Settlements</h3>
                    <p className="text-slate-400 text-sm">Quick transaction confirmations</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start">
              <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-white font-medium">Test Mode Notice</h3>
                <p className="text-slate-300 text-sm">
                  This is a demonstration version. In a production environment, exchanges would be 
                  processed via smart contracts on the blockchain. View your transaction history 
                  <Link to="/transactions" className="text-blue-400 hover:underline ml-1">
                    here
                  </Link>.
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <ExchangeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
