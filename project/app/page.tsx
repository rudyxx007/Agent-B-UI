'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TrendingUp, Brain, BarChart3, Zap, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProbabilityConePreview } from '@/components/landing/probability-cone-preview';

const features = [
  {
    icon: Brain,
    title: 'iTransformer Engine',
    description: 'State-of-the-art quantile forecasting model trained on 90-day Brent price histories.',
  },
  {
    icon: TrendingUp,
    title: 'Quantile Predictions',
    description: '10th, 50th, and 90th percentile forecasts across 1-day, 1-month, and 3-month horizons.',
  },
  {
    icon: BarChart3,
    title: 'Sentiment Analysis',
    description: 'Real-time FinGPT sentiment scoring from global energy news and market signals.',
  },
  {
    icon: Shield,
    title: 'Risk Exposure Control',
    description: 'Maximum risk exposure quantification for strategic procurement decisions.',
  },
  {
    icon: Zap,
    title: 'Daily Pipeline',
    description: 'Automated daily predictions via Modal with CrewAI-powered news analysis.',
  },
  {
    icon: Clock,
    title: 'Zero-Cost Architecture',
    description: 'Serverless inference pipeline with no ongoing infrastructure costs.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-background opacity-40" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 h-full">
              <Image src="/logo.png" alt="Agent-B Logo" width={170} height={42} className="object-contain my-auto" />
            </div>
            <Button asChild variant="outline" className="border-border/50 hover:bg-muted">
              <Link href="/dashboard">
                Open Console
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-muted/50 text-sm text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Live Pipeline Active
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Brent Crude{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    Intelligence
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                  AI-powered procurement forecasting for Reliance Industries. Transform uncertainty into actionable decisions with quantile predictions and sentiment analysis.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/dashboard">
                    Open Procurement Console
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-border/50 hover:bg-muted">
                  <Link href="/dashboard">
                    View Latest Predictions
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">Forecast Horizons</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">12</div>
                  <div className="text-sm text-muted-foreground">Model Features</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">90</div>
                  <div className="text-sm text-muted-foreground">Day Lookback</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Probability Cone Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
              <div className="relative border border-border/50 rounded-2xl bg-card/80 backdrop-blur-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
                  <span className="text-sm font-medium">Brent Probability Cone</span>
                  <span className="text-xs text-muted-foreground">Live Preview</span>
                </div>
                <ProbabilityConePreview />
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24 lg:mt-32"
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold">Built for Strategic Procurement</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                A complete forecasting pipeline optimized for Reliance&apos;s crude oil procurement strategy.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-6 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <feature.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground h-full">
              <Image src="/logo.png" alt="Agent-B Logo" width={130} height={32} className="object-contain grayscale opacity-70 my-auto" />
              <span className="my-auto leading-none">v7.0</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Zero-cost procurement intelligence for Reliance Industries
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
