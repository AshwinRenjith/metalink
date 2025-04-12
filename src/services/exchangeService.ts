import { toast } from '@/hooks/use-toast';

interface ExchangeRates {
  rates: { [key: string]: number };
  timestamp: number;
}

const OPEN_EXCHANGE_RATES_API = 'https://open.er-api.com/v6/latest/USD';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const ETH_USD_PRICE_API = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

let ratesCache: ExchangeRates | null = null;
let ethUsdPrice: number | null = null;
let lastEthUpdate: number = 0;

// Fetch and cache exchange rates
async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    const response = await fetch(OPEN_EXCHANGE_RATES_API);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    ratesCache = {
      rates: data.rates,
      timestamp: Date.now()
    };
    
    return ratesCache;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}

// Fetch current ETH/USD price
async function fetchEthPrice(): Promise<number> {
  try {
    const response = await fetch(ETH_USD_PRICE_API);
    if (!response.ok) {
      throw new Error('Failed to fetch ETH price');
    }
    
    const data = await response.json();
    ethUsdPrice = data.ethereum.usd;
    lastEthUpdate = Date.now();
    
    return ethUsdPrice;
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    throw error;
  }
}

// Get current exchange rates, using cache if available
async function getExchangeRates(): Promise<ExchangeRates> {
  if (ratesCache && Date.now() - ratesCache.timestamp < CACHE_DURATION) {
    return ratesCache;
  }
  return fetchExchangeRates();
}

// Get current ETH price, using cache if available
async function getEthPrice(): Promise<number> {
  if (ethUsdPrice && Date.now() - lastEthUpdate < CACHE_DURATION) {
    return ethUsdPrice;
  }
  return fetchEthPrice();
}

// Convert fiat amount to ETH
export async function convertFiatToEth(
  amount: number,
  fromCurrency: string
): Promise<number> {
  try {
    const [rates, ethPrice] = await Promise.all([
      getExchangeRates(),
      getEthPrice()
    ]);
    
    // Convert amount to USD first
    const usdAmount = amount / rates.rates[fromCurrency];
    
    // Convert USD to ETH
    const ethAmount = usdAmount / ethPrice;
    
    return parseFloat(ethAmount.toFixed(8));
  } catch (error) {
    console.error('Error converting fiat to ETH:', error);
    toast({
      title: 'Conversion Error',
      description: 'Failed to convert currency. Please try again later.',
      variant: 'destructive'
    });
    throw error;
  }
}

// Get exchange rate between two fiat currencies
export async function getExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  try {
    const rates = await getExchangeRates();
    const fromRate = rates.rates[fromCurrency];
    const toRate = rates.rates[toCurrency];
    
    return parseFloat((toRate / fromRate).toFixed(6));
  } catch (error) {
    console.error('Error getting exchange rate:', error);
    throw error;
  }
}

// Convert between fiat currencies
export async function convertFiatToFiat(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<number> {
  try {
    const rate = await getExchangeRate(fromCurrency, toCurrency);
    return parseFloat((amount * rate).toFixed(2));
  } catch (error) {
    console.error('Error converting fiat to fiat:', error);
    throw error;
  }
}