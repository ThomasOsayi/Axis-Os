"use client";

import { Button } from "@/components/ui/button";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionReveal } from "@/components/SectionReveal";
import { ArrowRight, Play } from "lucide-react";

const stats = [
  { value: 46.4, suffix: "x", label: "ROAS", decimals: 1 },
  { value: 87, prefix: "$", suffix: "k+", label: "Profit", decimals: 0 },
  { value: 35, suffix: "k+", label: "Reached", decimals: 0 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <FloatingOrbs />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <SectionReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm text-slate-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Growth Systems for Ambitious Brands
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Turn Attention Into{" "}
            <span className="gradient-text">Predictable Revenue</span>
          </h1>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            We connect outreach, professionalism, and automation into one
            unified system.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 text-base px-8 py-6 transition-transform hover:scale-105"
            >
              <a href="#contact">
                Start Your Growth Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white text-base px-8 py-6 transition-transform hover:scale-105"
            >
              <a href="#process">
                <Play className="mr-2 h-4 w-4" />
                See How It Works
              </a>
            </Button>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">
                  <AnimatedCounter
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
