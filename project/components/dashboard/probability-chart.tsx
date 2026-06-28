'use client';

import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ReferenceLine,
} from 'recharts';
import { motion } from 'framer-motion';
import { Prediction, Horizon } from '@/lib/agent-b/types';
import { format, addDays, parseISO } from 'date-fns';

interface ProbabilityChartProps {
  predictions: Prediction[];
  horizon: Horizon;
}

export function ProbabilityChart({ predictions, horizon }: ProbabilityChartProps) {
  const chartData = useMemo(() => {
    if (predictions.length === 0) return [];

    const sorted = [...predictions].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const prefix = horizon === '1d' ? 'pred_1d' : horizon === '1m' ? 'pred_1m' : 'pred_3m';

    // Get last prediction for forecast
    const lastPrediction = sorted[sorted.length - 1];
    const lastDate = parseISO(lastPrediction.date);

    // Number of forecast days to show based on horizon
    const forecastDays = horizon === '1d' ? 3 : horizon === '1m' ? 14 : 30;

    // Historical data (last 30 days)
    const historicalData = sorted.slice(-30).map((p) => ({
      date: p.date,
      dateLabel: format(parseISO(p.date), 'MMM d'),
      actual_close: p.actual_close,
      pred_10th: null,
      pred_50th: null,
      pred_90th: null,
      type: 'historical',
    }));

    // Forecast data
    const forecastData = [];
    const p10 = lastPrediction[`${prefix}_10th` as keyof Prediction] as number | null;
    const p50 = lastPrediction[`${prefix}_50th` as keyof Prediction] as number | null;
    const p90 = lastPrediction[`${prefix}_90th` as keyof Prediction] as number | null;

    for (let i = 1; i <= Math.min(forecastDays, 7); i++) {
      const forecastDate = addDays(lastDate, i);
      forecastData.push({
        date: format(forecastDate, 'yyyy-MM-dd'),
        dateLabel: format(forecastDate, 'MMM d'),
        actual_close: null,
        pred_10th: p10,
        pred_50th: p50,
        pred_90th: p90,
        type: 'forecast',
      });
    }

    return [...historicalData, ...forecastData];
  }, [predictions, horizon]);

  const lastHistoricalPrice = useMemo(() => {
    const historical = chartData.filter((d) => d.type === 'historical');
    const last = historical[historical.length - 1];
    return last?.actual_close;
  }, [chartData]);

  if (chartData.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center rounded-xl border border-border bg-card/50">
        <p className="text-muted-foreground">No chart data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-card/50 p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">Brent Crude Price Forecast</h3>
          <p className="text-sm text-muted-foreground">
            Historical prices with {horizon === '1d' ? '1-Day' : horizon === '1m' ? '1-Month' : '3-Month'} probability cone
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-primary" />
            <span className="text-muted-foreground">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-accent" style={{ borderStyle: 'dashed' }} />
            <span className="text-muted-foreground">Median</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/20 rounded" />
            <span className="text-muted-foreground">90% CI</span>
          </div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="coneGradientChart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" vertical={false} />
            <XAxis
              dataKey="dateLabel"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              domain={['dataMin - 2', 'dataMax + 2']}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
              itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
              formatter={(value, name) => {
                const numVal = typeof value === 'number' ? value : null;
                if (numVal === null) return ['--', String(name)];
                const label = name === 'actual_close' ? 'Actual' : name === 'pred_50th' ? 'Median' : name === 'pred_90th' ? '90th %ile' : '10th %ile';
                return [`$${numVal.toFixed(2)}`, String(label)];
              }}
              labelFormatter={(label) => `Date: ${label}`}
            />

            {/* Reference line for transition point */}
            {lastHistoricalPrice && (
              <ReferenceLine
                x={chartData.filter((d) => d.type === 'historical').slice(-1)[0]?.dateLabel}
                stroke="hsl(var(--border))"
                strokeDasharray="5 5"
              />
            )}

            {/* Probability cone area */}
            <Area
              type="monotone"
              dataKey="p90"
              stroke="none"
              fill="url(#coneGradientChart)"
              fillOpacity={1}
            />

            {/* Upper bound line */}
            <Line
              type="monotone"
              dataKey="p90"
              stroke="hsl(var(--primary) / 0.6)"
              strokeWidth={1}
              strokeDasharray="3 3"
              dot={false}
            />

            {/* Median line */}
            <Line
              type="monotone"
              dataKey="pred_50th"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />

            {/* Lower bound line */}
            <Line
              type="monotone"
              dataKey="pred_10th"
              stroke="hsl(var(--primary) / 0.6)"
              strokeWidth={1}
              strokeDasharray="3 3"
              dot={false}
            />

            {/* Actual price line */}
            <Line
              type="monotone"
              dataKey="actual_close"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
