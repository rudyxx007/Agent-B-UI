'use client';

import { Horizon } from '@/lib/agent-b/types';
import { getHorizonLabel } from '@/lib/agent-b/analytics';
import { cn } from '@/lib/utils';

interface HorizonSelectorProps {
  value: Horizon;
  onChange: (horizon: Horizon) => void;
}

const horizons: Horizon[] = ['1d', '1m', '3m'];

export function HorizonSelector({ value, onChange }: HorizonSelectorProps) {
  return (
    <div className="inline-flex items-center p-1 rounded-lg bg-muted/50 border border-border">
      {horizons.map((h) => (
        <button
          key={h}
          onClick={() => onChange(h)}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
            value === h
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
          aria-pressed={value === h}
        >
          {getHorizonLabel(h)}
        </button>
      ))}
    </div>
  );
}
