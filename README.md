<div align="center">
  <h1>🚀 Agent-B: Procurement Console UI</h1>
  <p><em>The Next-Gen Visual Command Center for Autonomous Multi-Agent Procurement</em></p>

  [![Next.js](https://img.shields.io/badge/Next.js-13.5+-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Live_Sync-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
</div>

<br/>

> **Live Deployment:** [**agent-b-dashboard.vercel.app**](https://agent-b-dashboard.vercel.app/)
> 
> *Note: This repository contains the **Frontend React Dashboard** of Agent-B. To see the highly sophisticated Multi-Agent AI architecture and Deep Learning predictive models powering this UI, please visit the [**Agent-B-Core-Engine Repository**](https://github.com/rudyxx007/Agent-B-Core-Engine).*

---

## ⚡ Executive Summary (Why This UI Stands Out)

Recruiters and Engineering Managers: This is not a standard, static template. This is a highly polished, interactive, production-ready dashboard designed specifically to visualize complex mathematical AI outputs into actionable business intelligence. 

It is built to demonstrate front-end mastery in translating raw data (tensors, quantiles, sentiment scores) into a seamless, high-performance UI experience.

### 🎨 Premium Aesthetics & UX Design
Built with a custom dark-mode design system tailored for enterprise data. Features dynamic micro-animations, an **Animated Aurora mesh-gradient background**, and glassmorphism elements to provide a sleek, "Command Center" feel. It proves an understanding of modern frontend UI/UX standards beyond just writing functional code.

### 📊 Advanced Data Visualization (`Recharts`)
Visualizing future uncertainty is incredibly complex. Instead of drawing a simple line, the dashboard uses custom-configured `<ComposedChart>` components from Recharts to dynamically generate a **Probability Cone**. It intelligently anchors live historical data to multi-horizon future predictions (10th, 50th, and 90th percentiles), mapping raw machine-learning confidence intervals into a visually intuitive layout.

### 🔄 Real-Time Database Integration (`Supabase`)
The UI is not mocking data. It connects directly to a live PostgreSQL database hosted on Supabase. As the autonomous Python backend agents push new market predictions and sentiment analysis to the cloud every day, this Next.js frontend instantly syncs and re-renders the predictive graphs without manual intervention.

### 📱 Responsive & Mobile-First (`Tailwind CSS`)
Despite housing complex data grids, KPI cards, and heavy SVG charting, the entire application is 100% responsive. Using Tailwind CSS, the complex multi-column layouts gracefully collapse into mobile-friendly views, ensuring the intelligence is accessible anywhere.

---

## 🛠️ Architecture & Core Components

- **`app/page.tsx`**: The stunning landing page designed for immediate visual impact. Features an animated background, grid-lighting effects, and a live preview of the probability cone to instantly communicate the product's value.
- **`app/dashboard/`**: The core application route housing the Procurement Console. Includes dynamic KPI cards monitoring Brent Crude pricing, FinGPT market sentiment, and volatility metrics.
- **`components/dashboard/probability-chart.tsx`**: A highly custom Recharts component dealing with complex date interpolation, null-value connections, and custom SVG `<linearGradient>` definitions to beautifully render the AI's predictive horizons.
- **`components/dashboard/diagnostics-grid.tsx`**: A responsive status grid that reads directly from the Supabase backend to confirm that the `FinGPT` sentiment analyzers and `iTransformer` forecasting pipelines have successfully run for the day.

## 🚀 Running Locally

Want to run the UI locally on your machine?

```bash
# 1. Clone the repository
git clone https://github.com/rudyxx007/Agent-B-UI.git

# 2. Install Dependencies
npm install

# 3. Create a .env.local file in the root directory and add your Supabase keys
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# 4. Start the development server
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🔮 Future Roadmap & Technical Refinements (Phase 4)

This UI is a living project that continues to evolve to meet the high-stakes demands of enterprise commodity procurement. The roadmap is divided into algorithmic refinements (resolving visualization debts) and advanced enterprise capabilities.

### 🛠️ Algorithmic Refinements & Fixes
- **Probability Cone Interpolation (UI Math Upgrade):** Currently, the multi-horizon probability cone projects in a linear fan from the 1-Day to the 1-Month and 3-Month horizons. To mathematically represent expanding uncertainty over time more accurately (and resolve current linear-rendering artifacts), a frontend interpolation algorithm (such as Bezier Curves or polynomial interpolation) will be implemented to smooth the transition and create a true logarithmic expanding "cone".

### 📈 Enterprise Procurement Capabilities
- **Model Accuracy & Variance Tracking:** The addition of a "Ghost Line" (overlaying yesterday's prediction onto today's actual price) and a collapsible KPI Ledger. This will visually expose Mean Absolute Error (MAE) and build executive trust by tracking historical prediction variance against reality.
- **"What-If" Scenario Simulator:** An interactive sandbox allowing procurement officers to override AI inputs (e.g., simulating a sudden drop in FinGPT sentiment) to watch the system dynamically recalculate the Probability Cone in real-time.
- **Procurement Action Recommender:** Translating mathematical models into business action by adding a dynamic widget that recommends precise purchasing strategies (e.g., *"Execute 60% of monthly quota today. The spot price has breached the 10th percentile support line."*).
- **The "AI Reasoning" Deep-Dive Page:** A dedicated route (`/sentiment`) that pairs raw news articles scraped by ScrapeGraphAI with the LLM's explicit "Thought Chain", proving exactly *why* a specific geopolitical event generated a specific sentiment tensor.
- **Hedging & Futures Contract Overlay:** A feature allowing users to input their active futures contracts/strike prices. The dashboard will overlay these fixed prices against the AI's Probability Cone to instantly visualize if current corporate hedges are 'in the money' or at risk.
- **Historical Backtester & ROI Ledger:** A simulation module that calculates the exact dollar amount the company would have saved over the trailing 12 months had they strictly followed the AI's asymmetrical buying recommendations compared to standard Dollar Cost Averaging.
