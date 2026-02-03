"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Target, Palette, Megaphone, Bot, TrendingUp, Pause, Play } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { easings } from "@/lib/animations";

// Auto-play configuration
const AUTO_PLAY_INTERVAL = 5000; // 5 seconds per step
const RESUME_DELAY = 10000; // Resume auto-play after 10 seconds of no interaction

const steps = [
  {
    icon: Target,
    title: "Strategy & Alignment",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/30",
    glowColor: "rgba(34, 211, 238, 0.15)",
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
    glowColor: "rgba(96, 165, 250, 0.15)",
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
    glowColor: "rgba(129, 140, 248, 0.15)",
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
    glowColor: "rgba(167, 139, 250, 0.15)",
    description:
      "We automate follow-ups, lead qualification, and nurturing so nothing falls through the cracks.",
    details: [
      "Email and SMS automation sequences",
      "AI chatbot for instant lead qualification",
      "CRM integration and pipeline setup",
      "Automated booking and follow-up systems",
    ],
    outcome: "Leads are nurtured and qualified 24/7 without manual effort.",
  },
  {
    icon: TrendingUp,
    title: "Optimization & Scaling",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/30",
    glowColor: "rgba(52, 211, 153, 0.15)",
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

// Step button component with hover animations
function StepButton({
  step,
  index,
  isActive,
  onClick,
}: {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const StepIcon = step.icon;

  return (
    <motion.button
      onClick={onClick}
      className={`relative flex-1 flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors text-left overflow-hidden ${
        isActive
          ? `${step.bgColor} ${step.borderColor} ${step.color}`
          : "border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{ background: step.glowColor }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: isActive ? 1.1 : 1,
          rotate: isActive ? [0, -10, 10, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <StepIcon size={20} />
      </motion.div>

      <div className="relative z-10">
        <div className="text-xs opacity-60">Step {index + 1}</div>
        <div className="text-sm font-medium">{step.title}</div>
      </div>

      {/* Active indicator line */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${step.color.replace("text-", "bg-")}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3, ease: easings.easeOutExpo }}
      />
    </motion.button>
  );
}

// Detail item with stagger animation
function DetailItem({
  detail,
  index,
  color,
}: {
  detail: string;
  index: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: easings.easeOutExpo,
      }}
      whileHover={{
        x: 4,
        backgroundColor: "rgba(15, 23, 42, 0.8)",
      }}
      className="flex items-start gap-3 bg-slate-950/50 rounded-lg p-3 cursor-default transition-colors"
    >
      <motion.span
        className={`text-xs mt-1 font-mono ${color}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.3,
          delay: index * 0.1 + 0.2,
          ease: easings.easeOutBack,
        }}
      >
        0{index + 1}
      </motion.span>
      <span className="text-sm text-slate-300">{detail}</span>
    </motion.div>
  );
}

export function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  const current = steps[activeStep];
  const Icon = current.icon;

  // Clear all timers
  const clearTimers = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  // Start auto-play
  const startAutoPlay = useCallback(() => {
    clearTimers();
    setIsAutoPlaying(true);
    setIsPaused(false);

    autoPlayRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, AUTO_PLAY_INTERVAL);
  }, [clearTimers]);

  // Pause auto-play and schedule resume
  const pauseAutoPlay = useCallback(() => {
    clearTimers();
    setIsAutoPlaying(false);
    setIsPaused(true);

    // Schedule resume after delay
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoPlay();
    }, RESUME_DELAY);
  }, [clearTimers, startAutoPlay]);

  // Handle user interaction
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    pauseAutoPlay();
  };

  // Toggle auto-play manually
  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      clearTimers();
      setIsAutoPlaying(false);
      setIsPaused(true);
    } else {
      startAutoPlay();
    }
  };

  // Start auto-play when section comes into view
  useEffect(() => {
    if (isInView && !isPaused) {
      startAutoPlay();
    } else if (!isInView) {
      clearTimers();
      setIsAutoPlaying(false);
    }

    return () => clearTimers();
  }, [isInView, isPaused, startAutoPlay, clearTimers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return (
    <section ref={sectionRef} id="process" className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          animate={{
            background: current.glowColor,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <motion.p
              className="text-sm font-medium text-cyan-400 tracking-wider uppercase mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Process
            </motion.p>
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
            {steps.map((step, i) => (
              <StepButton
                key={i}
                step={step}
                index={i}
                isActive={i === activeStep}
                onClick={() => handleStepClick(i)}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-8 relative">
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${current.color.includes("cyan") ? "#22d3ee" : current.color.includes("blue") ? "#60a5fa" : current.color.includes("indigo") ? "#818cf8" : current.color.includes("violet") ? "#a78bfa" : "#34d399"} 0%, transparent 100%)`,
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: easings.easeOutExpo }}
              />

              {/* Auto-play progress overlay */}
              {isAutoPlaying && (
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white/20 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  transition={{
                    duration: AUTO_PLAY_INTERVAL / 1000,
                    ease: "linear",
                  }}
                  key={activeStep}
                />
              )}
            </div>

            {/* Step dots */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-[2%]">
              {steps.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleStepClick(i)}
                  className={`w-3 h-3 rounded-full border-2 transition-colors ${
                    i <= activeStep
                      ? "bg-cyan-400 border-cyan-400"
                      : "bg-slate-900 border-slate-700"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                />
              ))}
            </div>

            {/* Auto-play toggle */}
            <motion.button
              onClick={toggleAutoPlay}
              className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isAutoPlaying ? "Pause auto-play" : "Resume auto-play"}
            >
              {isAutoPlaying ? <Pause size={14} /> : <Play size={14} />}
            </motion.button>
          </div>
        </SectionReveal>

        {/* Active step details */}
        <SectionReveal delay={0.25}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: easings.easeOutExpo }}
              className={`relative rounded-2xl border ${current.borderColor} ${current.bgColor} p-8 sm:p-10 overflow-hidden`}
            >
              {/* Card glow */}
              <motion.div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
                style={{ background: current.glowColor }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className={`p-3 rounded-xl ${current.bgColor} ${current.color}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: easings.easeOutBack,
                    }}
                  >
                    <Icon size={28} />
                  </motion.div>
                  <div>
                    <motion.h3
                      className={`text-2xl font-bold ${current.color}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {current.title}
                    </motion.h3>
                    <motion.p
                      className="text-slate-400 mt-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      {current.description}
                    </motion.p>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {current.details.map((detail, i) => (
                    <DetailItem
                      key={i}
                      detail={detail}
                      index={i}
                      color={current.color}
                    />
                  ))}
                </div>

                {/* Outcome */}
                <motion.div
                  className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Outcome
                  </span>
                  <motion.p
                    className={`mt-1 font-medium ${current.color}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    {current.outcome}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SectionReveal>

        {/* Navigation hint */}
        <motion.div
          className="flex justify-center items-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="px-4 py-2 text-sm text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          {/* Auto-play status indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <motion.div
              className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-cyan-400" : "bg-slate-600"}`}
              animate={isAutoPlaying ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {isAutoPlaying ? "Auto-playing" : isPaused ? "Paused" : ""}
          </div>

          <button
            onClick={() => handleStepClick(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            className="px-4 py-2 text-sm text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </motion.div>
      </div>
    </section>
  );
}