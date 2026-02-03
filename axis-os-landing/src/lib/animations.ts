import { Variants, Transition } from "framer-motion";

// ============================================
// EASING FUNCTIONS
// ============================================
export const easings = {
  // Smooth deceleration - great for entrances
  easeOutExpo: [0.16, 1, 0.3, 1],
  // Quick deceleration
  easeOutQuart: [0.25, 1, 0.5, 1],
  // Symmetric smooth
  easeInOutCirc: [0.85, 0, 0.15, 1],
  // Bouncy/spring-like
  easeOutBack: [0.34, 1.56, 0.64, 1],
  // Gentle bounce
  easeOutElastic: [0.64, 0.57, 0.67, 1.53],
} as const;

// ============================================
// TRANSITION PRESETS
// ============================================
export const transitions = {
  fast: {
    duration: 0.15,
    ease: easings.easeOutExpo,
  },
  normal: {
    duration: 0.3,
    ease: easings.easeOutExpo,
  },
  slow: {
    duration: 0.5,
    ease: easings.easeOutExpo,
  },
  slower: {
    duration: 0.8,
    ease: easings.easeOutExpo,
  },
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
  springBouncy: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  },
  springGentle: {
    type: "spring",
    stiffness: 200,
    damping: 20,
  },
} as const;

// ============================================
// FADE VARIANTS
// ============================================
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.slow,
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.slow,
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.slow,
  },
};

// ============================================
// SCALE VARIANTS
// ============================================
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.slow,
  },
};

export const scaleInCenter: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.springBouncy,
  },
};

// ============================================
// BLUR VARIANTS
// ============================================
export const blurIn: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: transitions.slower,
  },
};

export const blurInUp: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 30,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: transitions.slower,
  },
};

// ============================================
// STAGGER CONTAINERS
// ============================================
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Custom stagger with configurable timing
export const createStaggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// ============================================
// STAGGER CHILDREN (use with stagger containers)
// ============================================
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const staggerItemScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const staggerItemFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
};

// ============================================
// TEXT ANIMATION VARIANTS
// ============================================

// For animating words/characters individually
export const textContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

export const textCharacter: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.easeOutExpo,
    },
  },
};

export const textWord: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -80,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: easings.easeOutExpo,
    },
  },
};

export const textBlur: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 10,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.easeOutExpo,
    },
  },
};

// Line reveal (clip-path based)
export const textRevealLine: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
    },
  },
};

// ============================================
// HOVER ANIMATIONS
// ============================================
export const hoverScale = {
  scale: 1.05,
  transition: transitions.fast,
};

export const hoverScaleSubtle = {
  scale: 1.02,
  transition: transitions.fast,
};

export const tapScale = {
  scale: 0.98,
  transition: transitions.fast,
};

export const hoverLift = {
  y: -4,
  transition: transitions.normal,
};

export const hoverGlow = {
  boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
  transition: transitions.normal,
};

// ============================================
// BUTTON VARIANTS
// ============================================
export const buttonVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: transitions.springBouncy,
  },
  tap: {
    scale: 0.98,
    transition: transitions.fast,
  },
};

export const buttonGlowVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: "0 0 0 rgba(6, 182, 212, 0)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
    transition: transitions.normal,
  },
  tap: {
    scale: 0.98,
    transition: transitions.fast,
  },
};

// ============================================
// CARD VARIANTS
// ============================================
export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.slow,
  },
  hover: {
    y: -8,
    transition: transitions.normal,
  },
};

export const cardTiltVariants: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easings.easeOutExpo,
    },
  },
};

export const pageSlideUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easings.easeOutExpo,
    },
  },
};

// ============================================
// NAVIGATION VARIANTS
// ============================================
export const navVariants: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  },
};

export const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: easings.easeOutExpo,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: easings.easeOutExpo,
    },
  },
};

export const mobileMenuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
};

// ============================================
// REVEAL VARIANTS (for scroll animations)
// ============================================
export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
    },
  },
};

export const revealFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
    },
  },
};

export const revealFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easings.easeOutExpo,
    },
  },
};

// ============================================
// SPECIAL EFFECTS
// ============================================

// Floating animation for decorative elements
export const floatingVariants: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Rotate continuously
export const rotateVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Pulse scale
export const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Create custom fade variant with configurable direction and distance
export const createFadeVariant = (
  direction: "up" | "down" | "left" | "right" = "up",
  distance: number = 40,
  duration: number = 0.5
): Variants => {
  const isY = direction === "up" || direction === "down";
  const value =
    direction === "up" || direction === "left" ? distance : -distance;

  return {
    hidden: {
      opacity: 0,
      ...(isY ? { y: value } : { x: value }),
    },
    visible: {
      opacity: 1,
      ...(isY ? { y: 0 } : { x: 0 }),
      transition: {
        duration,
        ease: easings.easeOutExpo,
      },
    },
  };
};

// Create delayed variant
export const withDelay = (variants: Variants, delay: number): Variants => {
  const result: Variants = {};

  for (const key in variants) {
    const variant = variants[key];
    if (typeof variant === "object" && variant !== null) {
      result[key] = {
        ...variant,
        transition: {
          ...(variant as { transition?: Transition }).transition,
          delay,
        },
      };
    } else {
      result[key] = variant;
    }
  }

  return result;
};

// Viewport settings for scroll animations
export const viewportSettings = {
  once: true,
  margin: "-100px",
};

export const viewportSettingsEager = {
  once: true,
  margin: "-50px",
};

export const viewportSettingsLazy = {
  once: true,
  margin: "-150px",
};