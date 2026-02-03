"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal } from "@/components/SectionReveal";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { MagneticButton } from "@/components/MagneticButton";
import { Check, X, ArrowRight, Sparkles, Calendar } from "lucide-react";
import { easings } from "@/lib/animations";

const forYou = [
  "You're ready to invest in a real system",
  "You want predictable, scalable revenue",
  "You value data-driven decisions",
  "You're done with inconsistent results",
];

const notForYou = [
  "You want overnight results with no commitment",
  "You're not willing to invest in growth",
  "You just want to \"go viral\"",
  "You're looking for the cheapest option",
];

// Animated list item
function ListItem({
  item,
  index,
  type,
  isInView,
}: {
  item: string;
  index: number;
  type: "positive" | "negative";
  isInView: boolean;
}) {
  const isPositive = type === "positive";
  const Icon = isPositive ? Check : X;
  const iconColor = isPositive ? "text-emerald-400" : "text-red-400";

  return (
    <motion.li
      className="flex items-start gap-3 text-sm group"
      initial={{ opacity: 0, x: isPositive ? -20 : 20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isPositive ? -20 : 20 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: easings.easeOutExpo,
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{
          duration: 0.3,
          delay: index * 0.1 + 0.15,
          ease: easings.easeOutBack,
        }}
        className="relative"
      >
        {/* Icon glow on hover */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-md ${
            isPositive ? "bg-emerald-400/30" : "bg-red-400/30"
          }`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        <Icon
          size={16}
          className={`relative mt-0.5 flex-shrink-0 ${iconColor} transition-transform group-hover:scale-110`}
        />
      </motion.div>
      <motion.span
        className="text-slate-300 group-hover:text-white transition-colors"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        {item}
      </motion.span>
    </motion.li>
  );
}

// Qualification card component
function QualificationCard({
  title,
  items,
  type,
  delay,
}: {
  title: string;
  items: string[];
  type: "positive" | "negative";
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const isPositive = type === "positive";
  const bgColor = isPositive ? "bg-emerald-500/5" : "bg-red-500/5";
  const borderColor = isPositive ? "border-emerald-500/20" : "border-red-500/20";
  const hoverBorderColor = isPositive ? "hover:border-emerald-500/40" : "hover:border-red-500/40";
  const titleColor = isPositive ? "text-emerald-400" : "text-red-400";
  const glowColor = isPositive ? "rgba(52, 211, 153, 0.1)" : "rgba(248, 113, 113, 0.1)";

  return (
    <SectionReveal delay={delay} direction={isPositive ? "left" : "right"} effect="blur-scale">
      <motion.div
        ref={ref}
        className={`relative ${bgColor} border ${borderColor} ${hoverBorderColor} rounded-2xl h-full overflow-hidden transition-colors duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-2 rounded-3xl blur-xl pointer-events-none"
          style={{ background: glowColor }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative p-6 sm:p-8">
          <motion.h3
            className={`text-xl font-bold ${titleColor} mb-6 flex items-center gap-2`}
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: easings.easeOutExpo }}
          >
            {isPositive ? (
              <motion.span
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles size={20} />
              </motion.span>
            ) : null}
            {title}
          </motion.h3>

          <ul className="space-y-4">
            {items.map((item, i) => (
              <ListItem
                key={item}
                item={item}
                index={i}
                type={type}
                isInView={isInView}
              />
            ))}
          </ul>
        </div>

        {/* Bottom highlight line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
            isPositive ? "bg-emerald-400" : "bg-red-400"
          }`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: easings.easeOutExpo }}
        />
      </motion.div>
    </SectionReveal>
  );
}

export function Contact() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <FloatingOrbs />

      {/* Extra background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-cyan-400 font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easings.easeOutBack }}
            >
              <Calendar size={12} />
              {"Let's Talk Growth"}
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to Build Your{" "}
              <motion.span
                className="gradient-text inline-block"
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
                Growth System
              </motion.span>
              ?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We only work with brands that are serious about growth. See if
              we&apos;re the right fit.
            </p>
          </div>
        </SectionReveal>

        {/* Qualification cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          <QualificationCard
            title="This Is For People Who"
            items={forYou}
            type="positive"
            delay={0.1}
          />
          <QualificationCard
            title="This Is NOT For"
            items={notForYou}
            type="negative"
            delay={0.2}
          />
        </div>

        {/* CTA */}
        <SectionReveal delay={0.3}>
          <motion.div
            ref={ctaRef}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: easings.easeOutExpo }}
          >
            <MagneticButton
              as="a"
              href="https://calendly.com" // Replace with actual link
              strength={0.15}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold px-10 py-5 rounded-xl"
            >
              <Calendar size={20} />
              Book Your Strategy Call
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={20} />
              </motion.span>
            </MagneticButton>

            <motion.p
              className="text-sm text-slate-500 mt-4"
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Free 30-minute call • No commitment required
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              className="flex items-center justify-center gap-6 mt-8 text-slate-500 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <span className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                100% Free
              </span>
              <span className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                No Pressure
              </span>
              <span className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                Custom Strategy
              </span>
            </motion.div>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  );
}