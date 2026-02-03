"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
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
      { label: "Profit", value: "$62k", icon: DollarSign },
      { label: "IG Growth", value: "10%", icon: TrendingUp },
      { label: "ROAS", value: "46.4x", icon: Target },
    ],
    description:
      "Scaled a golf e-commerce brand from scratch to $62k in profit through strategic Meta Ads and organic Instagram growth.",
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
      { label: "Profit", value: "$25k", icon: DollarSign },
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

// Tilt card component
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
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative h-full group", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-3xl blur-xl pointer-events-none"
        style={{ background: glowColor }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Card lift */}
      <motion.div
        className="relative h-full"
        animate={{
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3, ease: easings.easeOutExpo }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Metric item with animation
function MetricItem({
  metric,
  index,
  accentColor,
  isInView,
}: {
  metric: { label: string; value: string; icon: React.ElementType };
  index: number;
  accentColor: string;
  isInView: boolean;
}) {
  const Icon = metric.icon;

  return (
    <motion.div
      className="text-center bg-slate-950/50 rounded-lg p-3 relative overflow-hidden group/metric"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: easings.easeOutBack,
      }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Hover shine */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/metric:translate-x-full transition-transform duration-700"
      />

      <motion.div
        className={`mx-auto mb-1 ${accentColor} opacity-50`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          duration: 0.3,
          delay: index * 0.1 + 0.2,
          ease: easings.easeOutBack,
        }}
      >
        <Icon size={14} />
      </motion.div>

      <motion.div
        className="text-lg font-bold text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.3,
          delay: index * 0.1 + 0.15,
        }}
      >
        {metric.value}
      </motion.div>

      <div className="text-xs text-slate-500">{metric.label}</div>
    </motion.div>
  );
}

// Case study card
function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SectionReveal delay={0.15 + index * 0.1} direction="up" effect="blur-scale">
      <TiltCard glowColor={study.glowColor} className="h-full">
        <div
          ref={ref}
          className={`relative bg-gradient-to-br ${study.gradient} border ${study.border} ${study.hoverBorder} backdrop-blur-sm rounded-2xl h-full overflow-hidden transition-colors duration-300`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${study.accentColor.replace("text-", "").replace("-400", "")} 1px, transparent 0)`,
                backgroundSize: "32px 32px",
                opacity: 0.1,
              }}
            />
          </div>

          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <motion.h3
                  className="text-xl font-bold text-white flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {study.name}
                  <motion.span
                    className={study.accentColor}
                    animate={{
                      x: isHovered ? 4 : 0,
                      y: isHovered ? -4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight size={18} />
                  </motion.span>
                </motion.h3>
                <motion.span
                  className="inline-block text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full mt-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {study.category}
                </motion.span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {study.metrics.map((metric, i) => (
                <MetricItem
                  key={metric.label}
                  metric={metric}
                  index={i}
                  accentColor={study.accentColor}
                  isInView={isInView}
                />
              ))}
            </div>

            {/* Description */}
            <motion.p
              className="text-sm text-slate-400"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              {study.description}
            </motion.p>
          </div>
        </div>
      </TiltCard>
    </SectionReveal>
  );
}

// Big stat counter component
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
      {/* Glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
        style={{ background: "rgba(34, 211, 238, 0.1)" }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"
        animate={{
          x: isHovered ? ["0%", "200%"] : "0%",
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: isHovered ? Infinity : 0,
        }}
      />

      <motion.div
        className="relative p-3 rounded-xl bg-cyan-500/10"
        animate={{
          rotate: isHovered ? [0, -10, 10, 0] : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
      >
        <DollarSign className="text-cyan-400" size={32} />
      </motion.div>

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
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <motion.p
              className="text-sm font-medium text-cyan-400 tracking-wider uppercase mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Proven Results
            </motion.p>
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