'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { StrategicBanner } from '@/components/dashboard/strategic-banner';
import { HorizonSelector } from '@/components/dashboard/horizon-selector';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { ProbabilityChart } from '@/components/dashboard/probability-chart';
import { DiagnosticsGrid } from '@/components/dashboard/diagnostics-grid';
import { LogisticsTerminal } from '@/components/dashboard/logistics-terminal';
import { usePredictionData } from '@/hooks/use-prediction-data';
import { Horizon } from '@/lib/agent-b/types';
import { getHorizonValues, calculateProcurementAction } from '@/lib/agent-b/analytics';

export default function DashboardPage() {
  const { predictions, latest, isDemo, isLoading, error } = usePredictionData();
  const [horizon, setHorizon] = useState<Horizon>('1d');

  const horizonValues = useMemo(() => {
    return getHorizonValues(latest, horizon);
  }, [latest, horizon]);

  const action = useMemo(() => {
    return calculateProcurementAction(
      horizonValues,
      latest?.fingpt_sentiment ?? null,
      latest?.actual_close ?? null
    );
  }, [horizonValues, latest]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardHeader />
          <div className="mt-8 space-y-6">
            <Skeleton className="h-20 w-full rounded-xl" />
            <div className="flex justify-center">
              <Skeleton className="h-10 w-80 rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-80 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 grid-background opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardHeader />

          {/* Demo Mode Banner */}
          {isDemo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">
                  Demo Mode: Showing example data. Connect Supabase to enable live predictions.
                </span>
              </div>
            </motion.div>
          )}

          <div className="mt-8 space-y-6">
            {/* Strategic Banner */}
            <StrategicBanner action={action} latest={latest} />

            {/* Horizon Selector */}
            <div className="flex justify-center">
              <HorizonSelector value={horizon} onChange={setHorizon} />
            </div>

            {/* KPI Cards */}
            <KpiCards values={horizonValues} action={action} />

            {/* Primary Chart */}
            <ProbabilityChart predictions={predictions} horizon={horizon} />

            {/* Diagnostics */}
            <DiagnosticsGrid prediction={latest} />

            {/* Logistics Terminal */}
            <LogisticsTerminal prediction={latest} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="font-bold text-sm text-background">B</span>
          </div>
          <span className="font-semibold text-lg">Procurement Console</span>
        </div>
      </div>
      <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        Live
      </Badge>
    </div>
  );
}
