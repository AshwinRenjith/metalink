
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Settings, X, Wallet } from "lucide-react";
import MetalinkLogo from './MetalinkLogo';
import { useWallet } from '@/hooks/useWallet';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected, account, isLoading, connectWallet, disconnectWallet } = useWallet();
  
  // Format account address for display
  const formatAccount = (address: string) => {
    return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-metalink-blue/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <MetalinkLogo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-white">Metalink</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/dashboard" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <Link to="/exchange" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Exchange
            </Link>
            <Link to="/transactions" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Transactions
            </Link>
            {isConnected && (
              <Link to="/settings" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Settings
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex items-center ml-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-300 bg-slate-800/50 px-3 py-1 rounded-md border border-slate-700">
                  {formatAccount(account || '')}
                </span>
                <Button 
                  onClick={disconnectWallet} 
                  variant="outline"
                  className="text-green-400 border-green-400/30"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                onClick={connectWallet} 
                className="metalink-connect-button"
                disabled={isLoading}
              >
                <Wallet className="mr-2 h-4 w-4" />
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-metalink-blue border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/exchange" 
              className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Exchange
            </Link>
            <Link 
              to="/transactions" 
              className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Transactions
            </Link>
            {isConnected && (
              <Link 
                to="/settings" 
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="inline-block mr-2 h-4 w-4" />
                Settings
              </Link>
            )}
            <div className="pt-4">
              {isConnected ? (
                <div className="space-y-2">
                  <div className="text-sm text-slate-300 bg-slate-800/50 px-3 py-2 rounded-md border border-slate-700">
                    {formatAccount(account || '')}
                  </div>
                  <Button 
                    onClick={() => {
                      disconnectWallet();
                      setIsOpen(false);
                    }} 
                    variant="outline" 
                    className="w-full text-green-400 border-green-400/30"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => {
                    connectWallet();
                    setIsOpen(false);
                  }} 
                  className="w-full metalink-connect-button"
                  disabled={isLoading}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isLoading ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
