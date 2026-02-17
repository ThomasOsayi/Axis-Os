"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionReveal } from "@/components/SectionReveal";
import { DollarSign, TrendingUp, Users, Target, ArrowUpRight } from "lucide-react";
import { easings } from "@/lib/animations";
import { cn } from "@/lib/utils";

const caseStudies = [
  {
    name: "Caddie Splash",
    category: "Golf E-commerce",
    metrics: [
      { label: "Revenue", value: "$62k", icon: DollarSign },
      { label: "IG Growth", value: "10%", icon: TrendingUp },
      { label: "ROAS", value: "46.4x", icon: Target },
    ],
    description:
      "Scaled a golf e-commerce brand from scratch to $62k in revenue through strategic Meta Ads and organic Instagram growth.",
    gradient: "from-cyan-500/20 to-blue-600/20",
    border: "border-cyan-500/20",
    hoverBorder: "group-hover:border-cyan-500/40",
    glowColor: "rgba(34, 211, 238, 0.15)",
    accentColor: "text-cyan-400",
  },
  {
    name: "CMC Design Co",
    category: "Golf Accessories",
    metrics: [
      { label: "Revenue", value: "$25k", icon: DollarSign },
      { label: "IG Growth", value: "5-10%", icon: TrendingUp },
      { label: "Reached", value: "20k+", icon: Users },
    ],
    description:
      "Built a premium brand presence and drove consistent revenue through targeted advertising and community engagement.",
    gradient: "from-blue-500/20 to-indigo-600/20",
    border: "border-blue-500/20",
    hoverBorder: "group-hover:border-blue-500/40",
    glowColor: "rgba(96, 165, 250, 0.15)",
    accentColor: "text-blue-400",
  },
  {
    name: "butcute",
    category: "Week 2 Results",
    metrics: [
      { label: "ROAS", value: "1.29x", icon: Target },
      { label: "CPC", value: "$0.84", icon: DollarSign },
      { label: "Reached", value: "35k", icon: Users },
    ],
    description:
      "Achieved positive ROAS within just two weeks of campaign launch with highly efficient cost-per-click performance.",
    gradient: "from-indigo-500/20 to-violet-600/20",
    border: "border-indigo-500/20",
    hoverBorder: "group-hover:border-indigo-500/40",
    glowColor: "rgba(129, 140, 248, 0.15)",
    accentColor: "text-indigo-400",
  },
];

// Simplified TiltCard — uses CSS transforms + transitions instead of
// Framer Motion's useMotionValue/useSpring/useTransform chain which
// ran reactive updates on every mousemove pixel
function TiltCard({
  children,
  className,
  glowColor,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / rect.height) * -10;
    const rotateY = ((e.clientX - centerX) / rect.width) * 10;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative h-full group", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out",
        willChange: "transform",
      }}
    >
      {/* Glow effect — CSS transition instead of Framer Motion animate */}
      <div
        className="absolute -inset-2 rounded-3xl pointer-events-none transition-opacity duration-300"
        style={{
          background: glowColor,
          filter: "blur(16px)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Card lift — CSS transition */}
      <div
        className="relative h-full transition-transform duration-300 ease-out"
        style={{ transform: isHovered ? "translateY(-8px)" : "translateY(0)" }}
      >
        {children}
      </div>
    </div>
  );
}

// Metric item — simplified, no individual motion wrappers
function MetricItem({
  metric,
  accentColor,
}: {
  metric: { label: string; value: string; icon: React.ElementType };
  accentColor: string;
}) {
  const Icon = metric.icon;

  return (
    <div className="text-center bg-slate-950/50 rounded-lg p-3 relative overflow-hidden group/metric hover:scale-105 transition-transform duration-200">
      {/* Hover shine — CSS only */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/metric:translate-x-full transition-transform duration-700" />

      <div className={`mx-auto mb-1 ${accentColor} opacity-50`}>
        <Icon size={14} />
      </div>

      <div className="text-lg font-bold text-white">
        {metric.value}
      </div>

      <div className="text-xs text-slate-500">{metric.label}</div>
    </div>
  );
}

// Case study card — reduced from ~10 motion wrappers to 1 SectionReveal
function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SectionReveal delay={0.15 + index * 0.1} direction="up" effect="blur-scale">
      <TiltCard glowColor={study.glowColor} className="h-full">
        <div
          className={`relative bg-gradient-to-br ${study.gradient} border ${study.border} ${study.hoverBorder} rounded-2xl h-full overflow-hidden transition-colors duration-300`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background pattern — static, no animation */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {study.name}
                  <span
                    className={`${study.accentColor} transition-transform duration-200`}
                    style={{
                      transform: isHovered ? "translate(4px, -4px)" : "translate(0, 0)",
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </span>
                </h3>
                <span className="inline-block text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full mt-1">
                  {study.category}
                </span>
              </div>
            </div>

            {/* Metrics — no individual motion wrappers */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {study.metrics.map((metric) => (
                <MetricItem
                  key={metric.label}
                  metric={metric}
                  accentColor={study.accentColor}
                />
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400">
              {study.description}
            </p>
          </div>
        </div>
      </TiltCard>
    </SectionReveal>
  );
}

// Big stat counter — simplified hover effects
function BigStatCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative inline-flex items-center gap-4 px-8 py-6 rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden cursor-default"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: easings.easeOutExpo }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow — CSS transition */}
      <div
        className="absolute -inset-1 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: "rgba(34, 211, 238, 0.1)",
          filter: "blur(16px)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Shimmer — CSS only */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent transition-transform duration-700"
        style={{
          transform: isHovered ? "translateX(200%)" : "translateX(-100%)",
        }}
      />

      <div
        className="relative p-3 rounded-xl bg-cyan-500/10 transition-transform duration-300"
        style={{
          transform: isHovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        <DollarSign className="text-cyan-400" size={32} />
      </div>

      <div className="relative text-left">
        <motion.div
          className="text-4xl sm:text-5xl font-bold gradient-text"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedCounter
            end={87}
            prefix="$"
            suffix="k+"
            decimals={0}
            duration={2500}
          />
        </motion.div>
        <motion.div
          className="text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Combined client revenue generated
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Results() {
  return (
    <section id="results" className="relative py-24 overflow-hidden">
      {/* Background — pure CSS animations replace Framer Motion infinite loops */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full will-change-[transform,opacity] animate-results-glow-1"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full will-change-[transform,opacity] animate-results-glow-2"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-cyan-400 tracking-wider uppercase mb-3">
              Proven Results
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Real Numbers,{" "}
              <span className="gradient-text">Real Growth</span>
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
            <BigStatCounter />
          </div>
        </SectionReveal>

        {/* Case study cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.name} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}