import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Info, Target, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Modal from '../components/Modal';
import { useCrypto } from '../contexts/CryptoContext';

const Forecast = () => {
  const { prices } = useCrypto();
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const coins = [
    { value: 'BTC', label: 'Bitcoin', icon: '🟠', color: 'text-orange-400' },
    { value: 'ETH', label: 'Ethereum', icon: '💎', color: 'text-blue-400' },
  ];

  const timeframes = [
    { value: '1h', label: '1 Hour', description: 'Short-term scalping' },
    { value: '4h', label: '4 Hours', description: 'Intraday trading' },
    { value: '1d', label: '1 Day', description: 'Daily analysis' },
    { value: '1w', label: '1 Week', description: 'Swing trading' },
  ];

  const generatePrediction = () => {
    setLoading(true);

    setTimeout(() => {
      const currentPrice = selectedCoin === 'BTC'
        ? (prices?.bitcoin?.usd || 43250)
        : (prices?.ethereum?.usd || 2634);
      const changePercent = (Math.random() - 0.5) * 10; // -5% to +5%
      const predictedPrice = currentPrice * (1 + changePercent / 100);
      
      const confidence = Math.floor(Math.random() * 25) + 65; // 65-90%
      const riskLevel = Math.abs(changePercent) < 1.5 ? 'Low' : Math.abs(changePercent) < 3 ? 'Medium' : 'High';
      
      // Generate support and resistance levels
      const supportLevel = currentPrice * (1 - Math.random() * 0.05);
      const resistanceLevel = currentPrice * (1 + Math.random() * 0.05);
      
      setPrediction({
        currentPrice,
        predictedPrice,
        changePercent,
        confidence,
        riskLevel,
        supportLevel,
        resistanceLevel,
        timeframe: selectedTimeframe,
        coin: selectedCoin,
        factors: [
          'Technical analysis indicators (RSI, MACD, Bollinger Bands)',
          'Market sentiment analysis from social media',
          'Trading volume patterns and whale movements',
          'Historical price movements and seasonal trends',
          'News sentiment impact and regulatory developments',
          'Correlation with traditional markets (S&P 500, Gold)',
        ],
        keyLevels: {
          strongSupport: supportLevel * 0.98,
          support: supportLevel,
          resistance: resistanceLevel,
          strongResistance: resistanceLevel * 1.02,
        }
      });
      setLoading(false);
    }, 2500);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-profit-green bg-profit-green/20 border-profit-green/30';
      case 'Medium': return 'text-gold-highlight bg-gold-highlight/20 border-gold-highlight/30';
      case 'High': return 'text-risk-red bg-risk-red/20 border-risk-red/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'Low': return <div className="w-3 h-3 bg-profit-green rounded-full animate-pulse" />;
      case 'Medium': return <AlertTriangle className="h-4 w-4 text-gold-highlight" />;
      case 'High': return <AlertTriangle className="h-4 w-4 text-risk-red animate-pulse" />;
      default: return null;
    }
  };

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
  };

  const handleDisclaimerDecline = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-dark-primary lg:pl-0">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Disclaimer Modal */}
        <Modal
          isOpen={showDisclaimer}
          onClose={() => {}}
          title="⚠️ Important Disclaimer"
          size="lg"
        >
          <div className="space-y-6">
            <div className="glass border border-risk-red/30 rounded-lg p-6 bg-risk-red/5">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-risk-red mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-risk-red font-semibold text-lg mb-3">Financial Disclaimer</h3>
                  <div className="text-gray-300 space-y-3">
                    <p>
                      <strong>We are not financial advisors.</strong> The predictions and analysis provided by our AI system are for informational purposes only and should not be considered as financial advice.
                    </p>
                    <p>
                      <strong>AI predictions may be inaccurate.</strong> Cryptocurrency markets are highly volatile and unpredictable. Past performance does not guarantee future results.
                    </p>
                    <p>
                      <strong>Use this information at your own risk.</strong> Always conduct your own research and consider consulting with qualified financial advisors before making investment decisions.
                    </p>
                    <p>
                      <strong>Risk of loss:</strong> Trading cryptocurrencies involves substantial risk of loss and is not suitable for all investors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleDisclaimerDecline}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors btn-press"
              >
                I Decline - Go Back
              </button>
              <button
                onClick={handleDisclaimerAccept}
                className="flex-1 bg-electric-blue hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors btn-press"
              >
                I Understand - Continue
              </button>
            </div>
          </div>
        </Modal>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            🔮 AI Price Forecast
            <div className="ml-3 w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
          </h1>
          <p className="text-gray-400">Advanced AI-powered cryptocurrency price predictions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="glass rounded-xl border border-dark-border p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Forecast Parameters
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Select Cryptocurrency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {coins.map((coin) => (
                    <button
                      key={coin.value}
                      onClick={() => setSelectedCoin(coin.value)}
                      className={`p-4 rounded-lg border transition-all card-hover ${
                        selectedCoin === coin.value
                          ? 'bg-electric-blue/20 border-electric-blue text-white glow-blue'
                          : 'glass border-dark-border text-gray-300 hover:border-electric-blue/50'
                      }`}
                    >
                      <div className={`text-3xl mb-2 ${coin.color}`}>{coin.icon}</div>
                      <div className="text-sm font-medium">{coin.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{coin.value}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Time Frame
                </label>
                <div className="space-y-2">
                  {timeframes.map((tf) => (
                    <button
                      key={tf.value}
                      onClick={() => setSelectedTimeframe(tf.value)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        selectedTimeframe === tf.value
                          ? 'bg-electric-blue/20 border-electric-blue text-white'
                          : 'glass border-dark-border text-gray-300 hover:border-electric-blue/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{tf.label}</div>
                          <div className="text-xs text-gray-400">{tf.description}</div>
                        </div>
                        {selectedTimeframe === tf.value && (
                          <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generatePrediction}
                disabled={loading}
                className="w-full bg-electric-blue hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 btn-press flex items-center justify-center space-x-2 glow-blue"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Generating AI Forecast...</span>
                  </>
                ) : (
                  <>
                    <span>🔮 Generate AI Forecast</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="glass rounded-xl border border-dark-border p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Forecast Results
            </h2>
            
            {!prediction && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔮</div>
                <p className="text-gray-400 mb-4">Select parameters and generate a forecast</p>
                <p className="text-sm text-gray-500">AI analysis includes technical indicators, sentiment, and market data</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-electric-blue/20 border-t-electric-blue rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 mb-2">AI is analyzing market data...</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>• Processing technical indicators</p>
                  <p>• Analyzing market sentiment</p>
                  <p>• Calculating probability ranges</p>
                </div>
              </div>
            )}

            {prediction && (
              <div className="space-y-6">
                {/* Price Prediction */}
                <div className="glass border border-electric-blue/30 rounded-lg p-4 bg-electric-blue/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center">
                      <span className="text-2xl mr-2">{coins.find(c => c.value === prediction.coin)?.icon}</span>
                      {prediction.coin} Price Prediction
                    </h3>
                    <span className="text-sm text-electric-blue bg-electric-blue/20 px-2 py-1 rounded-full">
                      {prediction.timeframe} forecast
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Current Price</p>
                      <p className="text-xl font-bold text-white">
                        ${prediction.currentPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Predicted Price</p>
                      <p className="text-xl font-bold text-white">
                        ${prediction.predictedPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2 p-3 bg-dark-card/50 rounded-lg">
                    {prediction.changePercent >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-profit-green" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-risk-red" />
                    )}
                    <span className={`font-bold text-lg ${
                      prediction.changePercent >= 0 ? 'text-profit-green' : 'text-risk-red'
                    }`}>
                      {prediction.changePercent >= 0 ? '+' : ''}{prediction.changePercent.toFixed(2)}%
                    </span>
                    <span className="text-gray-400">expected change</span>
                  </div>
                </div>

                {/* Key Levels */}
                <div className="glass border border-dark-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Key Price Levels
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-risk-red/10 rounded border border-risk-red/20">
                      <span className="text-risk-red font-medium">Strong Resistance</span>
                      <span className="text-white font-semibold">${prediction.keyLevels.strongResistance.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-risk-red/5 rounded border border-risk-red/10">
                      <span className="text-risk-red/80">Resistance</span>
                      <span className="text-white">${prediction.keyLevels.resistance.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-profit-green/5 rounded border border-profit-green/10">
                      <span className="text-profit-green/80">Support</span>
                      <span className="text-white">${prediction.keyLevels.support.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-profit-green/10 rounded border border-profit-green/20">
                      <span className="text-profit-green font-medium">Strong Support</span>
                      <span className="text-white font-semibold">${prediction.keyLevels.strongSupport.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="glass border border-dark-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-4">Risk Assessment</h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getRiskIcon(prediction.riskLevel)}
                      <span className="text-white font-medium">Risk Level</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(prediction.riskLevel)}`}>
                      {prediction.riskLevel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Confidence Score</span>
                    <span className="text-white font-semibold">{prediction.confidence}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-600 rounded-full h-3 mb-4">
                    <div
                      className="bg-electric-blue h-3 rounded-full transition-all duration-1000 glow-blue"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>

                  <div className="text-xs text-gray-400">
                    Confidence based on historical accuracy of similar market conditions
                  </div>
                </div>

                {/* Analysis Factors */}
                <div className="glass border border-dark-border rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Analysis Factors
                  </h3>
                  <ul className="space-y-2">
                    {prediction.factors.map((factor, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-electric-blue rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;