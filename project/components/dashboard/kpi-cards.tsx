'use client';

import { motion } from 'framer-motion';
import { HorizonValues, ProcurementAction } from '@/lib/agent-b/types';
import { formatDollars } from '@/lib/agent-b/analytics';
import { TrendingUp, Target, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardsProps {
  values: HorizonValues;
  action: ProcurementAction;
}

export function KpiCards({ values, action }: KpiCardsProps) {
  const cards = [
    {
      key: 'risk',
      label: 'Maximum Risk Exposure',
      sublabel: '90th Percentile',
      value: values.p90,
      icon: TrendingUp,
      highlight: action === 'STAGGER',
      accent: 'text-red-400',
      accentBg: 'bg-red-500/10',
      accentBorder: 'border-red-500/30',
    },
    {
      key: 'baseline',
      label: 'Expected Baseline',
      sublabel: '50th Percentile',
      value: values.p50,
      icon: Target,
      highlight: action === 'DELAY',
      accent: 'text-primary',
      accentBg: 'bg-primary/10',
      accentBorder: 'border-primary/30',
    },
    {
      key: 'optimal',
      label: 'Optimal Buying Zone',
      sublabel: '10th Percentile',
      value: values.p10,
      icon: Shield,
      highlight: action === 'ACCELERATE',
      accent: 'text-emerald-400',
      accentBg: 'bg-emerald-500/10',
      accentBorder: 'border-emerald-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={cn(
            'relative p-5 rounded-xl border transition-all duration-300',
            card.highlight
              ? `${card.accentBg} ${card.accentBorder} shadow-lg shadow-${card.accent}/5`
              : 'bg-card border-border'
          )}
        >
          {card.highlight && (
            <div className={cn('absolute top-3 right-3 text-xs font-medium', card.accent)}>
              ACTIVE
            </div>
          )}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">{card.sublabel}</p>
            </div>
            <div className={cn('p-2 rounded-lg', card.highlight ? card.accentBg : 'bg-muted')}>
              <card.icon className={cn('h-4 w-4', card.highlight ? card.accent : 'text-muted-foreground')} />
            </div>
          </div>
          <div className="mt-4">
            <span className={cn('text-3xl font-bold tabular-nums', card.highlight && card.accent)}>
              {formatDollars(card.value)}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
