import { z } from 'zod';

export const predictionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  date: z.string(),
  actual_close: z.number().nullable(),
  dxy_value: z.number().nullable(),
  holiday_flag: z.union([z.boolean(), z.number()]).nullable().transform(v => v === null ? null : Boolean(v)),
  fingpt_sentiment: z.number().nullable(),
  pred_1d_10th: z.number().nullable(),
  pred_1d_50th: z.number().nullable(),
  pred_1d_90th: z.number().nullable(),
  pred_1m_10th: z.number().nullable(),
  pred_1m_50th: z.number().nullable(),
  pred_1m_90th: z.number().nullable(),
  pred_3m_10th: z.number().nullable(),
  pred_3m_50th: z.number().nullable(),
  pred_3m_90th: z.number().nullable(),
  pred_volatility: z.number().nullable(),
  pred_ma_crossover: z.union([z.boolean(), z.number()]).nullable().transform(v => v === null ? null : Boolean(v)),
});

export type Prediction = z.infer<typeof predictionSchema>;

export type Horizon = '1d' | '1m' | '3m';

export type ProcurementAction = 'ACCELERATE' | 'DELAY' | 'STAGGER';

export interface HorizonValues {
  p10: number | null;
  p50: number | null;
  p90: number | null;
}

export interface ChartDataPoint {
  date: string;
  actual_close: number | null;
  pred_10th: number | null;
  pred_50th: number | null;
  pred_90th: number | null;
  isPrediction: boolean;
}

export interface DashboardData {
  predictions: Prediction[];
  latestPrediction: Prediction | null;
  historicalData: ChartDataPoint[];
}
