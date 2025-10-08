import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCrypto } from '../contexts/CryptoContext';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Activity, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { PriceSkeleton, CardSkeleton } from '../components/Skeleton';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { prices, globalMetrics, fearGreed, loading, hasUpdated } = useCrypto();
  
  const [cryptoPrices, setCryptoPrices] = useState([
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 0,
      priceUSD: 0,
      pricePKR: 0,
      change: 0,
      icon: '🟠',
      volume: '28.5B',
      marketCap: '847.2B',
      primary: true
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 0,
      priceUSD: 0,
      pricePKR: 0,
      change: 0,
      icon: '💎',
      volume: '15.2B',
      marketCap: '316.8B',
      primary: true
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      price: 315.80,
      priceUSD: 315.80,
      pricePKR: 87841,
      change: 3.67,
      icon: '🟡',
      volume: '1.8B',
      marketCap: '47.2B',
      primary: false
    },
    {
      symbol: 'XRP',
      name: 'XRP',
      price: 0.6234,
      priceUSD: 0.6234,
      pricePKR: 173.51,
      change: -0.45,
      icon: '💧',
      volume: '2.1B',
      marketCap: '33.8B',
      primary: false
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 98.76,
      priceUSD: 98.76,
      pricePKR: 27489,
      change: 5.23,
      icon: '☀️',
      volume: '3.2B',
      marketCap: '42.1B',
      primary: false
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.4567,
      priceUSD: 0.4567,
      pricePKR: 127.06,
      change: -2.11,
      icon: '🔷',
      volume: '890M',
      marketCap: '16.1B',
      primary: false
    },
  ]);

  const [marketStats, setMarketStats] = useState({
    totalMarketCap: 1.84,
    volume24h: 89.5,
    btcDominance: 51.2,
    fearGreedIndex: 65
  });

  const news = [
    {
      id: 1,
      headline: "Bitcoin Hits New Monthly High Amid Institutional Interest",
      time: "2 hours ago",
      category: "Market",
      priority: "high"
    },
    {
      id: 2,
      headline: "Ethereum Network Upgrade Shows Strong Performance Metrics",
      time: "4 hours ago",
      category: "Technology",
      priority: "medium"
    },
    {
      id: 3,
      headline: "Major Exchange Announces Enhanced Security Features",
      time: "6 hours ago",
      category: "Security",
      priority: "medium"
    },
    {
      id: 4,
      headline: "Crypto Market Cap Reaches $1.8 Trillion Mark",
      time: "8 hours ago",
      category: "Market",
      priority: "low"
    },
    {
      id: 5,
      headline: "Regulatory Updates: New Guidelines for Digital Assets",
      time: "12 hours ago",
      category: "Regulation",
      priority: "medium"
    },
  ];

  // Update crypto prices from context
  useEffect(() => {
    if (prices) {
      setCryptoPrices([
        {
          symbol: 'BTC',
          name: 'Bitcoin',
          icon: '🟠',
          price: prices.bitcoin.usd,
          priceUSD: prices.bitcoin.usd,
          pricePKR: prices.bitcoin.pkr,
          change: prices.bitcoin.usd_24h_change,
          primary: true,
        },
        {
          symbol: 'ETH',
          name: 'Ethereum',
          icon: '💎',
          price: prices.ethereum.usd,
          priceUSD: prices.ethereum.usd,
          pricePKR: prices.ethereum.pkr,
          change: prices.ethereum.usd_24h_change,
          primary: true,
        },
        {
          symbol: 'BNB',
          name: 'BNB',
          icon: '🪙',
          price: prices.binancecoin.usd,
          priceUSD: prices.binancecoin.usd,
          pricePKR: prices.binancecoin.pkr,
          change: prices.binancecoin.usd_24h_change,
          primary: false,
        },
        {
          symbol: 'SOL',
          name: 'Solana',
          icon: '🌞',
          price: prices.solana.usd,
          priceUSD: prices.solana.usd,
          pricePKR: prices.solana.pkr,
          change: prices.solana.usd_24h_change,
          primary: false,
        },
        {
          symbol: 'XRP',
          name: 'Ripple',
          icon: '🔵',
          price: prices.ripple.usd,
          priceUSD: prices.ripple.usd,
          pricePKR: prices.ripple.pkr,
          change: prices.ripple.usd_24h_change,
          primary: false,
        },
      ]);
    }
  }, [prices]);

  // Update market stats based on live prices
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketStats(prev => ({
        ...prev,
        totalMarketCap: prev.totalMarketCap + (Math.random() - 0.5) * 0.02,
        volume24h: prev.volume24h + (Math.random() - 0.5) * 2,
        btcDominance: prev.btcDominance + (Math.random() - 0.5) * 0.1,
        fearGreedIndex: Math.max(0, Math.min(100, prev.fearGreedIndex + (Math.random() - 0.5) * 2))
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Market': return 'bg-profit-green/20 text-profit-green border-profit-green/30';
      case 'Technology': return 'bg-electric-blue/20 text-electric-blue border-electric-blue/30';
      case 'Security': return 'bg-gold-highlight/20 text-gold-highlight border-gold-highlight/30';
      case 'Regulation': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const SparklineChart = ({ change }: { change: number }) => (
    <div className="w-16 h-8 flex items-end space-x-1">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-1000 ${
            change >= 0 ? 'bg-profit-green' : 'bg-risk-red'
          }`}
          style={{
            height: `${Math.max(4, Math.random() * 24 + 8)}px`,
            opacity: 0.3 + (i * 0.1)
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-primary lg:pl-0">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-white mb-2 flex items-center"
              >
                📈 Live Market Data
                <motion.div
                  className="ml-3 w-2 h-2 bg-profit-green rounded-full"
                  animate={{
                    scale: hasUpdated ? [1, 1.5, 1] : 1,
                    opacity: hasUpdated ? [1, 0.5, 1] : 1,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.h2>
              <p className="text-gray-400">Real-time cryptocurrency market data • Updates every 5 seconds</p>
            </div>
            {isAuthenticated && (
              <motion.button
                onClick={() => navigate('/recovery')}
                className="mt-4 sm:mt-0 bg-electric-blue hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="h-5 w-5" />
                <span>Open Recovery Tool</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Global Market Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <motion.div
            className="glass rounded-xl p-6 border border-dark-border card-hover"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">🌍 Total Market Cap</p>
                {loading || !globalMetrics ? (
                  <div className="mt-2 space-y-2">
                    <div className="h-7 w-32 bg-gray-700 animate-pulse rounded"></div>
                  </div>
                ) : (
                  <motion.p
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ${(globalMetrics.totalMarketCap / 1e12).toFixed(2)}T
                  </motion.p>
                )}
              </div>
              <div className="p-3 bg-electric-blue/10 rounded-lg">
                <Activity className="h-6 w-6 text-electric-blue" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-xl p-6 border border-dark-border card-hover"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">📊 24h Volume</p>
                {loading || !globalMetrics ? (
                  <div className="mt-2 space-y-2">
                    <div className="h-7 w-32 bg-gray-700 animate-pulse rounded"></div>
                  </div>
                ) : (
                  <motion.p
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ${(globalMetrics.volume24h / 1e9).toFixed(1)}B
                  </motion.p>
                )}
              </div>
              <div className="p-3 bg-profit-green/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-profit-green" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-xl p-6 border border-dark-border card-hover"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">🪙 BTC Dominance</p>
                {loading || !globalMetrics ? (
                  <div className="mt-2 space-y-2">
                    <div className="h-7 w-24 bg-gray-700 animate-pulse rounded"></div>
                  </div>
                ) : (
                  <motion.p
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {globalMetrics.btcDominance.toFixed(1)}%
                  </motion.p>
                )}
              </div>
              <div className="p-3 bg-gold-highlight/10 rounded-lg">
                <span className="text-2xl">₿</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-xl p-6 border border-dark-border card-hover"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">💎 ETH Dominance</p>
                {loading || !globalMetrics ? (
                  <div className="mt-2 space-y-2">
                    <div className="h-7 w-24 bg-gray-700 animate-pulse rounded"></div>
                  </div>
                ) : (
                  <motion.p
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {globalMetrics.ethDominance.toFixed(1)}%
                  </motion.p>
                )}
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <span className="text-2xl">💎</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass rounded-xl p-6 border border-dark-border card-hover relative overflow-hidden"
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">😨😄 Fear & Greed</p>
                {loading || !fearGreed ? (
                  <div className="mt-2 space-y-2">
                    <div className="h-7 w-16 bg-gray-700 animate-pulse rounded"></div>
                  </div>
                ) : (
                  <>
                    <motion.p
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {fearGreed.value}
                    </motion.p>
                    <p className={`text-sm mt-1 font-semibold ${
                      fearGreed.classification.includes('Fear') ? 'text-risk-red' :
                      fearGreed.classification === 'Neutral' ? 'text-gold-highlight' :
                      'text-profit-green'
                    }`}>
                      {fearGreed.classification}
                    </p>
                  </>
                )}
              </div>
              <div className="p-3 bg-gold-highlight/10 rounded-lg">
                {!loading && fearGreed && (
                  <motion.div
                    className={`w-6 h-6 rounded-full ${
                      fearGreed.value > 75 ? 'bg-profit-green' :
                      fearGreed.value > 55 ? 'bg-gold-highlight' :
                      fearGreed.value > 45 ? 'bg-yellow-500' :
                      fearGreed.value > 25 ? 'bg-orange-500' : 'bg-risk-red'
                    }`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Cryptocurrencies */}
          <div className="lg:col-span-2">
            {/* Primary Coins (BTC & ETH) - Highlighted */}
            <div className="mb-6">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold text-white mb-4 flex items-center"
              >
                🪙 Major Coins
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {cryptoPrices.filter(crypto => crypto.primary).map((crypto, index) => (
                <motion.div
                  key={crypto.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)' }}
                  className={`glass rounded-2xl p-6 border-2 ${
                    crypto.symbol === 'BTC'
                      ? 'border-gold-highlight/50 bg-gradient-to-br from-dark-card to-amber-950/10'
                      : 'border-purple-500/50 bg-gradient-to-br from-dark-card to-purple-950/10'
                  } card-hover relative overflow-hidden`}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className={`absolute inset-0 opacity-10 blur-3xl ${
                      crypto.symbol === 'BTC' ? 'bg-gold-highlight' : 'bg-purple-500'
                    }`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
                            crypto.symbol === 'BTC' ? 'bg-gold-highlight/20' : 'bg-purple-500/20'
                          }`}
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {crypto.icon}
                        </motion.div>
                        <div>
                          <h3 className="font-bold text-white text-xl">{crypto.name}</h3>
                          <p className="text-sm text-gray-400">{crypto.symbol}</p>
                        </div>
                      </div>
                      <SparklineChart change={crypto.change} />
                    </div>

                    <div className="space-y-4">
                      {/* USD Price */}
                      <div className="bg-dark-primary/50 rounded-xl p-4 border border-dark-border">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">USD Price</span>
                          {loading || !crypto.priceUSD ? (
                            <div className="h-8 w-32 bg-gray-700 animate-pulse rounded"></div>
                          ) : (
                            <motion.span
                              className="text-2xl font-bold text-white font-mono"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              key={crypto.priceUSD}
                            >
                              ${crypto.priceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </motion.span>
                          )}
                        </div>
                      </div>

                      {/* PKR Price */}
                      <div className="bg-dark-primary/50 rounded-xl p-4 border border-dark-border">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">PKR Price</span>
                          {loading || !crypto.pricePKR ? (
                            <div className="h-6 w-32 bg-gray-700 animate-pulse rounded"></div>
                          ) : (
                            <motion.span
                              className="text-xl font-bold text-electric-blue font-mono"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              key={crypto.pricePKR}
                            >
                              ₨{crypto.pricePKR.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </motion.span>
                          )}
                        </div>
                      </div>

                      {/* 24h Change */}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">24h Change</span>
                        <div className="flex items-center space-x-2">
                          {crypto.change >= 0 ? (
                            <TrendingUp className="h-5 w-5 text-profit-green" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-risk-red" />
                          )}
                          <motion.span
                            className={`font-bold text-lg ${
                              crypto.change >= 0 ? 'text-profit-green' : 'text-risk-red'
                            }`}
                            animate={{
                              scale: hasUpdated ? [1, 1.1, 1] : 1,
                            }}
                          >
                            {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Altcoins Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-xl border border-dark-border overflow-hidden"
            >
              <div className="p-6 border-b border-dark-border bg-gradient-to-r from-dark-card to-dark-primary">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-electric-blue" />
                  🪙 Altcoins
                </h2>
                <p className="text-sm text-gray-400 mt-1">Top alternative cryptocurrencies</p>
              </div>
              <div className="divide-y divide-dark-border">
                {cryptoPrices.filter(crypto => !crypto.primary).map((crypto) => (
                  <div key={crypto.symbol} className="p-4 hover:bg-dark-card/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-dark-card rounded-full flex items-center justify-center text-xl">
                          {crypto.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{crypto.name}</h3>
                          <p className="text-sm text-gray-400">{crypto.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">
                          ${crypto.price.toFixed(crypto.price < 1 ? 4 : 2)}
                        </p>
                        <div className="flex items-center justify-end space-x-1">
                          {crypto.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-profit-green" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-risk-red" />
                          )}
                          <span className={`text-sm font-medium ${
                            crypto.change >= 0 ? 'text-profit-green' : 'text-risk-red'
                          }`}>
                            {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* News & Market Status */}
          <div className="lg:col-span-1 space-y-8">
            {/* Crypto News */}
            <div className="glass rounded-xl border border-dark-border overflow-hidden">
              <div className="p-6 border-b border-dark-border">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  📰 Crypto News
                </h2>
              </div>
              <div className="divide-y divide-dark-border max-h-96 overflow-y-auto">
                {news.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-dark-card/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <h3 className="text-sm font-medium text-white mb-2 line-clamp-2 leading-relaxed">
                      {item.headline}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Forecast */}
            <div className="glass rounded-xl border border-dark-border p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                🔮 AI Market Forecast
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-profit-green/10 rounded-lg border border-profit-green/20">
                  <div>
                    <p className="text-profit-green font-semibold">BTC Outlook</p>
                    <p className="text-sm text-gray-300">Next 24h: Bullish</p>
                  </div>
                  <div className="text-profit-green font-bold">87%</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gold-highlight/10 rounded-lg border border-gold-highlight/20">
                  <div>
                    <p className="text-gold-highlight font-semibold">ETH Outlook</p>
                    <p className="text-sm text-gray-300">Next 24h: Neutral</p>
                  </div>
                  <div className="text-gold-highlight font-bold">62%</div>
                </div>

                {!isAuthenticated && (
                  <div className="text-center pt-4 border-t border-dark-border">
                    <p className="text-sm text-gray-400 mb-3">Get detailed AI forecasts</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="bg-electric-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors btn-press"
                    >
                      Sign In for More
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Market Status */}
            <div className="glass rounded-xl border border-dark-border p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Market Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Market Sentiment</span>
                  <span className="text-profit-green font-medium flex items-center">
                    <div className="w-2 h-2 bg-profit-green rounded-full mr-2 animate-pulse" />
                    Bullish
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Traders</span>
                  <span className="text-electric-blue font-medium">2.3M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Network Health</span>
                  <span className="text-profit-green font-medium">Excellent</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Volatility Index</span>
                  <span className="text-gold-highlight font-medium">Medium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;