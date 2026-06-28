'use client';

import { motion } from 'framer-motion';
import { Prediction, ProcurementAction } from '@/lib/agent-b/types';
import { getActionColor, formatDollars, formatDate, getHorizonLabel } from '@/lib/agent-b/analytics';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface StrategicBannerProps {
  action: ProcurementAction;
  latest: Prediction | null;
}

const actionConfig = {
  ACCELERATE: {
    icon: TrendingUp,
    label: 'ACCELERATE PROCUREMENT',
    sublabel: 'Hedge recommended - Price pressure detected',
    urgency: 'high',
  },
  DELAY: {
    icon: TrendingDown,
    label: 'DELAY PROCUREMENT',
    sublabel: 'Favorable price trend expected',
    urgency: 'low',
  },
  STAGGER: {
    icon: Minus,
    label: 'STAGGER PROCUREMENT',
    sublabel: 'Maintain current procurement cadence',
    urgency: 'medium',
  },
};

export function StrategicBanner({ action, latest }: StrategicBannerProps) {
  const config = actionConfig[action];
  const Icon = config.icon;
  const colorClass = getActionColor(action);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-xl border p-6 ${colorClass}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${action === 'ACCELERATE' ? 'bg-amber-500/20' : action === 'DELAY' ? 'bg-emerald-500/20' : 'bg-sky-500/20'}`}>
            <Icon className={`h-6 w-6 ${action === 'ACCELERATE' ? 'text-amber-400' : action === 'DELAY' ? 'text-emerald-400' : 'text-sky-400'}`} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold tracking-wide">
                ACTION: {config.label}
              </h2>
              {action === 'ACCELERATE' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <AlertTriangle className="h-3 w-3" />
                  HEDGE
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{config.sublabel}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-muted-foreground">Last Update</div>
          <div className="font-medium">{latest ? formatDate(latest.date) : '--'}</div>
          <div className="text-sm text-muted-foreground mt-2">Current Close</div>
          <div className="font-semibold text-lg">{formatDollars(latest?.actual_close ?? null)}</div>
        </div>
      </div>
    </motion.div>
  );
}
