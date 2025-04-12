
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDownUp, Info } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CURRENCIES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { getExchangeRate, convertFiatToEth } from '@/services/exchangeService';

interface ExchangeFormProps {
  onExchange?: (fromCurrency: string, toCurrency: string, amount: string) => Promise<void>;
}

const ExchangeForm = ({ onExchange }: ExchangeFormProps) => {
  const { toast } = useToast();
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('RUB');
  const [amount, setAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [fee] = useState(0.5); // 0.5% fee
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [ethAmount, setEthAmount] = useState<string>('0.00');

  // Fetch exchange rate when currencies change
  useEffect(() => {
    const updateExchangeRate = async () => {
      setIsLoadingRate(true);
      try {
        const rate = await getExchangeRate(fromCurrency, toCurrency);
        setExchangeRate(rate);
        
        // If there's an amount, update the ETH conversion
        if (amount) {
          const ethValue = await convertFiatToEth(parseFloat(amount), fromCurrency);
          setEthAmount(ethValue.toFixed(8));
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch exchange rate. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoadingRate(false);
      }
    };
    
    updateExchangeRate();
  }, [fromCurrency, toCurrency, amount]);
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    
    // Set a new mock exchange rate
    const newRate = (1 / exchangeRate).toFixed(4);
    setExchangeRate(parseFloat(newRate));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to exchange.",
        variant: "destructive"
      });
      return;
    }
    
    if (onExchange) {
      // If onExchange prop is provided, use it
      onExchange(fromCurrency, toCurrency, amount);
    } else {
      // Default behavior if no onExchange is provided
      toast({
        title: "Exchange initiated",
        description: `Converting ${amount} ${fromCurrency} to ${(parseFloat(amount) * exchangeRate).toFixed(2)} ${toCurrency}`,
      });
    }
    
    // Reset form
    setAmount('');
  };
  
  const calculateOutput = () => {
    if (!amount || !exchangeRate) return '0.00';
    const inputAmount = parseFloat(amount);
    
    if (isNaN(inputAmount)) return '0.00';
    
    const feeAmount = inputAmount * (fee / 100);
    const outputAmount = (inputAmount - feeAmount) * exchangeRate;
    
    return outputAmount.toFixed(2);
  };
  
  const fromCurrencyData = CURRENCIES.find(c => c.code === fromCurrency);
  const toCurrencyData = CURRENCIES.find(c => c.code === toCurrency);
  
  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Currency Exchange</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">From</label>
            <div className="flex gap-2">
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code} className="flex items-center">
                      <span className="mr-2">{currency.flag}</span>
                      <span>{currency.code} - {currency.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="metalink-input w-full pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {fromCurrencyData?.symbol}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              type="button"
              onClick={handleSwapCurrencies}
              className="bg-slate-700 p-2 rounded-full hover:bg-slate-600 transition-colors duration-200"
            >
              <ArrowDownUp className="h-5 w-5 text-slate-300" />
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">To</label>
            <div className="flex gap-2">
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="bg-slate-700 border-slate-600">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="mr-2">{currency.flag}</span>
                      <span>{currency.code} - {currency.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  value={calculateOutput()}
                  readOnly
                  className="metalink-input w-full pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {toCurrencyData?.symbol}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-3 mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-400">Exchange Rate</span>
              <span className="text-sm text-white">
                {isLoadingRate ? (
                  'Loading...'
                ) : (
                  <>1 {fromCurrency} = {exchangeRate?.toFixed(6)} {toCurrency}</>
                )}
              </span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-400">ETH Equivalent</span>
              <span className="text-sm text-white">
                ≈ {ethAmount} ETH
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-slate-400 mr-1">Fee</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Network fees for blockchain transactions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm text-white">{fee}%</span>
            </div>
          </div>
          
          <Button
            type="submit"
            className="metalink-button w-full mt-6"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            Exchange Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ExchangeForm;
