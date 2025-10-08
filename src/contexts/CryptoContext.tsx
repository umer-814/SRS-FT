import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { fetchCryptoPrices, fetchCryptoNews, CoinPrice, NewsArticle } from '../services/api';

interface CryptoData {
  bitcoin: CoinPrice;
  ethereum: CoinPrice;
  binancecoin: CoinPrice;
  solana: CoinPrice;
  ripple: CoinPrice;
}

interface GlobalMetrics {
  totalMarketCap: number;
  btcDominance: number;
  ethDominance: number;
  volume24h: number;
  activeCryptocurrencies: number;
}

interface FearGreedIndex {
  value: number;
  classification: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
}

interface CryptoContextType {
  prices: CryptoData | null;
  globalMetrics: GlobalMetrics | null;
  fearGreed: FearGreedIndex | null;
  news: NewsArticle[];
  loading: boolean;
  lastUpdated: Date | null;
  hasUpdated: boolean;
  error: string | null;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

const CACHE_KEY = 'crypto_data_cache';
const REFRESH_INTERVAL = 10000;

const defaultCoinPrice: CoinPrice = {
  usd: 0,
  pkr: 0,
  usd_24h_change: 0,
};

const getClassification = (value: number): FearGreedIndex['classification'] => {
  if (value <= 25) return 'Extreme Fear';
  if (value <= 45) return 'Fear';
  if (value <= 55) return 'Neutral';
  if (value <= 75) return 'Greed';
  return 'Extreme Greed';
};

export const CryptoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<CryptoData | null>(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const data = JSON.parse(cached);
        return data.prices;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics | null>(null);
  const [fearGreed, setFearGreed] = useState<FearGreedIndex | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(!prices);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    try {
      const pricesData = await fetchCryptoPrices();

      const newPrices: CryptoData = {
        bitcoin: pricesData.bitcoin || defaultCoinPrice,
        ethereum: pricesData.ethereum || defaultCoinPrice,
        binancecoin: pricesData.binancecoin || defaultCoinPrice,
        solana: pricesData.solana || defaultCoinPrice,
        ripple: pricesData.ripple || defaultCoinPrice,
      };

      setPrices(newPrices);
      setLastUpdated(new Date());
      setLoading(false);
      setError(null);
      setHasUpdated(true);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          prices: newPrices,
          timestamp: Date.now(),
        })
      );

      setTimeout(() => setHasUpdated(false), 500);

      fetchGlobalMetrics();
      fetchFearGreed();
      fetchNews();
    } catch (err) {
      console.error('Failed to fetch crypto data:', err);
      setError('Failed to fetch data');
      setLoading(false);
    }
  }, []);

  const fetchGlobalMetrics = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      const data = await response.json();

      if (data.data) {
        setGlobalMetrics({
          totalMarketCap: data.data.total_market_cap?.usd || 0,
          btcDominance: data.data.market_cap_percentage?.btc || 0,
          ethDominance: data.data.market_cap_percentage?.eth || 0,
          volume24h: data.data.total_volume?.usd || 0,
          activeCryptocurrencies: data.data.active_cryptocurrencies || 0,
        });
      }
    } catch (err) {
      console.error('Failed to fetch global metrics:', err);
    }
  };

  const fetchFearGreed = async () => {
    try {
      const response = await fetch('https://api.alternative.me/fng/?limit=1');
      const data = await response.json();

      if (data.data && data.data[0]) {
        const value = parseInt(data.data[0].value);
        setFearGreed({
          value,
          classification: getClassification(value),
        });
      }
    } catch (err) {
      console.error('Failed to fetch fear & greed index:', err);
      setFearGreed({
        value: 50,
        classification: 'Neutral',
      });
    }
  };

  const fetchNews = async () => {
    try {
      const articles = await fetchCryptoNews();
      setNews(articles);
    } catch (err) {
      console.error('Failed to fetch crypto news:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  const value: CryptoContextType = {
    prices,
    globalMetrics,
    fearGreed,
    news,
    loading,
    lastUpdated,
    hasUpdated,
    error,
  };

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>;
};

export const useCrypto = (): CryptoContextType => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error('useCrypto must be used within CryptoProvider');
  }
  return context;
};
