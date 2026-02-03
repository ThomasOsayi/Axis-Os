"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/SectionReveal";
import { Check, Star, Sparkles } from "lucide-react";
import { easings } from "@/lib/animations";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Core Growth",
    price: "$2,500 - $3,000",
    period: "/mo",
    description: "Essential advertising and optimization for brands ready to grow.",
    features: [
      "Meta Ads management & creative",
      "Landing page design & optimization",
      "Weekly performance reporting",
      "Bi-weekly strategy calls",
      "Audience research & targeting",
    ],
    popular: false,
    gradient: "from-slate-800/50 to-slate-900/50",
    border: "border-slate-800",
    hoverBorder: "hover:border-slate-700",
    glowColor: "rgba(148, 163, 184, 0.1)",
  },
  {
    name: "Growth + Automation",
    price: "$3,500 - $4,500",
    period: "/mo",
    description: "Full growth system with automation for maximum efficiency.",
    features: [
      "Everything in Core Growth",
      "Email & SMS automation sequences",
      "AI chatbot for lead qualification",
      "CRM setup & pipeline management",
      "Lead nurturing workflows",
      "A/B testing & optimization",
    ],
    popular: true,
    gradient: "from-cyan-500/10 to-blue-600/10",
    border: "border-cyan-500/30",
    hoverBorder: "hover:border-cyan-400/50",
    glowColor: "rgba(34, 211, 238, 0.15)",
  },
  {
    name: "Full System",
    price: "$5,000+",
    period: "/mo",
    description: "Complete growth infrastructure for brands scaling aggressively.",
    features: [
      "Everything in Growth + Automation",
      "Advanced sales funnels",
      "Full CRM build-out & management",
      "Multi-platform ad management",
      "Custom integrations & workflows",
      "Priority support & weekly calls",
    ],
    popular: false,
    gradient: "from-slate-800/50 to-slate-900/50",
    border: "border-slate-800",
    hoverBorder: "hover:border-slate-700",
    glowColor: "rgba(148, 163, 184, 0.1)",
  },
];

// Tilt card component with 3D hover effect
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
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

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
      className={cn("relative h-full", className)}
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

      {/* Card content */}
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

// Feature item with animation
function FeatureItem({
  feature,
  index,
  popular,
}: {
  feature: string;
  index: number;
  popular: boolean;
}) {
  return (
    <motion.li
      className="flex items-start gap-3 text-sm"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: easings.easeOutExpo,
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.2,
          delay: index * 0.05 + 0.1,
          ease: easings.easeOutBack,
        }}
      >
        <Check
          size={16}
          className={`mt-0.5 flex-shrink-0 ${
            popular ? "text-cyan-400" : "text-slate-500"
          }`}
        />
      </motion.div>
      <span className="text-slate-300">{feature}</span>
    </motion.li>
  );
}

// Pricing card component
function PricingCard({
  tier,
  index,
}: {
  tier: (typeof tiers)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <SectionReveal delay={0.1 + index * 0.15} direction="up" effect="blur-scale">
      <TiltCard
        glowColor={tier.glowColor}
        className="h-full"
      >
        <div
          className={`relative bg-gradient-to-b ${tier.gradient} border ${tier.border} ${tier.hoverBorder} rounded-2xl h-full flex flex-col overflow-hidden transition-colors duration-300`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Popular badge */}
          {tier.popular && (
            <motion.div
              className="absolute -top-px left-1/2 -translate-x-1/2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4, ease: easings.easeOutBack }}
            >
              <motion.span
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-b-lg shadow-lg shadow-cyan-500/25"
                animate={{
                  boxShadow: isHovered
                    ? "0 10px 40px -10px rgba(34, 211, 238, 0.5)"
                    : "0 10px 20px -10px rgba(34, 211, 238, 0.25)",
                }}
              >
                <motion.span
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Star size={12} fill="currentColor" />
                </motion.span>
                MOST POPULAR
              </motion.span>
            </motion.div>
          )}

          {/* Shimmer effect for popular */}
          {tier.popular && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: isHovered ? ["200% 0%", "-200% 0%"] : "200% 0%",
              }}
              transition={{
                duration: 1.5,
                ease: "linear",
                repeat: isHovered ? Infinity : 0,
              }}
            />
          )}

          <div className="p-6 sm:p-8 flex flex-col flex-1">
            {/* Header */}
            <div className="mb-6">
              <motion.h3
                className="text-xl font-bold text-white mb-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {tier.name}
              </motion.h3>
              <p className="text-sm text-slate-400 mb-4">{tier.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <motion.span
                  className={`text-3xl font-bold ${
                    tier.popular ? "gradient-text" : "text-white"
                  }`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: easings.easeOutBack }}
                >
                  {tier.price}
                </motion.span>
                <span className="text-slate-500">{tier.period}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature, i) => (
                <FeatureItem
                  key={feature}
                  feature={feature}
                  index={i}
                  popular={tier.popular}
                />
              ))}
            </ul>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                className={`w-full relative overflow-hidden ${
                  tier.popular
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0"
                    : "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
                variant={tier.popular ? "default" : "outline"}
              >
                <a href="#contact" className="flex items-center justify-center gap-2">
                  Get Started
                  {tier.popular && (
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  )}
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </TiltCard>
    </SectionReveal>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-cyan-400 font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles size={12} />
              Simple, Transparent Pricing
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Invest in{" "}
              <span className="gradient-text">Predictable Growth</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Transparent pricing for every stage of growth. Every plan includes
              a dedicated strategist and weekly optimization.
            </p>
          </div>
        </SectionReveal>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <SectionReveal delay={0.6}>
          <motion.p
            className="text-center text-slate-500 text-sm mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            All plans include a 2-week onboarding period.{" "}
            <a href="#contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Book a call
            </a>{" "}
            to discuss custom requirements.
          </motion.p>
        </SectionReveal>
      </div>
    </section>
  );
}