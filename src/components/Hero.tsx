
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-metalink-blue opacity-80"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-metalink-gold opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-metalink-purple opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Seamless Cross-Border</span>
            <span className="block header-gradient">BRICS Payments</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-slate-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Connect, transact, and trade across Brazil, Russia, India, China, and South Africa
            with our secure, blockchain-powered payment platform.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link to="/dashboard">
              <Button className="metalink-button flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/exchange">
              <Button className="metalink-button-secondary flex items-center gap-2">
                Try Exchange
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Features */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="h-12 w-12 rounded-full bg-metalink-gold/10 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-metalink-gold" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Multi-Currency Support</h3>
            <p className="text-slate-300">
              Transact in BRL, RUB, INR, CNY, ZAR with real-time exchange rates and minimal fees.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="h-12 w-12 rounded-full bg-metalink-purple/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-metalink-purple" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Blockchain Security</h3>
            <p className="text-slate-300">
              Built on secure blockchain technology for transparent, immutable, and trustless transactions.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="h-12 w-12 rounded-full bg-metalink-light-blue/10 flex items-center justify-center mb-4">
              <Wallet className="h-6 w-6 text-metalink-light-blue" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Wallet Integration</h3>
            <p className="text-slate-300">
              Connect your favorite crypto wallet for seamless, secure transactions across borders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
