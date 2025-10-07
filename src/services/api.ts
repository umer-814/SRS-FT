const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const CRYPTOCOMPARE_BASE = 'https://min-api.cryptocompare.com/data/v2';

export interface CoinPrice {
  usd: number;
  pkr: number;
  usd_24h_change: number;
}

export interface CryptoPricesResponse {
  bitcoin: CoinPrice;
  ethereum: CoinPrice;
  binancecoin: CoinPrice;
  solana: CoinPrice;
  ripple: CoinPrice;
}

export interface NewsArticle {
  id: string;
  title: string;
  url: string;
  source: string;
  published_at: string;
  imageurl?: string;
}

export const fetchCryptoPrices = async (): Promise<CryptoPricesResponse> => {
  try {
    const response = await fetch(
      `${COINGECKO_BASE}/simple/price?ids=bitcoin,ethereum,binancecoin,solana,ripple&vs_currencies=usd,pkr&include_24hr_change=true`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch crypto prices:', error);
    throw error;
  }
};

export const fetchCryptoNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(`${CRYPTOCOMPARE_BASE}/news/?lang=EN`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Data && Array.isArray(data.Data)) {
      return data.Data.slice(0, 8).map((article: any) => ({
        id: article.id || String(Date.now() + Math.random()),
        title: article.title,
        url: article.url,
        source: article.source_info?.name || article.source,
        published_at: new Date(article.published_on * 1000).toISOString(),
        imageurl: article.imageurl,
      }));
    }

    return [];
  } catch (error) {
    console.error('Failed to fetch crypto news:', error);
    return getFallbackNews();
  }
};

const getFallbackNews = (): NewsArticle[] => {
  return [
    {
      id: '1',
      title: 'Bitcoin reaches new all-time high amid institutional adoption',
      url: '#',
      source: 'CryptoNews',
      published_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Ethereum 2.0 upgrade shows promising scalability improvements',
      url: '#',
      source: 'CoinDesk',
      published_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Major exchange announces support for Solana staking',
      url: '#',
      source: 'Decrypt',
      published_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'DeFi protocols see record trading volumes this quarter',
      url: '#',
      source: 'The Block',
      published_at: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Regulatory clarity boosts institutional crypto investments',
      url: '#',
      source: 'Bloomberg Crypto',
      published_at: new Date().toISOString(),
    },
  ];
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
