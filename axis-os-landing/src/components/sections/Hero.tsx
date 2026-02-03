"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { MagneticButton } from "@/components/MagneticButton";
import {
  SectionReveal,
  StaggerReveal,
  StaggerItem,
  TextReveal,
} from "@/components/SectionReveal";
import {
  staggerContainer,
  staggerItem,
  easings,
  fadeInUp,
} from "@/lib/animations";

const stats = [
  { value: 46.4, suffix: "x", label: "ROAS", decimals: 1 },
  { value: 87, prefix: "$", suffix: "k+", label: "Profit", decimals: 0 },
  { value: 35, suffix: "k+", label: "Reached", decimals: 0 },
];

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <FloatingOrbs />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <SectionReveal delay={0.1} effect="blur-scale">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm text-slate-400 mb-8 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all cursor-default"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              className="relative flex h-2 w-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </motion.span>
            <span>Growth Systems for Ambitious Brands</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </motion.div>
        </SectionReveal>

        {/* Headline */}
        <div className="mb-6 overflow-hidden">
          <SectionReveal delay={0.2} effect="blur" direction="up" distance={60}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Turn Attention Into
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.35} effect="blur" direction="up" distance={60}>
            <motion.span
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight gradient-text inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% auto",
                backgroundImage:
                  "linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6, #3b82f6, #22d3ee)",
              }}
            >
              Predictable Revenue
            </motion.span>
          </SectionReveal>
        </div>

        {/* Subheadline */}
        <SectionReveal delay={0.5} effect="blur" direction="up" distance={30}>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We connect outreach, professionalism, and automation into one
            unified system.{" "}
            <span className="text-slate-300">
              No missed messages. No lost opportunities.
            </span>
          </p>
        </SectionReveal>

        {/* CTA Buttons */}
        <SectionReveal delay={0.65} direction="up" distance={30}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <MagneticButton
              as="a"
              href="#contact"
              strength={0.15}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl overflow-hidden"
            >
              {/* Shine effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                Start Your Growth Plan
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#process"
              strength={0.15}
              glow={false}
              className="group px-8 py-4 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-800/50 hover:border-slate-600 hover:text-white transition-all"
            >
              <span className="flex items-center gap-2">
                <motion.span
                  className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 group-hover:bg-cyan-500/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="h-3 w-3 text-cyan-400" fill="currentColor" />
                </motion.span>
                See How It Works
              </span>
            </MagneticButton>
          </div>
        </SectionReveal>

        {/* Stats */}
        <SectionReveal delay={0.8} direction="up" distance={40}>
          <motion.div
            className="relative max-w-lg mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Stats background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-cyan-500/5 rounded-2xl blur-xl" />

            <div className="relative grid grid-cols-3 gap-8 p-6 rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  variants={staggerItem}
                  custom={i}
                >
                  <motion.div
                    className="text-3xl sm:text-4xl font-bold gradient-text"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    transition={{
                      delay: 1 + i * 0.15,
                      duration: 0.5,
                      ease: easings.easeOutBack,
                    }}
                  >
                    <AnimatedCounter
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      duration={2000}
                    />
                  </motion.div>
                  <motion.div
                    className="text-sm text-slate-500 mt-1"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.2 + i * 0.15 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SectionReveal>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-slate-500"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-2 bg-cyan-400 rounded-full"
                animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}