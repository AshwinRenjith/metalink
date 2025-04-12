
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useWallet } from '@/hooks/useWallet';
import { Copy, DownloadCloud, Globe, Info, Key, Shield, User, Wallet } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { isConnected, account, connectWallet } = useWallet();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [preferredCurrency, setPreferredCurrency] = useState('');

  // Format account address for display
  const formatAccount = (address: string) => {
    return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const exportData = () => {
    // In a real app, this would generate a JSON file with user data
    toast({
      title: "Data Export Initiated",
      description: "Your data export is being prepared.",
    });
  };

  return (
    <div className="min-h-screen bg-metalink-blue">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-slate-400 mt-1">Manage your account and preferences</p>
          </div>
        </div>
        
        {!isConnected ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
            <Wallet className="h-12 w-12 text-metalink-gold mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
            <p className="text-slate-300 mb-6">
              You need to connect your wallet to access settings and personalize your experience.
            </p>
            <Button onClick={connectWallet} className="metalink-button">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="wallet" className="w-full">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-transparent mb-8">
              <TabsTrigger 
                value="wallet" 
                className="bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white data-[state=active]:bg-metalink-gold/10 data-[state=active]:text-metalink-gold data-[state=active]:border-metalink-gold/30"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Wallet
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white data-[state=active]:bg-metalink-purple/10 data-[state=active]:text-metalink-purple data-[state=active]:border-metalink-purple/30"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-white data-[state=active]:bg-metalink-light-blue/10 data-[state=active]:text-metalink-light-blue data-[state=active]:border-metalink-light-blue/30"
              >
                <Shield className="mr-2 h-4 w-4" />
                Security & Privacy
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="wallet" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="col-span-1 lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Connected Wallet</h2>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="h-10 w-10 rounded-full bg-metalink-gold/10 flex items-center justify-center mr-4">
                        <Key className="h-5 w-5 text-metalink-gold" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">MetaMask</h3>
                        <p className="text-slate-400 text-sm">{account}</p>
                      </div>
                    </div>
                    <Button onClick={copyAddress} variant="outline" className="text-slate-300 border-slate-700 bg-slate-800/50">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Address
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white mb-3">Transaction Settings</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <div className="mb-4">
                        <label className="block text-slate-300 text-sm mb-1">Default Gas Price (Gwei)</label>
                        <Input 
                          type="number" 
                          placeholder="5" 
                          className="bg-slate-800 border-slate-700 text-white"
                        />
                        <p className="text-xs text-slate-400 mt-1">
                          Higher gas prices result in faster transactions but cost more
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-slate-300 text-sm mb-1">Slippage Tolerance (%)</label>
                        <Input 
                          type="number" 
                          placeholder="0.5" 
                          step="0.1"
                          className="bg-slate-800 border-slate-700 text-white"
                        />
                        <p className="text-xs text-slate-400 mt-1">
                          Maximum price change allowed during transaction processing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Network Info</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <h3 className="text-white font-medium">Ethereum Mainnet</h3>
                      <p className="text-slate-400 text-sm mt-1">Connected to the Ethereum network</p>
                      <div className="mt-2 flex">
                        <div className="h-2 w-2 rounded-full bg-green-500 mt-1 mr-2"></div>
                        <span className="text-green-400 text-xs">Active</span>
                      </div>
                    </div>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Network Information</AlertTitle>
                      <AlertDescription>
                        Make sure you're connected to the correct network for your transactions.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="text-sm text-slate-400">
                      <p className="mb-2">Chain ID: 1</p>
                      <p className="mb-2">RPC URL: https://mainnet.infura.io/v3/...</p>
                      <p>Explorer: https://etherscan.io</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="profile" className="mt-0">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">Profile Information</h2>
                
                <form onSubmit={saveProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-slate-300 text-sm mb-1">Username</label>
                      <Input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Your username" 
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm mb-1">Email Address</label>
                      <Input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="your.email@example.com" 
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm mb-1">Country</label>
                      <Input 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Your country" 
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 text-sm mb-1">Preferred Currency</label>
                      <Input 
                        value={preferredCurrency}
                        onChange={(e) => setPreferredCurrency(e.target.value)}
                        placeholder="USD, BRL, RUB, etc." 
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button type="submit" className="metalink-button-secondary">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Two-Factor Authentication</h3>
                      <p className="text-slate-400 text-sm mb-3">
                        Secure your account with an additional layer of protection
                      </p>
                      <Button className="metalink-button-secondary">Enable 2FA</Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Session Management</h3>
                      <p className="text-slate-400 text-sm mb-3">
                        Manage your active sessions and sign out from other devices
                      </p>
                      <Button variant="outline" className="text-slate-300 border-slate-700 bg-slate-800/50">
                        Manage Sessions
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Privacy Controls</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Data Usage</h3>
                      <p className="text-slate-400 text-sm mb-3">
                        Manage how your data is used and stored within the platform
                      </p>
                      <Button variant="outline" className="text-slate-300 border-slate-700 bg-slate-800/50">
                        Data Preferences
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-white mb-2">Export Your Data</h3>
                      <p className="text-slate-400 text-sm mb-3">
                        Download all your personal data and transaction history
                      </p>
                      <Button onClick={exportData} className="flex items-center gap-2 text-slate-300 border-slate-700 bg-slate-800/50">
                        <DownloadCloud className="h-4 w-4" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Settings;
