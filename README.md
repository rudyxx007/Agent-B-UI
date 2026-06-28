# Agent-B: Brent Crude Procurement Intelligence

A zero-cost Reliance procurement forecasting system for Brent crude futures using iTransformer quantile predictions and AI-powered sentiment analysis.

## Overview

Agent-B is an AI-powered procurement forecasting platform designed for Reliance Industries. It leverages:

- **iTransformer v7.0**: State-of-the-art quantile forecasting model trained on 90-day Brent price histories
- **CrewAI**: Multi-agent news analysis for sentiment scoring
- **FinGPT**: Real-time sentiment analysis from global energy news
- **Modal**: Serverless inference pipeline
- **Supabase**: Real-time prediction storage and retrieval

## Features

- 10th, 50th, and 90th percentile forecasts across 1-day, 1-month, and 3-month horizons
- Strategic procurement recommendations (ACCELERATE/DELAY/STAGGER)
- Real-time FinGPT sentiment scoring (-1 to +1 scale)
- Interactive probability cone visualization
- Diagnostics grid showing model inputs and signals
- Derived execution trace terminal

## Tech Stack

- **Framework**: Next.js 13.5 (App Router)
- **Styling**: Tailwind CSS with custom dark institutional theme
- **UI Components**: shadcn/ui
- **Animations**: motion/react (framer-motion)
- **Charts**: Recharts
- **Database**: Supabase
- **Validation**: Zod

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account with `agent_b_predictions` table

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Schema

The `agent_b_predictions` table should have the following columns:

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| date | date | Prediction date |
| actual_close | numeric | Actual Brent close price |
| dxy_value | numeric | Dollar Index value |
| holiday_flag | boolean | Market holiday indicator |
| fingpt_sentiment | numeric | FinGPT sentiment score (-1 to +1) |
| pred_1d_10th | numeric | 1-day 10th percentile |
| pred_1d_50th | numeric | 1-day 50th percentile (median) |
| pred_1d_90th | numeric | 1-day 90th percentile |
| pred_1m_10th | numeric | 1-month 10th percentile |
| pred_1m_50th | numeric | 1-month 50th percentile |
| pred_1m_90th | numeric | 1-month 90th percentile |
| pred_3m_10th | numeric | 3-month 10th percentile |
| pred_3m_50th | numeric | 3-month 50th percentile |
| pred_3m_90th | numeric | 3-month 90th percentile |
| pred_volatility | numeric | Predicted volatility spread |
| pred_ma_crossover | boolean | MA crossover signal |

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type check
npm run typecheck
```

The app will be available at `http://localhost:3000`.

## Routes

- `/` - Landing page with probability cone preview
- `/dashboard` - Institutional procurement console

## Vercel Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import the project in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Deploy!

## Project Structure

```
/
├── app/
│   ├── layout.tsx           # Root layout with theme
│   ├── page.tsx             # Landing page
│   ├── globals.css          # Global styles and theme
│   └── dashboard/
│       └── page.tsx         # Procurement console
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── landing/
│   │   └── probability-cone-preview.tsx
│   └── dashboard/
│       ├── strategic-banner.tsx
│       ├── horizon-selector.tsx
│       ├── kpi-cards.tsx
│       ├── probability-chart.tsx
│       ├── diagnostics-grid.tsx
│       └── logistics-terminal.tsx
├── lib/
│   ├── supabase/
│   │   └── client.ts        # Supabase browser client
│   └── agent-b/
│       ├── types.ts         # Zod schemas and types
│       ├── analytics.ts     # Helper functions
│       ├── data.ts          # Data fetching layer
│       └── mock-data.ts     # Demo data fallback
├── hooks/
│   ├── use-toast.ts         # Toast notifications
│   └── use-prediction-data.ts
└── README.md
```

## License

Proprietary - Reliance Industries
