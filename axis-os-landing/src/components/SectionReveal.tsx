"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, type UseInViewOptions, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { easings } from "@/lib/animations";

type AnimationDirection = "up" | "down" | "left" | "right" | "none";
type AnimationEffect = "fade" | "blur" | "scale" | "blur-scale";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: AnimationDirection;
  effect?: AnimationEffect;
  distance?: number;
  once?: boolean;
  margin?: UseInViewOptions["margin"];
  as?: "div" | "section" | "article" | "header" | "footer" | "aside" | "span";
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  effect = "fade",
  distance = 40,
  once = true,
  margin = "-80px",
  as = "div",
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  // Build initial state based on direction
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
      default:
        return {};
    }
  };

  // Build effect properties
  const getEffectProps = () => {
    switch (effect) {
      case "blur":
        return {
          hidden: { filter: "blur(10px)" },
          visible: { filter: "blur(0px)" },
        };
      case "scale":
        return {
          hidden: { scale: 0.9 },
          visible: { scale: 1 },
        };
      case "blur-scale":
        return {
          hidden: { filter: "blur(10px)", scale: 0.95 },
          visible: { filter: "blur(0px)", scale: 1 },
        };
      case "fade":
      default:
        return {
          hidden: {},
          visible: {},
        };
    }
  };

  const directionOffset = getDirectionOffset();
  const effectProps = getEffectProps();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionOffset,
      ...effectProps.hidden,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...effectProps.visible,
      transition: {
        duration,
        delay,
        ease: easings.easeOutExpo,
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </Component>
  );
}

// ============================================
// STAGGER CONTAINER
// ============================================
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  direction?: AnimationDirection;
  effect?: AnimationEffect;
  distance?: number;
  once?: boolean;
  margin?: UseInViewOptions["margin"];
  as?: "div" | "section" | "ul" | "ol";
}

export function StaggerReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  once = true,
  margin = "-80px",
  as = "div",
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </Component>
  );
}

// ============================================
// STAGGER ITEM (use inside StaggerReveal)
// ============================================
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: AnimationDirection;
  effect?: AnimationEffect;
  distance?: number;
  duration?: number;
  as?: "div" | "li" | "span" | "article";
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  effect = "fade",
  distance = 30,
  duration = 0.5,
  as = "div",
}: StaggerItemProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
      default:
        return {};
    }
  };

  const getEffectProps = () => {
    switch (effect) {
      case "blur":
        return {
          hidden: { filter: "blur(8px)" },
          visible: { filter: "blur(0px)" },
        };
      case "scale":
        return {
          hidden: { scale: 0.9 },
          visible: { scale: 1 },
        };
      case "blur-scale":
        return {
          hidden: { filter: "blur(8px)", scale: 0.95 },
          visible: { filter: "blur(0px)", scale: 1 },
        };
      default:
        return { hidden: {}, visible: {} };
    }
  };

  const directionOffset = getDirectionOffset();
  const effectProps = getEffectProps();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...directionOffset,
      ...effectProps.hidden,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...effectProps.visible,
      transition: {
        duration,
        ease: easings.easeOutExpo,
      },
    },
  };

  const Component = motion[as];

  return (
    <Component variants={itemVariants} className={className}>
      {children}
    </Component>
  );
}

// ============================================
// TEXT REVEAL (word by word or character)
// ============================================
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  mode?: "word" | "character";
  once?: boolean;
  margin?: UseInViewOptions["margin"];
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  mode = "word",
  once = true,
  margin = "-80px",
  as = "p",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  const items = mode === "word" ? text.split(" ") : text.split("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: easings.easeOutExpo,
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("flex flex-wrap", className)}
      aria-label={text}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block"
          style={{ marginRight: mode === "word" ? "0.25em" : undefined }}
        >
          {item}
          {mode === "character" && item === " " && "\u00A0"}
        </motion.span>
      ))}
    </Component>
  );
}

// ============================================
// PARALLAX REVEAL (subtle parallax on scroll)
// ============================================
interface ParallaxRevealProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  once?: boolean;
  margin?: UseInViewOptions["margin"];
}

export function ParallaxReveal({
  children,
  className = "",
  offset = 50,
  once = true,
  margin = "-100px",
}: ParallaxRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: offset }
      }
      transition={{
        duration: 0.8,
        ease: easings.easeOutExpo,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// REVEAL ON HOVER WRAPPER
// ============================================
interface HoverRevealProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
  revealClassName?: string;
}

export function HoverReveal({
  children,
  revealContent,
  className = "",
  revealClassName = "",
}: HoverRevealProps) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial="initial"
      whileHover="hover"
    >
      {children}
      <motion.div
        className={cn("absolute inset-0", revealClassName)}
        variants={{
          initial: { opacity: 0, y: 20 },
          hover: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3,
              ease: easings.easeOutExpo,
            },
          },
        }}
      >
        {revealContent}
      </motion.div>
    </motion.div>
  );
}

// ============================================
// COUNTER REVEAL (animated number with reveal)
// ============================================
interface CounterRevealProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  margin?: UseInViewOptions["margin"];
}

export function CounterReveal({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2000,
  delay = 0,
  className = "",
  once = true,
  margin = "-100px",
}: CounterRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin });
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;

      const timeout = setTimeout(() => {
        let startTime: number;
        const step = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(eased * end);
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, end, duration, delay]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.5,
        delay,
        ease: easings.easeOutExpo,
      }}
      className={className}
    >
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}