'use client';

import { useState, useEffect } from 'react';
import { Prediction } from '@/lib/agent-b/types';
import { fetchPredictions, getLatestPrediction } from '@/lib/agent-b/data';

export function usePredictionData() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [latest, setLatest] = useState<Prediction | null>(null);
  const [isDemo, setIsDemo] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const result = await fetchPredictions();
        setPredictions(result.data);
        setIsDemo(result.isDemo);
        setError(result.error);
        setLatest(getLatestPrediction(result.data));
      } catch (err) {
        console.error('Hook error:', err);
        setError('Failed to load predictions');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return { predictions, latest, isDemo, isLoading, error };
}
