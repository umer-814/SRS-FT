# ⚡ Smart Recovery System for Future Traders

A professional, responsive frontend application built with React + Tailwind CSS for helping BTC & ETH futures traders analyze risks, forecast price trends, and recover from losing positions.

## 🎯 Features

### 📈 Market Overview (Landing Page)
- **Live Cryptocurrency Prices** via CoinGecko API
  - BTC & ETH prices in both USD and PKR
  - 24-hour price change indicators
  - Real-time updates every 60 seconds
- **Market Statistics Dashboard**
  - Total Market Cap
  - 24h Trading Volume
  - BTC Dominance
  - Fear & Greed Index
- **Crypto News Section** with dummy headlines
- **Additional Cryptocurrencies** (BNB, XRP, SOL, ADA) with dummy data
- Open to all users (no authentication required)

### 🔑 Authentication System

#### Login Page
- Email/Phone + Password fields
- **Demo Credentials:**
  - Email: `demo@crypto.com`
  - Password: `Demo1234`
- "Use demo credentials" button for quick access
- Validation with centered popup notifications
- Success: "✅ Login successful"
- Error: "❌ Invalid credentials"
- Data persists in localStorage

#### Signup Page
- **Multi-step flow:**
  1. Enter Email/Phone
  2. Create Password (8-14 chars, uppercase, lowercase, number)
  3. Verification Code (simulated)
- **Password validation:**
  - Real-time strength indicator
  - Inline requirement checks
  - Password confirmation matching
- **Trusted Users Counter** with animated ticker (280M+ users)
- Auto-login after successful signup

### 🔮 AI Price Forecast
- **Disclaimer Modal** on entry (required acceptance)
- Inputs:
  - Coin selection (BTC/ETH)
  - Timeframe (1h, 4h, 1d, 1w)
- **AI-Generated Outputs:**
  - Current vs Predicted Price
  - Price change percentage
  - Risk level (Low/Medium/High)
  - Confidence score
  - Support & Resistance levels
  - Analysis factors
- **Requires authentication**

### 🛠️ Recovery Tool (Advanced Trade Recovery)
- **Comprehensive Trade Form:**
  - Coin (BTC/ETH) with emoji icons
  - Position Type (Long/Short)
  - Leverage slider (1x - 125x for BTC, 1x - 100x for ETH)
  - Trade Size with unit selector (USDT/BTC/ETH)
  - Margin (USDT)
  - Entry Price
- **AI Recovery Analysis:**
  - Current market price
  - Liquidation price
  - Risk level indicators
  - Recovery strategy recommendations
- **Save Trade Functionality:**
  - Saves trades to localStorage
  - Portfolio table displaying all saved trades
  - Delete option for each trade
- **Requires authentication**

### 🔔 Alerts & Notifications
- **Real-time Alert Feed:**
  - Price drops and rises
  - Liquidation warnings
  - Market news
  - Profit targets
- **Delivery Preferences:**
  - Email notifications
  - SMS alerts
  - In-App notifications
- **Alert Type Toggles:**
  - Price alerts
  - Liquidation warnings
  - News alerts
  - Profit targets
- **Preferences persist in localStorage**
- **Requires authentication**

### 📄 Trading Reports
- **Performance Overview:**
  - Total P&L
  - Win Rate
  - Total Trades
  - Volume Traded
- **Report Filters:**
  - Time Period (7d, 30d, 90d, 1y)
  - Report Type (Overview, Performance, Recovery, Forecasts)
- **Data Tables:**
  - Recent trades with P&L
  - Recovery strategy performance
  - AI forecast accuracy
- **Export Functionality:**
  - "📄 Export PDF" button
  - Success notification popup
- **Requires authentication**

## 🎨 Design & UI/UX

### Theme
- **Dark fintech theme** inspired by Binance/TradingView
- Professional color scheme:
  - Blue (#3B82F6) → Trust & Primary actions
  - Green (#10B981) → Profit & Success
  - Red (#EF4444) → Loss & Warnings
  - Gold (#F59E0B) → Highlights

### Visual Elements
- Real color emojis: 🟠 Bitcoin, 💎 Ethereum
- Smooth animations and transitions
- Card hover effects
- Loading spinners
- Glow effects on interactive elements
- Glass morphism design

### Responsiveness
- Fully responsive across desktop, tablet, and mobile
- Sidebar navigation with mobile hamburger menu
- Adaptive layouts and breakpoints
- Touch-friendly interface

## 🔒 Route Protection

- **Public Route:** Market Overview (/)
- **Protected Routes:** All other pages
  - If not logged in: Redirects to login with message
  - "🔒 Please log in or sign up to access this feature"

## 💾 Data Persistence (localStorage)

1. **Authentication State**
   - Key: `smartRecoveryAuth`
   - Stores user info and login status

2. **Saved Trades**
   - Key: `smartRecoverySavedTrades`
   - Stores all saved trades from Recovery Tool

3. **Alert Preferences**
   - Key: `smartRecoveryAlertPreferences`
   - Stores notification settings

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Demo Credentials
For quick access, use these credentials:
- **Email:** demo@crypto.com
- **Password:** Demo1234

## 🌐 API Integration

### CoinGecko API
- **Endpoint:** `https://api.coingecko.com/api/v3/simple/price`
- **Parameters:**
  - `ids`: bitcoin,ethereum
  - `vs_currencies`: usd,pkr
  - `include_24hr_change`: true
- **Update Frequency:** Every 60 seconds
- **No API key required** for basic usage

## 📝 Important Notes

### Leverage Settings
The leverage ranges shown (1x-125x for BTC, 1x-100x for ETH) are **for demo purposes only**. Actual exchange limits may differ. Always verify leverage limits with your trading platform.

### Financial Disclaimer
This application is for **educational and demonstration purposes only**. It is not financial advice. The AI predictions and recovery strategies are simulated and should not be used for actual trading decisions.

### Data Simulation
- All AI forecasts are simulated
- Recovery strategies use dummy calculations
- Market data (except BTC & ETH prices) is generated for demonstration
- Trading reports show sample data

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** React Context API + localStorage

## 📁 Project Structure

```
src/
├── components/
│   ├── AnimatedCounter.tsx
│   ├── AuthGuard.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   ├── Notification.tsx
│   └── Sidebar.tsx
├── contexts/
│   └── AuthContext.tsx
├── pages/
│   ├── Alerts.tsx
│   ├── Forecast.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── RecoveryTool.tsx
│   ├── Reports.tsx
│   └── Signup.tsx
├── App.tsx
└── main.tsx
```

## 🎓 Final Year Project

This is a Final Year Project demonstrating a comprehensive web application with:
- Modern React architecture
- Authentication and authorization
- API integration
- localStorage persistence
- Responsive design
- Professional UI/UX
- Route protection
- Form validation
- Real-time data updates

## 📄 License

This project is for educational purposes.

## 👤 Author

Final Year Project - Smart Recovery System
