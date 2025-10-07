import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import Notification from '../components/Notification';
import { useCrypto } from '../contexts/CryptoContext';

const Reports = () => {
  const { prices } = useCrypto();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [notification, setNotification] = useState(null);

  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last 12 months' },
  ];

  const reportTypes = [
    { value: 'overview', label: 'Trade Overview', icon: FileText },
    { value: 'performance', label: 'Performance Analysis', icon: TrendingUp },
    { value: 'recovery', label: 'Recovery Strategies', icon: Target },
    { value: 'forecasts', label: 'AI Forecasts', icon: TrendingUp },
  ];

  // Mock data for demonstration
  const tradeData = {
    totalTrades: 47,
    winningTrades: 32,
    losingTrades: 15,
    winRate: 68.1,
    totalPnL: 3547.82,
    avgWin: 245.30,
    avgLoss: -156.70,
    largestWin: 1250.00,
    largestLoss: -890.50,
    totalVolume: 125000,
  };

  const recentTrades = [
    {
      id: 1,
      coin: 'BTC',
      type: 'Long',
      entryPrice: 42500,
      exitPrice: 43250,
      size: 1000,
      pnl: 17.65,
      date: '2024-01-15',
      strategy: 'DCA Recovery',
    },
    {
      id: 2,
      coin: 'ETH',
      type: 'Short',
      entryPrice: 2650,
      exitPrice: 2580,
      size: 2000,
      pnl: 54.26,
      date: '2024-01-14',
      strategy: 'Balance Injection',
    },
    {
      id: 3,
      coin: 'BTC',
      type: 'Long',
      entryPrice: 41800,
      exitPrice: 41200,
      size: 1500,
      pnl: -21.58,
      date: '2024-01-13',
      strategy: 'Partial Exit',
    },
    {
      id: 4,
      coin: 'ETH',
      type: 'Long',
      entryPrice: 2550,
      exitPrice: 2634,
      size: 1800,
      pnl: 59.28,
      date: '2024-01-12',
      strategy: 'AI Forecast Based',
    },
    {
      id: 5,
      coin: 'BTC',
      type: 'Short',
      entryPrice: 44200,
      exitPrice: 43100,
      size: 800,
      pnl: 19.91,
      date: '2024-01-11',
      strategy: 'Hedging Strategy',
    },
  ];

  const aiForecasts = [
    {
      id: 1,
      coin: 'BTC',
      timeframe: '1d',
      prediction: 'Bullish',
      accuracy: 87.5,
      confidence: 82,
      outcome: 'Correct',
    },
    {
      id: 2,
      coin: 'ETH',
      timeframe: '4h',
      prediction: 'Bearish',
      accuracy: 76.3,
      confidence: 71,
      outcome: 'Incorrect',
    },
    {
      id: 3,
      coin: 'BTC',
      timeframe: '1w',
      prediction: 'Bullish',
      accuracy: 92.1,
      confidence: 89,
      outcome: 'Correct',
    },
  ];

  const recoveryStrategies = [
    {
      strategy: 'Dollar Cost Averaging',
      timesUsed: 18,
      successRate: 83.3,
      avgRecovery: 12.5,
    },
    {
      strategy: 'Balance Injection',
      timesUsed: 12,
      successRate: 91.7,
      avgRecovery: 8.3,
    },
    {
      strategy: 'Partial Exit',
      timesUsed: 15,
      successRate: 73.3,
      avgRecovery: 15.2,
    },
    {
      strategy: 'Hedging',
      timesUsed: 8,
      successRate: 62.5,
      avgRecovery: 22.1,
    },
  ];

  const handleExportReport = () => {
    // Simulate PDF export
    setNotification({
      type: 'success',
      title: '📄 Export Started',
      message: `Exporting ${reportTypes.find(r => r.value === selectedReport)?.label} for ${periods.find(p => p.value === selectedPeriod)?.label}`,
    });

    setTimeout(() => {
      setNotification({
        type: 'success',
        title: '✅ Export Complete',
        message: 'Report has been downloaded successfully',
      });
    }, 1500);
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">📄 Trading Reports</h1>
              <p className="text-gray-400">Comprehensive analysis of your trading performance</p>
            </div>
            <button
              onClick={handleExportReport}
              className="mt-4 sm:mt-0 bg-electric-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors btn-press glow-blue"
            >
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 glass rounded-xl border border-dark-border p-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
              >
                {periods.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent transition-all"
              >
                {reportTypes.map((report) => (
                  <option key={report.value} value={report.value}>
                    {report.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl border border-dark-border p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total P&L</p>
                <p className="text-2xl font-bold text-profit-green">+${tradeData.totalPnL}</p>
              </div>
              <div className="p-3 bg-profit-green/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-profit-green" />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl border border-dark-border p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Win Rate</p>
                <p className="text-2xl font-bold text-white">{tradeData.winRate}%</p>
              </div>
              <div className="p-3 bg-electric-blue/10 rounded-lg">
                <Target className="h-6 w-6 text-electric-blue" />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl border border-dark-border p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Trades</p>
                <p className="text-2xl font-bold text-white">{tradeData.totalTrades}</p>
              </div>
              <div className="p-3 bg-purple-600/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl border border-dark-border p-6 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Volume Traded</p>
                <p className="text-2xl font-bold text-white">${tradeData.totalVolume.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gold-highlight/10 rounded-lg">
                <Calendar className="h-6 w-6 text-gold-highlight" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Trades */}
          <div className="glass rounded-xl border border-dark-border overflow-hidden">
            <div className="p-6 border-b border-dark-border">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Recent Trades
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-card/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Coin</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">P&L</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                  {recentTrades.map((trade) => (
                    <tr key={trade.id} className="hover:bg-dark-card/30 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">
                            {trade.coin === 'BTC' ? '🟠' : '💎'}
                          </span>
                          <span className="text-white font-medium">{trade.coin}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          trade.type === 'Long' 
                            ? 'bg-profit-green/20 text-profit-green border border-profit-green/30' 
                            : 'bg-risk-red/20 text-risk-red border border-risk-red/30'
                        }`}>
                          {trade.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          {trade.pnl >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-profit-green mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-risk-red mr-1" />
                          )}
                          <span className={`font-medium ${
                            trade.pnl >= 0 ? 'text-profit-green' : 'text-risk-red'
                          }`}>
                            ${Math.abs(trade.pnl)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-gray-300 text-sm">{trade.strategy}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recovery Strategies Performance */}
          <div className="glass rounded-xl border border-dark-border overflow-hidden">
            <div className="p-6 border-b border-dark-border">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Recovery Strategies
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recoveryStrategies.map((strategy, index) => (
                  <div key={index} className="glass border border-dark-border rounded-lg p-4 card-hover">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{strategy.strategy}</h3>
                      <span className="text-profit-green font-semibold">{strategy.successRate}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Times Used</p>
                        <p className="text-white font-medium">{strategy.timesUsed}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Success Rate</p>
                        <p className="text-white font-medium">{strategy.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Avg Recovery</p>
                        <p className="text-white font-medium">{strategy.avgRecovery}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Forecast Performance */}
        <div className="mt-8 glass rounded-xl border border-dark-border overflow-hidden">
          <div className="p-6 border-b border-dark-border">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              AI Forecast Performance
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-card/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Coin</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Timeframe</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Prediction</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Accuracy</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {aiForecasts.map((forecast) => (
                  <tr key={forecast.id} className="hover:bg-dark-card/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">
                          {forecast.coin === 'BTC' ? '🟠' : '💎'}
                        </span>
                        <span className="text-white font-medium">{forecast.coin}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-300">{forecast.timeframe}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        forecast.prediction === 'Bullish' 
                          ? 'bg-profit-green/20 text-profit-green border border-profit-green/30' 
                          : 'bg-risk-red/20 text-risk-red border border-risk-red/30'
                      }`}>
                        {forecast.prediction}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-white font-medium">
                      {forecast.accuracy}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        forecast.outcome === 'Correct' 
                          ? 'bg-profit-green/20 text-profit-green border border-profit-green/30' 
                          : 'bg-risk-red/20 text-risk-red border border-risk-red/30'
                      }`}>
                        {forecast.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;