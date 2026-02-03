"use client";

import { useState } from "react";
import { Target, Palette, Megaphone, Bot, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { SectionReveal } from "@/components/SectionReveal";

const steps = [
  {
    icon: Target,
    title: "Strategy & Alignment",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
    progressColor: "bg-cyan-400",
    description:
      "We start by understanding your business, audience, and goals to build a strategy that actually fits.",
    details: [
      "Deep-dive into your business model and revenue goals",
      "Audience research and ideal customer profiling",
      "Competitive landscape analysis",
      "KPI definition and tracking framework setup",
    ],
    outcome:
      "A clear, actionable growth roadmap aligned to your specific objectives.",
  },
  {
    icon: Palette,
    title: "Brand & Positioning",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    progressColor: "bg-blue-400",
    description:
      "We refine your brand presence so every touchpoint builds trust and converts.",
    details: [
      "Visual identity audit and enhancement",
      "Messaging framework and value proposition",
      "Landing page design and optimization",
      "Social media profile overhaul",
    ],
    outcome:
      "A polished, professional brand presence that positions you as the authority.",
  },
  {
    icon: Megaphone,
    title: "Outreach & Traffic",
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
    borderColor: "border-indigo-400/30",
    progressColor: "bg-indigo-400",
    description:
      "We drive qualified traffic to your offers through paid ads and organic growth strategies.",
    details: [
      "Meta Ads campaign setup and creative production",
      "Audience targeting and lookalike creation",
      "Content strategy for organic reach",
      "Retargeting funnels for warm audiences",
    ],
    outcome:
      "A consistent flow of qualified traffic hitting your offers daily.",
  },
  {
    icon: Bot,
    title: "Automation & AI",
    color: "text-violet-400",
    bgColor: "bg-violet-400/10",
    borderColor: "border-violet-400/30",
    progressColor: "bg-violet-400",
    description:
      "We automate follow-ups, lead qualification, and nurturing so nothing falls through the cracks.",
    details: [
      "Email and SMS automation sequences",
      "AI chatbot for instant lead qualification",
      "CRM integration and pipeline setup",
      "Automated booking and follow-up systems",
    ],
    outcome:
      "Leads are nurtured and qualified 24/7 without manual effort.",
  },
  {
    icon: TrendingUp,
    title: "Optimization & Scaling",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
    progressColor: "bg-emerald-400",
    description:
      "We analyze, iterate, and scale what works to maximize your ROI over time.",
    details: [
      "Weekly performance analysis and reporting",
      "A/B testing for ads and landing pages",
      "Budget reallocation to top performers",
      "Multi-platform expansion strategy",
    ],
    outcome:
      "Continuously improving results with compounding returns month over month.",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <section id="process" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-cyan-400 tracking-wider uppercase mb-3">
              Our Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              How We Build Your{" "}
              <span className="gradient-text">Growth System</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A proven 5-step framework that transforms scattered marketing
              efforts into a predictable revenue machine.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          {/* Step navigation */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-8">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                    i === activeStep
                      ? `${step.bgColor} ${step.borderColor} ${step.color}`
                      : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                  }`}
                >
                  <StepIcon size={20} />
                  <div>
                    <div className="text-xs opacity-60">Step {i + 1}</div>
                    <div className="text-sm font-medium">{step.title}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <Progress
              value={((activeStep + 1) / steps.length) * 100}
              className="h-1.5 bg-slate-800"
            />
          </div>
        </SectionReveal>

        {/* Active step details */}
        <SectionReveal delay={0.25}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border ${current.borderColor} ${current.bgColor} p-8 sm:p-10`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`p-3 rounded-xl ${current.bgColor} ${current.color}`}
                >
                  <Icon size={28} />
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${current.color}`}>
                    {current.title}
                  </h3>
                  <p className="text-slate-400 mt-1">{current.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {current.details.map((detail, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-slate-950/50 rounded-lg p-3"
                  >
                    <span className={`text-xs mt-1 ${current.color}`}>
                      0{i + 1}
                    </span>
                    <span className="text-sm text-slate-300">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Outcome
                </span>
                <p className={`mt-1 font-medium ${current.color}`}>
                  {current.outcome}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </SectionReveal>
      </div>
    </section>
  );
}
