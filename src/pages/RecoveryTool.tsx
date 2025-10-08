import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, AlertCircle, Save, Trash2, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import Notification from '../components/Notification';
import { useCrypto } from '../contexts/CryptoContext';

const RecoveryTool = () => {
  const { prices } = useCrypto();
  const [formData, setFormData] = useState({
    coin: 'BTC',
    position: 'Long',
    leverage: '10',
    tradeSize: '',
    tradeSizeUnit: 'USDT',
    margin: '',
    entryPrice: '',
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedTrades, setSavedTrades] = useState([]);
  const [notification, setNotification] = useState(null);

  const coins = [
    { value: 'BTC', label: 'Bitcoin (BTC)', icon: '🟠', maxLeverage: 125 },
    { value: 'ETH', label: 'Ethereum (ETH)', icon: '💎', maxLeverage: 100 },
  ];

  const positions = ['Long', 'Short'];
  const tradeSizeUnits = ['USDT', 'BTC', 'ETH'];

  // Load saved trades from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('smartRecoverySavedTrades');
    if (stored) {
      setSavedTrades(JSON.parse(stored));
    }
  }, []);

  const maxLeverage = coins.find(c => c.value === formData.coin)?.maxLeverage || 125;

  const handleSaveTrade = () => {
    if (!results) return;

    const trade = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...formData,
      results,
    };

    const updated = [trade, ...savedTrades];
    setSavedTrades(updated);
    localStorage.setItem('smartRecoverySavedTrades', JSON.stringify(updated));

    setNotification({
      type: 'success',
      title: '✅ Trade Saved',
      message: 'Trade has been saved to your portfolio',
    });
  };

  const handleDeleteTrade = (id) => {
    const updated = savedTrades.filter(t => t.id !== id);
    setSavedTrades(updated);
    localStorage.setItem('smartRecoverySavedTrades', JSON.stringify(updated));

    setNotification({
      type: 'success',
      title: '🗑️ Trade Deleted',
      message: 'Trade has been removed from your portfolio',
    });
  };

  const recoveryStrategies = [
    {
      id: 1,
      name: 'Dollar Cost Averaging (DCA)',
      description: 'Gradually increase position size at lower prices',
      riskLevel: 'Medium',
      successRate: '73%',
    },
    {
      id: 2,
      name: 'Balance Injection',
      description: 'Add margin to prevent liquidation',
      riskLevel: 'Low',
      successRate: '85%',
    },
    {
      id: 3,
      name: 'Partial Exit Strategy',
      description: 'Close portion of position to reduce risk',
      riskLevel: 'Low',
      successRate: '68%',
    },
    {
      id: 4,
      name: 'Hedging with Opposite Position',
      description: 'Open counter-position to minimize losses',
      riskLevel: 'High',
      successRate: '54%',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const currentPrice = formData.coin === 'BTC'
        ? (prices?.bitcoin?.usd || 43250)
        : (prices?.ethereum?.usd || 2634);

      const entryPrice = parseFloat(formData.entryPrice);
      const leverage = parseFloat(formData.leverage);
      const tradeSize = parseFloat(formData.tradeSize);
      const margin = parseFloat(formData.margin);
      const isLong = formData.position === 'Long';

      const priceChangePercent = ((currentPrice - entryPrice) / entryPrice) * 100;
      const pnlPercent = (isLong ? priceChangePercent : -priceChangePercent) * leverage;
      const pnlAmount = (tradeSize * pnlPercent) / 100;

      const liquidationPrice = isLong
        ? entryPrice * (1 - (1 / leverage))
        : entryPrice * (1 + (1 / leverage));

      const liquidationDistance = Math.abs((currentPrice - liquidationPrice) / currentPrice * 100);
      const isProfit = pnlPercent > 0;

      const selectedStrategy = isProfit
        ? {
            title: '🎉 Position in Profit',
            description: 'Your trade is performing well',
            actions: [
              'Consider taking partial profits',
              'Move stop-loss to break-even',
              'Monitor for trend reversal signals',
            ],
            risk: 'Low',
          }
        : recoveryStrategies[Math.floor(Math.random() * recoveryStrategies.length)];

      const recommendations = isProfit
        ? [
            `🎉 Congratulations! You are currently in profit (+${pnlPercent.toFixed(2)}%)`,
            'Keep monitoring and manage risk carefully',
            'Consider setting a trailing stop-loss',
            'Take partial profits if you are comfortable',
          ]
        : [
            `⚠️ Position at ${pnlPercent.toFixed(2)}% loss`,
            'Consider adding margin to avoid liquidation',
            `Liquidation price: $${liquidationPrice.toFixed(2)}`,
            'Review your risk management strategy',
          ];

      setResults({
        currentPrice,
        entryPrice,
        liquidationPrice,
        pnlPercent,
        pnlAmount,
        isProfit,
        selectedStrategy,
        riskMetrics: {
          marginRatio: ((margin / tradeSize) * 100).toFixed(1),
          liquidationDistance: liquidationDistance.toFixed(1),
        },
        recommendations,
      });
      setLoading(false);
    }, 1500);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400 bg-green-900/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'High': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary lg:pl-0">
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🛠️ Advanced Trade Recovery</h1>
          <p className="text-gray-400">AI-powered recovery strategies for crypto futures trading</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="glass rounded-xl border border-dark-border p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Trade Details
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Cryptocurrency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {coins.map((coin) => (
                    <button
                      key={coin.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, coin: coin.value, leverage: '10' }))}
                      className={`p-4 rounded-lg border transition-all ${
                        formData.coin === coin.value
                          ? 'bg-electric-blue/20 border-electric-blue text-white glow-blue'
                          : 'glass border-dark-border text-gray-300 hover:border-electric-blue/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{coin.icon}</div>
                      <div className="text-sm font-medium">{coin.value}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Position Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {positions.map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, position: pos }))}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.position === pos
                          ? pos === 'Long' ? 'bg-profit-green/20 border-profit-green text-profit-green' : 'bg-risk-red/20 border-risk-red text-risk-red'
                          : 'glass border-dark-border text-gray-300 hover:border-electric-blue/50'
                      }`}
                    >
                      <div className="font-medium">{pos}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Leverage (1x - {maxLeverage}x)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="1"
                    max={maxLeverage}
                    value={formData.leverage}
                    onChange={(e) => setFormData(prev => ({ ...prev, leverage: e.target.value }))}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    min="1"
                    max={maxLeverage}
                    value={formData.leverage}
                    onChange={(e) => setFormData(prev => ({ ...prev, leverage: Math.min(maxLeverage, Math.max(1, parseInt(e.target.value) || 1)).toString() }))}
                    className="w-20 px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  />
                  <span className="text-gray-400">x</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Note: For demo only, actual exchange limits may differ</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Trade Size
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={formData.tradeSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, tradeSize: e.target.value }))}
                    className="flex-1 px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                    placeholder="Enter trade size"
                    required
                  />
                  <select
                    value={formData.tradeSizeUnit}
                    onChange={(e) => setFormData(prev => ({ ...prev, tradeSizeUnit: e.target.value }))}
                    className="px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  >
                    {tradeSizeUnits.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Margin (USDT)
                </label>
                <input
                  type="number"
                  value={formData.margin}
                  onChange={(e) => setFormData(prev => ({ ...prev, margin: e.target.value }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="Enter margin amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Entry Price (USDT)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.entryPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, entryPrice: e.target.value }))}
                  className="w-full px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
                  placeholder="Enter entry price"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || !formData.tradeSize || !formData.margin || !formData.entryPrice}
                className="w-full bg-electric-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 btn-press flex items-center justify-center space-x-2 glow-blue"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Position...</span>
                  </>
                ) : (
                  <span>🤖 Generate Recovery Strategy</span>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="glass rounded-xl border border-dark-border p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recovery Analysis</h2>
            
            {!results && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛠️</div>
                <p className="text-gray-400">Enter your trade details to get AI recovery strategies</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-electric-blue/20 border-t-electric-blue rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">AI is analyzing your position...</p>
              </div>
            )}

            {results && (
              <div className="space-y-6">
                {/* Current Position Status */}
                <div className="glass border border-electric-blue/30 rounded-lg p-4 bg-electric-blue/5">
                  <h3 className="font-semibold text-white mb-4">Position Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Current Price</p>
                      <p className="text-lg font-semibold text-white">
                        ${results.currentPrice?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Entry Price</p>
                      <p className="text-lg font-semibold text-white">
                        ${results.entryPrice?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Liquidation Price</p>
                      <p className="text-lg font-semibold text-red-400">
                        ${results.liquidationPrice?.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Current P&L</p>
                      <p className={`text-lg font-semibold ${
                        (results.pnlAmount ?? 0) >= 0 ? 'text-profit-green' : 'text-risk-red'
                      }`}>
                        ${results.pnlAmount?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Selected Strategy */}
                <div className="glass border border-dark-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    AI Selected Strategy
                  </h3>
                  <div className="bg-electric-blue/10 border border-electric-blue/30 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-electric-blue">{results.selectedStrategy?.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(results.selectedStrategy?.riskLevel || '')}`}>
                          {results.selectedStrategy?.riskLevel} Risk
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-profit-green/20 text-profit-green border border-profit-green/30">
                          {results.selectedStrategy?.successRate}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{results.selectedStrategy?.description}</p>
                  </div>
                </div>

                {/* Risk Metrics */}
                <div className="glass border border-dark-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-4">Risk Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Margin Ratio</span>
                      <span className="text-white font-semibold">{results.riskMetrics?.marginRatio}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Liquidation Distance</span>
                      <span className="text-white font-semibold">{results.riskMetrics?.liquidationDistance}%</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="glass border border-dark-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    AI Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {results.recommendations?.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-gold-highlight rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Save Trade Button */}
                <button
                  onClick={handleSaveTrade}
                  className="w-full bg-profit-green hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 btn-press flex items-center justify-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Trade to Portfolio</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recovery Strategies Overview */}
        <div className="mt-8 glass rounded-xl border border-dark-border p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Available Recovery Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recoveryStrategies.map((strategy) => (
              <div key={strategy.id} className="glass border border-dark-border rounded-lg p-4 card-hover">
                <h3 className="font-semibold text-white mb-2">{strategy.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{strategy.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(strategy.riskLevel)}`}>
                    {strategy.riskLevel}
                  </span>
                  <span className="text-profit-green text-sm font-medium">{strategy.successRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Trades Portfolio */}
        {savedTrades.length > 0 && (
          <div className="mt-8 glass rounded-xl border border-dark-border p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Folder className="h-5 w-5 mr-2" />
              Saved Trades Portfolio ({savedTrades.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Coin</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Position</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Leverage</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Size</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Entry Price</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Strategy</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedTrades.map((trade) => (
                    <tr key={trade.id} className="border-b border-dark-border/50 hover:bg-dark-card/30 transition-colors">
                      <td className="py-4 px-4 text-gray-300 text-sm">
                        {new Date(trade.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{coins.find(c => c.value === trade.coin)?.icon}</span>
                          <span className="text-white font-medium">{trade.coin}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trade.position === 'Long' ? 'bg-profit-green/20 text-profit-green' : 'bg-risk-red/20 text-risk-red'
                        }`}>
                          {trade.position}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white font-medium">{trade.leverage}x</td>
                      <td className="py-4 px-4 text-gray-300">{trade.tradeSize} {trade.tradeSizeUnit}</td>
                      <td className="py-4 px-4 text-white">${parseFloat(trade.entryPrice).toFixed(2)}</td>
                      <td className="py-4 px-4 text-gray-300 text-sm max-w-xs truncate">
                        {trade.results?.selectedStrategy?.name}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleDeleteTrade(trade.id)}
                          className="text-risk-red hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-risk-red/10"
                          title="Delete trade"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoveryTool;