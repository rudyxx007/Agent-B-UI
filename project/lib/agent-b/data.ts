import { supabase } from '@/lib/supabase/client';
import { predictionSchema, Prediction } from '@/lib/agent-b/types';
import { mockPredictions } from '@/lib/agent-b/mock-data';

export async function fetchPredictions(): Promise<{
  data: Prediction[];
  isDemo: boolean;
  error: string | null;
}> {
  try {
    const { data, error } = await supabase
      .from('agent_b_predictions')
      .select('*')
      .order('date', { ascending: false })
      .limit(30);

    if (error) {
      console.error('Supabase error:', error);
      return {
        data: mockPredictions,
        isDemo: true,
        error: null, // Not showing error to user, using demo data gracefully
      };
    }

    if (!data || data.length === 0) {
      return {
        data: mockPredictions,
        isDemo: true,
        error: null,
      };
    }

    // Validate with Zod
    const validatedData = data
      .map((row) => {
        const result = predictionSchema.safeParse(row);
        if (!result.success) {
          console.error('Validation error for row:', row.id, result.error.format());
        }
        return result;
      })
      .filter((result): result is { success: true; data: Prediction } => result.success)
      .map((result) => result.data);

    if (validatedData.length === 0) {
      return {
        data: mockPredictions,
        isDemo: true,
        error: null,
      };
    }

    return {
      data: validatedData,
      isDemo: false,
      error: null,
    };
  } catch (err) {
    console.error('Fetch error:', err);
    return {
      data: mockPredictions,
      isDemo: true,
      error: null,
    };
  }
}

export function getLatestPrediction(predictions: Prediction[]): Prediction | null {
  return predictions.length > 0 ? predictions[0] : null;
}
