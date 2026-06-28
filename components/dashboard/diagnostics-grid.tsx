'use client';

import { motion } from 'framer-motion';
import { Prediction } from '@/lib/agent-b/types';
import { getSentimentLabel, formatDate } from '@/lib/agent-b/analytics';
import { Gauge, Activity, TrendingUp, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DiagnosticsGridProps {
  prediction: Prediction | null;
}

export function DiagnosticsGrid({ prediction }: DiagnosticsGridProps) {
  const sentiment = prediction?.fingpt_sentiment ?? null;
  const sentimentInfo = getSentimentLabel(sentiment);
  const sentimentPercent = sentiment !== null ? ((sentiment + 1) / 2) * 100 : 50;

  const diagnostics = [
    {
      key: 'sentiment',
      label: 'FinGPT Sentiment',
      icon: Gauge,
      content: (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${sentimentInfo.color}`}>
              {sentimentInfo.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {sentiment !== null ? sentiment.toFixed(2) : '--'}
            </span>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500"
              style={{ width: '100%', opacity: 0.3 }}
            />
            <div
              className="absolute h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{
                width: `${sentimentPercent}%`,
                left: 0,
              }}
            />
            <div
              className="absolute w-2 h-2 bg-white rounded-full shadow-lg border border-border transition-all duration-500"
              style={{
                left: `calc(${sentimentPercent}% - 4px)`,
                top: '0',
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Bearish</span>
            <span>Neutral</span>
            <span>Bullish</span>
          </div>
        </div>
      ),
    },
    {
      key: 'volatility',
      label: 'Predicted Volatility',
      icon: Activity,
      content: (
        <div className="space-y-1">
          <div className="text-2xl font-bold tabular-nums">
            {prediction?.pred_volatility !== null && prediction?.pred_volatility !== undefined
              ? `${prediction.pred_volatility.toFixed(2)}%`
              : '--'}
          </div>
          <p className="text-xs text-muted-foreground">Expected price spread</p>
        </div>
      ),
    },
    {
      key: 'crossover',
      label: 'MA Crossover',
      icon: TrendingUp,
      content: (
        <div className="flex items-center gap-2">
          <Badge
            variant={prediction?.pred_ma_crossover ? 'default' : 'outline'}
            className={prediction?.pred_ma_crossover ? 'bg-primary/20 text-primary border-primary/30' : 'text-muted-foreground'}
          >
            {prediction?.pred_ma_crossover ? 'ACTIVE' : 'INACTIVE'}
          </Badge>
          <span className="text-xs text-muted-foreground">Signal status</span>
        </div>
      ),
    },
    {
      key: 'dxy',
      label: 'DXY Value',
      icon: DollarSign,
      content: (
        <div className="space-y-1">
          <div className="text-2xl font-bold tabular-nums">
            {prediction?.dxy_value !== null && prediction?.dxy_value !== undefined
              ? prediction.dxy_value.toFixed(2)
              : '--'}
          </div>
          <p className="text-xs text-muted-foreground">Dollar Index</p>
        </div>
      ),
    },
    {
      key: 'holiday',
      label: 'Holiday Flag',
      icon: Calendar,
      content: (
        <div className="flex items-center gap-2">
          <Badge
            variant={prediction?.holiday_flag ? 'destructive' : 'outline'}
            className={prediction?.holiday_flag ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'text-muted-foreground'}
          >
            {prediction?.holiday_flag ? 'YES' : 'NO'}
          </Badge>
          <span className="text-xs text-muted-foreground">Market status</span>
        </div>
      ),
    },
    {
      key: 'timestamp',
      label: 'Last Pipeline Run',
      icon: AlertTriangle,
      content: (
        <div className="space-y-1">
          <div className="text-lg font-semibold">
            {prediction ? formatDate(prediction.date) : '--'}
          </div>
          <p className="text-xs text-muted-foreground">Pipeline timestamp</p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
        Diagnostics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {diagnostics.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-4 rounded-xl border border-border bg-card/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-md bg-muted">
                <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
            </div>
            {item.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
