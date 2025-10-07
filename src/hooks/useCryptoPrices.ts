import { useState, useEffect, useCallback } from 'react';
import { fetchCryptoPrices, CoinPrice } from '../services/api';

export interface CryptoPrices {
  bitcoin: CoinPrice;
  ethereum: CoinPrice;
  binancecoin: CoinPrice;
  solana: CoinPrice;
  ripple: CoinPrice;
  lastUpdated: Date;
  isLoading: boolean;
  error: string | null;
  hasUpdated: boolean;
}

const REFRESH_INTERVAL = 10000;

const defaultCoinPrice: CoinPrice = {
  usd: 0,
  pkr: 0,
  usd_24h_change: 0,
};

export const useCryptoPrices = () => {
  const [prices, setPrices] = useState<CryptoPrices>({
    bitcoin: defaultCoinPrice,
    ethereum: defaultCoinPrice,
    binancecoin: defaultCoinPrice,
    solana: defaultCoinPrice,
    ripple: defaultCoinPrice,
    lastUpdated: new Date(),
    isLoading: true,
    error: null,
    hasUpdated: false,
  });

  const fetchPricesData = useCallback(async () => {
    try {
      const data = await fetchCryptoPrices();

      setPrices({
        bitcoin: data.bitcoin || defaultCoinPrice,
        ethereum: data.ethereum || defaultCoinPrice,
        binancecoin: data.binancecoin || defaultCoinPrice,
        solana: data.solana || defaultCoinPrice,
        ripple: data.ripple || defaultCoinPrice,
        lastUpdated: new Date(),
        isLoading: false,
        error: null,
        hasUpdated: true,
      });

      setTimeout(() => {
        setPrices((prev) => ({ ...prev, hasUpdated: false }));
      }, 500);
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error);
      setPrices((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch prices',
        hasUpdated: false,
      }));
    }
  }, []);

  useEffect(() => {
    fetchPricesData();
    const interval = setInterval(fetchPricesData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchPricesData]);

  return prices;
};

export default useCryptoPrices;
