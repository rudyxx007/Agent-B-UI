import { Prediction, Horizon, HorizonValues, ProcurementAction, ChartDataPoint } from './types';
import { format, parseISO } from 'date-fns';

export function getHorizonValues(prediction: Prediction | null, horizon: Horizon): HorizonValues {
  if (!prediction) {
    return { p10: null, p50: null, p90: null };
  }

  const prefix = horizon === '1d' ? 'pred_1d' : horizon === '1m' ? 'pred_1m' : 'pred_3m';

  return {
    p10: prediction[`${prefix}_10th` as keyof Prediction] as number | null,
    p50: prediction[`${prefix}_50th` as keyof Prediction] as number | null,
    p90: prediction[`${prefix}_90th` as keyof Prediction] as number | null,
  };
}

export function calculateProcurementAction(
  values: HorizonValues,
  sentiment: number | null,
  actualClose: number | null
): ProcurementAction {
  const { p10, p50, p90 } = values;

  if (p50 === null || p10 === null || p90 === null) {
    return 'STAGGER';
  }

  const spread = p90 - p10;
  const upperPressure = p90 - p50;
  const lowerPressure = p50 - p10;
  const sentimentWeight = sentiment ?? 0;

  // Price pressure toward upper bound or high sentiment -> accelerate
  if (upperPressure < spread * 0.3 && sentimentWeight > 0.3) {
    return 'ACCELERATE';
  }

  // Softening trend or negative sentiment -> delay
  if (lowerPressure < spread * 0.3 || sentimentWeight < -0.3) {
    return 'DELAY';
  }

  // Default to stagger
  return 'STAGGER';
}

export function getSentimentLabel(sentiment: number | null): { label: string; color: string } {
  if (sentiment === null) {
    return { label: 'Neutral', color: 'text-muted-foreground' };
  }

  if (sentiment >= 0.6) return { label: 'Very Bullish', color: 'text-emerald-400' };
  if (sentiment >= 0.3) return { label: 'Bullish', color: 'text-emerald-500' };
  if (sentiment >= 0) return { label: 'Slightly Bullish', color: 'text-emerald-600' };
  if (sentiment >= -0.3) return { label: 'Slightly Bearish', color: 'text-amber-500' };
  if (sentiment >= -0.6) return { label: 'Bearish', color: 'text-amber-400' };
  return { label: 'Very Bearish', color: 'text-red-400' };
}

export function formatDollars(value: number | null): string {
  if (value === null) return '--';
  return `$${value.toFixed(2)}`;
}

export function formatPercent(value: number | null): string {
  if (value === null) return '--';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function shapeChartData(predictions: Prediction[]): ChartDataPoint[] {
  const sorted = [...predictions].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return sorted.map((p, index) => {
    // For historical data, use actual_close
    // For the last row (most recent), extend with predictions
    const isLatest = index === sorted.length - 1;

    return {
      date: p.date,
      actual_close: p.actual_close,
      pred_10th: isLatest ? p.pred_1d_10th : null,
      pred_50th: isLatest ? p.pred_1d_50th : null,
      pred_90th: isLatest ? p.pred_1d_90th : null,
      isPrediction: isLatest,
    };
  });
}

export function shapeChartDataWithForecast(
  predictions: Prediction[],
  horizon: Horizon
): ChartDataPoint[] {
  const sorted = [...predictions].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const prefix = horizon === '1d' ? 'pred_1d' : horizon === '1m' ? 'pred_1m' : 'pred_3m';

  // Get the last known date
  const lastPrediction = sorted[sorted.length - 1];
  if (!lastPrediction) return [];

  const lastDate = parseISO(lastPrediction.date);

  // Generate forecast points based on horizon
  const forecastDays = horizon === '1d' ? 1 : horizon === '1m' ? 30 : 90;
  const forecastPoints: ChartDataPoint[] = [];

  for (let i = 1; i <= Math.min(forecastDays, 7); i++) {
    const forecastDate = format(new Date(lastDate.getTime() + i * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
    forecastPoints.push({
      date: forecastDate,
      actual_close: null,
      pred_10th: lastPrediction[`${prefix}_10th` as keyof Prediction] as number | null,
      pred_50th: lastPrediction[`${prefix}_50th` as keyof Prediction] as number | null,
      pred_90th: lastPrediction[`${prefix}_90th` as keyof Prediction] as number | null,
      isPrediction: true,
    });
  }

  // Historical data
  const historicalData: ChartDataPoint[] = sorted.slice(-30).map((p) => ({
    date: p.date,
    actual_close: p.actual_close,
    pred_10th: null,
    pred_50th: null,
    pred_90th: null,
    isPrediction: false,
  }));

  return [...historicalData, ...forecastPoints];
}

export function getActionColor(action: ProcurementAction): string {
  switch (action) {
    case 'ACCELERATE':
      return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
    case 'DELAY':
      return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
    case 'STAGGER':
      return 'text-sky-400 border-sky-500/50 bg-sky-500/10';
  }
}

export function getHorizonLabel(horizon: Horizon): string {
  switch (horizon) {
    case '1d':
      return '1-Day';
    case '1m':
      return '1-Month';
    case '3m':
      return '3-Month';
  }
}

export function formatDate(date: string): string {
  try {
    return format(parseISO(date), 'MMM d, yyyy');
  } catch {
    return date;
  }
}
