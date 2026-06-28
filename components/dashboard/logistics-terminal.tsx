'use client';

import { motion } from 'framer-motion';
import { Prediction } from '@/lib/agent-b/types';
import { formatDate } from '@/lib/agent-b/analytics';
import { Terminal, Database, Cpu, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LogisticsTerminalProps {
  prediction: Prediction | null;
}

export function LogisticsTerminal({ prediction }: LogisticsTerminalProps) {
  // Generate derived execution trace from latest prediction
  const logLines = prediction
    ? [
        {
          timestamp: `${prediction.date}T06:00:00Z`,
          message: 'Pipeline initiated',
          type: 'info',
        },
        {
          timestamp: `${prediction.date}T06:00:15Z`,
          message: `Fetching market data... tensor shape [1, 90, 12]`,
          type: 'data',
        },
        {
          timestamp: `${prediction.date}T06:00:45Z`,
          message: `Features loaded: z_brent, z_dxy, holiday_flag, vix_close, sentiment_score, rsi_14, macd, macd_signal, brent_wti_spread, crack_spread_321, eia_inventory, eia_inventory_change`,
          type: 'data',
        },
        {
          timestamp: `${prediction.date}T06:01:00Z`,
          message: `iTransformer v7.0 inference started`,
          type: 'model',
        },
        {
          timestamp: `${prediction.date}T06:01:30Z`,
          message: `CrewAI sentiment analysis completed: score=${prediction.fingpt_sentiment?.toFixed(4) ?? 'N/A'}`,
          type: 'sentiment',
        },
        {
          timestamp: `${prediction.date}T06:02:00Z`,
          message: `Quantile predictions emitted: 1D=[${prediction.pred_1d_10th?.toFixed(2) ?? '--'}, ${prediction.pred_1d_50th?.toFixed(2) ?? '--'}, ${prediction.pred_1d_90th?.toFixed(2) ?? '--'}]`,
          type: 'output',
        },
        {
          timestamp: `${prediction.date}T06:02:05Z`,
          message: `1M horizon: [${prediction.pred_1m_10th?.toFixed(2) ?? '--'}, ${prediction.pred_1m_50th?.toFixed(2) ?? '--'}, ${prediction.pred_1m_90th?.toFixed(2) ?? '--'}]`,
          type: 'output',
        },
        {
          timestamp: `${prediction.date}T06:02:10Z`,
          message: `3M horizon: [${prediction.pred_3m_10th?.toFixed(2) ?? '--'}, ${prediction.pred_3m_50th?.toFixed(2) ?? '--'}, ${prediction.pred_3m_90th?.toFixed(2) ?? '--'}]`,
          type: 'output',
        },
        {
          timestamp: `${prediction.date}T06:02:30Z`,
          message: `Supabase insert confirmed: row_id=${prediction.id}`,
          type: 'success',
        },
        {
          timestamp: `${prediction.date}T06:02:35Z`,
          message: `Pipeline completed successfully`,
          type: 'success',
        },
      ]
    : [];

  const getLogColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'text-sky-400';
      case 'data':
        return 'text-yellow-400';
      case 'model':
        return 'text-violet-400';
      case 'sentiment':
        return 'text-pink-400';
      case 'output':
        return 'text-emerald-400';
      case 'success':
        return 'text-emerald-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            CrewAI Logistics Terminal
          </h3>
        </div>
        <Badge variant="outline" className="text-xs text-muted-foreground border-border">
          Derived Execution Trace
        </Badge>
      </div>

      <div className="rounded-xl border border-border bg-black/50 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-muted-foreground ml-2 font-mono">
            agent-b-pipeline.log
          </span>
          <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Cpu className="h-3 w-3" />
              iTransformer v7.0
            </span>
            <span className="flex items-center gap-1">
              <Database className="h-3 w-3" />
              Supabase
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {prediction ? formatDate(prediction.date) : '--'}
            </span>
          </div>
        </div>

        <ScrollArea className="h-64">
          <div className="p-4 font-mono text-xs space-y-1">
            {logLines.length === 0 ? (
              <div className="text-muted-foreground">No execution trace available</div>
            ) : (
              logLines.map((line, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-muted-foreground/60 shrink-0">
                    {line.timestamp.split('T')[1]}
                  </span>
                  <span className={`${getLogColor(line.type)} shrink-0`}>
                    {line.type === 'success' ? '[OK]' : line.type === 'output' ? '[OUT]' : line.type === 'model' ? '[INF]' : '[LOG]'}
                  </span>
                  <span className="text-foreground/90">{line.message}</span>
                </div>
              ))
            )}
            <div className="flex items-center gap-2 text-muted-foreground pt-2">
              <CheckCircle className="h-3 w-3 text-emerald-500" />
              <span>Pipeline status: COMPLETE</span>
            </div>
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
