"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionReveal } from "@/components/SectionReveal";
import { DollarSign } from "lucide-react";

const caseStudies = [
  {
    name: "Caddie Splash",
    category: "Golf E-commerce",
    metrics: [
      { label: "Profit", value: "$62k" },
      { label: "IG Growth", value: "10%" },
      { label: "ROAS", value: "46.4x" },
    ],
    description:
      "Scaled a golf e-commerce brand from scratch to $62k in profit through strategic Meta Ads and organic Instagram growth.",
    gradient: "from-cyan-500/20 to-blue-600/20",
    border: "border-cyan-500/20",
  },
  {
    name: "CMC Design Co",
    category: "Golf Accessories",
    metrics: [
      { label: "Profit", value: "$25k" },
      { label: "IG Growth", value: "5-10%" },
      { label: "Reached", value: "20k+" },
    ],
    description:
      "Built a premium brand presence and drove consistent revenue through targeted advertising and community engagement.",
    gradient: "from-blue-500/20 to-indigo-600/20",
    border: "border-blue-500/20",
  },
  {
    name: "butcute",
    category: "Week 2 Results",
    metrics: [
      { label: "ROAS", value: "1.29x" },
      { label: "CPC", value: "$0.84" },
      { label: "Reached", value: "35k" },
    ],
    description:
      "Achieved positive ROAS within just two weeks of campaign launch with highly efficient cost-per-click performance.",
    gradient: "from-indigo-500/20 to-violet-600/20",
    border: "border-indigo-500/20",
  },
];

export function Results() {
  return (
    <section id="results" className="relative py-24 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-cyan-400 tracking-wider uppercase mb-3">
              Proven Results
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Real Numbers, <span className="gradient-text">Real Growth</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We let the results speak for themselves. Here&apos;s what our growth
              systems have delivered.
            </p>
          </div>
        </SectionReveal>

        {/* Big counter */}
        <SectionReveal delay={0.1}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <DollarSign className="text-cyan-400" size={32} />
              <div className="text-left">
                <div className="text-4xl sm:text-5xl font-bold gradient-text">
                  <AnimatedCounter
                    end={87}
                    prefix="$"
                    suffix="k+"
                    decimals={0}
                  />
                </div>
                <div className="text-sm text-slate-500">
                  Combined client revenue generated
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Case study cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <SectionReveal key={study.name} delay={0.15 + i * 0.1}>
              <Card
                className={`bg-gradient-to-br ${study.gradient} border ${study.border} backdrop-blur-sm hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 h-full`}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {study.name}
                    </h3>
                    <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
                      {study.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {study.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="text-center bg-slate-950/50 rounded-lg p-2"
                      >
                        <div className="text-lg font-bold text-white">
                          {metric.value}
                        </div>
                        <div className="text-xs text-slate-500">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-slate-400">{study.description}</p>
                </CardContent>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
