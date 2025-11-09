"use client";

import { useMemo } from "react";

// Helper function to round numbers to consistent precision
const roundTo = (value: number, decimals: number = 4): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

export function StarryBackground() {
  // Generate stable star positions with more variety
  const stars = useMemo(() => {
    const colors = [
      "bg-yellow-400",
      "bg-orange-400",
      "bg-yellow-300",
      "bg-orange-300",
      "bg-pink-400",
      "bg-orange-500",
    ];
    return Array.from({ length: 50 }, (_, i) => {
      // Use a seeded random for consistent positions
      const seed = i * 137.508; // Golden angle approximation
      const top = roundTo((Math.sin(seed) * 0.5 + 0.5) * 100, 4);
      const left = roundTo((Math.cos(seed) * 0.5 + 0.5) * 100, 4);
      const size = roundTo((Math.sin(seed * 2) * 0.5 + 0.5) * 2 + 0.5, 4);
      const delay = (i * 150) % 3000;
      const duration = roundTo(2000 + (Math.sin(seed * 3) * 0.5 + 0.5) * 3000, 4);
      const animationType = i % 3; // Different animation types

      return {
        id: i,
        color: colors[i % colors.length],
        top,
        left,
        size,
        delay,
        duration,
        animationType,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base gradient background - always covers full area */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]" />
      
      {/* Animated gradient overlays - extend beyond viewport */}
      <div className="absolute -inset-[50px] bg-gradient-to-br from-orange-900/30 via-transparent to-pink-900/30 animate-pulse" />
      <div
        className="absolute -inset-[50px] bg-gradient-to-tl from-orange-800/20 via-transparent to-pink-800/20"
        style={{
          animation: "gradientShift 8s ease-in-out infinite",
        }}
      />

      {/* Stars with different animations - contained within viewport */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.color} rounded-full`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}ms`,
            animationDuration: `${star.duration}ms`,
            animation:
              star.animationType === 0
                ? "starTwinkle 3s ease-in-out infinite"
                : star.animationType === 1
                  ? "starFloatContained 6s ease-in-out infinite"
                  : "starPulse 4s ease-in-out infinite",
            boxShadow: `0 0 ${roundTo(star.size * 2, 4)}px currentColor`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}
