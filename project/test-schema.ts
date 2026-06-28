import { predictionSchema } from './lib/agent-b/types';

const testData = {
  id: '33dfbacb-9682-4947-9877-52707a6428a4',
  date: '2026-06-28T12:59:22.620082+00:00',
  actual_close: 72.5999984741211,
  dxy_value: 101.360000610352,
  holiday_flag: 0,
  fingpt_sentiment: -1,
  pred_1d_10th: 63.9489949510648,
  pred_1d_50th: 72.0931947131767,
  pred_1d_90th: 84.4402255032323,
  pred_1m_10th: 52.8358637342007,
  pred_1m_50th: 77.2915728581046,
  pred_1m_90th: 95.9123906977971,
  pred_3m_10th: 56.4433904800909,
  pred_3m_50th: 84.3410495383696,
  pred_3m_90th: 132.129394670816,
  pred_volatility: 0.723122775554657,
  pred_ma_crossover: 0
};

const result = predictionSchema.safeParse(testData);
if (result.success) {
  console.log('Schema parsed successfully!');
  console.log(result.data);
} else {
  console.error('Schema parsing failed:', result.error);
}
