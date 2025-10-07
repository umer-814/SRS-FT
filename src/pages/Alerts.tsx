import React, { useState, useEffect } from 'react';
import { Bell, Mail, Smartphone, Monitor, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCrypto } from '../contexts/CryptoContext';

const Alerts = () => {
  const { prices } = useCrypto();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'price_drop',
      title: '⚠️ BTC dropped -5% in the last 1h',
      message: 'Bitcoin price fell from $43,500 to $41,325',
      time: '2 minutes ago',
      read: false,
      priority: 'high',
    },
    {
      id: 2,
      type: 'price_rise',
      title: '📈 ETH gained +3% in the last 24h',
      message: 'Ethereum price increased from $2,550 to $2,634',
      time: '1 hour ago',
      read: false,
      priority: 'medium',
    },
    {
      id: 3,
      type: 'liquidation_warning',
      title: '🚨 Liquidation Risk Alert',
      message: 'Your BTC position is 15% away from liquidation',
      time: '3 hours ago',
      read: true,
      priority: 'critical',
    },
    {
      id: 4,
      type: 'market_news',
      title: '📰 Market Update: Fed Announces New Policy',
      message: 'Federal Reserve announces new monetary policy affecting crypto markets',
      time: '6 hours ago',
      read: true,
      priority: 'low',
    },
    {
      id: 5,
      type: 'profit_target',
      title: '🎯 Profit Target Reached',
      message: 'Your ETH position has reached the target profit of +10%',
      time: '1 day ago',
      read: true,
      priority: 'medium',
    },
  ]);

  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    inApp: true,
    priceAlerts: true,
    newsAlerts: true,
    liquidationWarnings: true,
    profitTargets: true,
  });

  // Load preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('smartRecoveryAlertPreferences');
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('smartRecoveryAlertPreferences', JSON.stringify(preferences));
  }, [preferences]);

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotifications = [
        '📊 Volume spike detected in BTC/USDT pair',
        '⚡ Flash crash alert: Multiple coins down 2%+',
        '🎯 Support level broken for ETH at $2,600',
        '📈 Bullish pattern detected in market sentiment',
        '⚠️ High volatility expected in next 4 hours',
      ];

      const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)];
      
      setNotifications(prev => [{
        id: Date.now(),
        type: 'market_update',
        title: randomNotification,
        message: 'Detailed analysis available in your dashboard',
        time: 'Just now',
        read: false,
        priority: 'medium',
      }, ...prev.slice(0, 9)]);
    }, 30000); // Add new notification every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-risk-red bg-risk-red/20';
      case 'high': return 'border-orange-500 bg-orange-500/20';
      case 'medium': return 'border-gold-highlight bg-gold-highlight/20';
      case 'low': return 'border-electric-blue bg-electric-blue/20';
      default: return 'border-gray-500 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'price_drop': return <TrendingDown className="h-5 w-5 text-risk-red" />;
      case 'price_rise': return <TrendingUp className="h-5 w-5 text-profit-green" />;
      case 'liquidation_warning': return <AlertTriangle className="h-5 w-5 text-risk-red" />;
      default: return <Bell className="h-5 w-5 text-electric-blue" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const togglePreference = (key: string) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-dark-primary lg:pl-0">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🔔 Alerts & Notifications</h1>
            <p className="text-gray-400">Manage your trading alerts and notification preferences</p>
          </div>
          <div className="bg-electric-blue text-white px-4 py-2 rounded-lg font-semibold glow-blue">
            {unreadCount} Unread
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl border border-dark-border overflow-hidden">
              <div className="p-6 border-b border-dark-border">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Recent Notifications
                </h2>
              </div>
              <div className="divide-y divide-dark-border max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 hover:bg-gray-700/50 transition-colors cursor-pointer border-l-4 ${
                      !notification.read ? 'bg-dark-card/20' : ''
                    } ${getPriorityColor(notification.priority)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-medium ${
                            !notification.read ? 'text-white' : 'text-gray-300'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert Settings */}
            <div className="mt-8 glass rounded-xl border border-dark-border p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Alert Types</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-profit-green" />
                      <span className="text-gray-300">Price Alerts</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.priceAlerts}
                        onChange={() => togglePreference('priceAlerts')}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-risk-red" />
                      <span className="text-gray-300">Liquidation Warnings</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.liquidationWarnings}
                        onChange={() => togglePreference('liquidationWarnings')}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-5 w-5 text-electric-blue" />
                      <span className="text-gray-300">News Alerts</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.newsAlerts}
                        onChange={() => togglePreference('newsAlerts')}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-profit-green" />
                      <span className="text-gray-300">Profit Targets</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={preferences.profitTargets}
                        onChange={() => togglePreference('profitTargets')}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl border border-dark-border p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Delivery Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-electric-blue/10 rounded-lg">
                      <Mail className="h-5 w-5 text-electric-blue" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-sm text-gray-400">Send to registered email</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.email}
                      onChange={() => togglePreference('email')}
                    />
                    <span className="toggle-slider" />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-profit-green/10 rounded-lg">
                      <Smartphone className="h-5 w-5 text-profit-green" />
                    </div>
                    <div>
                      <p className="text-white font-medium">SMS</p>
                      <p className="text-sm text-gray-400">Text message alerts</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.sms}
                      onChange={() => togglePreference('sms')}
                    />
                    <span className="toggle-slider" />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-600/10 rounded-lg">
                      <Monitor className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">In-App</p>
                      <p className="text-sm text-gray-400">Browser notifications</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={preferences.inApp}
                      onChange={() => togglePreference('inApp')}
                    />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-dark-card/30 rounded-lg">
                <h3 className="text-white font-semibold mb-3">Today's Summary</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Alerts Sent</span>
                    <span className="text-white font-medium">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Critical Alerts</span>
                    <span className="text-risk-red font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Price Alerts</span>
                    <span className="text-electric-blue font-medium">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;