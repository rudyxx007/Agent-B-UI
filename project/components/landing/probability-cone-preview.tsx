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
} from 'recharts';
import { format, subDays, addDays } from 'date-fns';
import { mockPredictions } from '@/lib/agent-b/mock-data';

export function ProbabilityConePreview() {
  const chartData = useMemo(() => {
    const data = [];
    const latest = mockPredictions[mockPredictions.length - 1];

    // Last 14 days of historical data for preview
    const historical = mockPredictions.slice(-14);
    historical.forEach((p) => {
      data.push({
        date: format(new Date(p.date), 'MMM d'),
        actual: p.actual_close,
        p10: null,
        p50: null,
        p90: null,
      });
    });

    // Future predictions (next 5 days for preview)
    if (latest) {
      for (let i = 1; i <= 5; i++) {
        const futureDate = addDays(new Date(latest.date), i);
        data.push({
          date: format(futureDate, 'MMM d'),
          actual: null,
          p10: latest.pred_1d_10th,
          p50: latest.pred_1d_50th,
          p90: latest.pred_1d_90th,
        });
      }
    }

    return data;
  }, []);

  return (
    <div className="h-[280px] w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="coneGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.3)" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
            itemStyle={{ color: 'hsl(var(--muted-foreground))' }}
            formatter={(value, name) => {
              const numVal = typeof value === 'number' ? value : null;
              if (numVal === null) return ['--', String(name)];
              return [`$${numVal.toFixed(2)}`, String(name)];
            }}
          />
          {/* Probability cone area */}
          <Area
            type="monotone"
            dataKey="p90"
            stroke="none"
            fill="url(#coneGradient)"
            fillOpacity={1}
          />
          {/* Upper bound line */}
          <Line
            type="monotone"
            dataKey="p90"
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth={1}
            strokeDasharray="4 4"
            dot={false}
          />
          {/* Lower bound line */}
          <Line
            type="monotone"
            dataKey="p10"
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth={1}
            strokeDasharray="4 4"
            dot={false}
          />
          {/* Median line */}
          <Line
            type="monotone"
            dataKey="p50"
            stroke="hsl(var(--accent))"
            strokeWidth={2}
            dot={false}
          />
          {/* Actual price line */}
          <Line
            type="monotone"
            dataKey="actual"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
