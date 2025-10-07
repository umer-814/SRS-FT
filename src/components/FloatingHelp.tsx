import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Shield, AlertTriangle, Info } from 'lucide-react';

const FloatingHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-r from-electric-blue to-blue-600 rounded-full flex items-center justify-center shadow-2xl text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(59, 130, 246, 0.5)',
            '0 0 30px rgba(59, 130, 246, 0.8)',
            '0 0 20px rgba(59, 130, 246, 0.5)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <HelpCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative bg-gradient-to-br from-dark-card to-dark-secondary border-2 border-electric-blue/30 rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto"
                style={{
                  boxShadow: '0 0 50px rgba(59, 130, 246, 0.3)',
                }}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-electric-blue/20 rounded-full flex items-center justify-center">
                      <HelpCircle className="h-6 w-6 text-electric-blue" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Help & Disclaimers</h2>
                  </div>
                  <p className="text-gray-400">Important information about Smart Recovery System</p>
                </div>

                <div className="space-y-6">
                  <div className="glass border border-risk-red/30 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-risk-red mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-risk-red font-semibold mb-2">Financial Disclaimer</h3>
                        <div className="text-gray-300 text-sm space-y-2">
                          <p>
                            <strong>We are not financial advisors.</strong> All predictions, analyses, and recommendations provided by this platform are for educational and informational purposes only.
                          </p>
                          <p>
                            <strong>No guarantees:</strong> Past performance does not guarantee future results. Cryptocurrency trading involves substantial risk of loss.
                          </p>
                          <p>
                            <strong>Your responsibility:</strong> Always conduct your own research and consult with qualified financial advisors before making investment decisions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass border border-electric-blue/30 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-electric-blue mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-electric-blue font-semibold mb-2">How It Works</h3>
                        <div className="text-gray-300 text-sm space-y-2">
                          <p>
                            <strong>Live Data:</strong> We fetch real-time BTC and ETH prices from CoinGecko API every 5 seconds.
                          </p>
                          <p>
                            <strong>AI Predictions:</strong> Our system generates predictions based on current market conditions, technical indicators, and historical patterns.
                          </p>
                          <p>
                            <strong>Recovery Strategies:</strong> The platform suggests potential recovery strategies for losing positions, but these are educational examples.
                          </p>
                          <p>
                            <strong>Demo Mode:</strong> Leverage options and some features are simulated for demonstration purposes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass border border-profit-green/30 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-profit-green mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-profit-green font-semibold mb-2">Trading Safety Tips</h3>
                        <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                          <li>Never invest more than you can afford to lose</li>
                          <li>Use stop-loss orders to limit potential losses</li>
                          <li>Diversify your portfolio across different assets</li>
                          <li>Start with small positions when learning</li>
                          <li>Keep your private keys and passwords secure</li>
                          <li>Be wary of "guaranteed returns" and FOMO trading</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="glass border border-gold-highlight/30 rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="text-gold-highlight font-semibold mb-2">Demo Access</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Try the platform with our demo account:
                    </p>
                    <div className="bg-dark-card rounded p-3 font-mono text-sm">
                      <p className="text-gray-400">Email: <span className="text-white">demo@crypto.com</span></p>
                      <p className="text-gray-400">Password: <span className="text-white">Demo1234</span></p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dark-border text-center">
                  <p className="text-xs text-gray-500">
                    © 2024 Smart Recovery System. Built for educational purposes.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingHelp;
