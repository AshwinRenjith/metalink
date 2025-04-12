import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { ArrowUpRight, Globe, Shield, Users, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MetalinkLogo from '@/components/MetalinkLogo';

const Index = () => {
  return (
    <div className="min-h-screen bg-metalink-blue">
      <Navbar />
      <Hero />
      
      {/* How it works section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">How Metalink Works</h2>
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
            Our platform simplifies cross-border transactions within the BRICS economic alliance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
            <div className="w-16 h-16 bg-metalink-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-8 w-8 text-metalink-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. Connect Wallet</h3>
            <p className="text-slate-300">
              Connect your crypto wallet to access the Metalink platform and verify your identity.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
            <div className="w-16 h-16 bg-metalink-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-metalink-purple" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Select Currency</h3>
            <p className="text-slate-300">
              Choose from BRL, RUB, INR, CNY, or ZAR to send or receive payments across borders.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center">
            <div className="w-16 h-16 bg-metalink-light-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-metalink-light-blue" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Secure Transaction</h3>
            <p className="text-slate-300">
              Complete your transaction with confidence using our secure and transparent platform.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/dashboard">
            <Button className="metalink-button flex items-center gap-2">
              Explore Dashboard
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* BRICS Benefits */}
      <div className="bg-gradient-to-b from-metalink-blue to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">BRICS Economic Alliance</h2>
            <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
              Connect with the fastest growing economic bloc representing over 40% of the world's population.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-4 justify-items-center">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center w-full">
              <div className="text-4xl mb-2">🇧🇷</div>
              <h3 className="text-lg font-bold text-white">Brazil</h3>
              <p className="text-sm text-slate-300">Largest economy in Latin America</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center w-full">
              <div className="text-4xl mb-2">🇷🇺</div>
              <h3 className="text-lg font-bold text-white">Russia</h3>
              <p className="text-sm text-slate-300">Rich in natural resources</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center w-full">
              <div className="text-4xl mb-2">🇮🇳</div>
              <h3 className="text-lg font-bold text-white">India</h3>
              <p className="text-sm text-slate-300">Leading IT and service industry</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center w-full">
              <div className="text-4xl mb-2">🇨🇳</div>
              <h3 className="text-lg font-bold text-white">China</h3>
              <p className="text-sm text-slate-300">Manufacturing powerhouse</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 text-center w-full">
              <div className="text-4xl mb-2">🇿🇦</div>
              <h3 className="text-lg font-bold text-white">South Africa</h3>
              <p className="text-sm text-slate-300">Gateway to African markets</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <MetalinkLogo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-white">Metalink</span>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/" className="text-slate-300 hover:text-white">Home</Link>
              <Link to="/dashboard" className="text-slate-300 hover:text-white">Dashboard</Link>
              <Link to="/exchange" className="text-slate-300 hover:text-white">Exchange</Link>
              <Link to="/transactions" className="text-slate-300 hover:text-white">Transactions</Link>
            </div>
          </div>
          
          <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2023 Metalink. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Users className="h-5 w-5 text-slate-400" />
              <p className="text-slate-400 text-sm">
                Building bridges across BRICS nations
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
