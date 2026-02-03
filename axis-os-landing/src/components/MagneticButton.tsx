"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "button" | "a" | "div";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  glow?: boolean;
  scale?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  radius = 200,
  as = "button",
  href,
  onClick,
  disabled = false,
  glow = true,
  scale = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring config for smooth, slightly bouncy movement
  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Glow position (follows cursor more closely)
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Distance from cursor to center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Only apply magnetic effect within radius
    if (distance < radius) {
      // Strength decreases as cursor gets further from center
      const factor = 1 - distance / radius;
      x.set(distanceX * strength * factor);
      y.set(distanceY * strength * factor);

      // Update glow position (percentage based)
      const glowPosX = ((e.clientX - rect.left) / rect.width) * 100;
      const glowPosY = ((e.clientY - rect.top) / rect.height) * 100;
      glowX.set(glowPosX);
      glowY.set(glowPosY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  // Dynamic glow gradient based on cursor position
  const glowBackground = useTransform(
    [glowX, glowY],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(6, 182, 212, 0.3) 0%, transparent 60%)`
  );

  const Component = as === "a" ? motion.a : as === "div" ? motion.div : motion.button;

  const componentProps = {
    ...(as === "a" && href ? { href } : {}),
    ...(as === "button" ? { type: "button" as const, disabled } : {}),
    ...(onClick ? { onClick } : {}),
  };

  return (
    <motion.div
      ref={ref}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {/* Glow effect layer */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            background: glowBackground,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Outer glow */}
      {glow && (
        <motion.div
          className="absolute -inset-1 rounded-[inherit] blur-xl pointer-events-none"
          animate={{
            opacity: isHovered ? 0.4 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5))",
          }}
        />
      )}

      <Component
        {...componentProps}
        className={cn(
          "relative z-10 transition-colors",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        animate={{
          scale: scale && isHovered && !disabled ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        whileTap={!disabled && scale ? { scale: 0.98 } : undefined}
      >
        {children}
      </Component>
    </motion.div>
  );
}

// Simplified version for nav links and smaller elements
interface MagneticLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticLink({
  children,
  href,
  className = "",
  strength = 0.2,
  onClick,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 30 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={cn("inline-block", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.a>
  );
}

// Icon button with magnetic effect (for social icons, etc.)
interface MagneticIconProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
}

export function MagneticIcon({
  children,
  className = "",
  strength = 0.4,
  onClick,
  href,
}: MagneticIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 25 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotate = useSpring(rotate, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
    // Subtle rotation based on horizontal movement
    rotate.set(distanceX * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotate.set(0);
    setIsHovered(false);
  };

  const Wrapper = href ? motion.a : motion.button;
  const wrapperProps = href ? { href } : { type: "button" as const, onClick };

  return (
    <motion.div
      ref={ref}
      className="relative inline-flex"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        x: springX,
        y: springY,
        rotate: springRotate,
      }}
    >
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
        }}
      />

      <Wrapper
        {...wrapperProps}
        className={cn(
          "relative z-10 flex items-center justify-center transition-colors",
          className
        )}
      >
        {children}
      </Wrapper>
    </motion.div>
  );
}
