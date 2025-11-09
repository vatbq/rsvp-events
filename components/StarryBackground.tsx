"use client";

import { useMemo } from "react";

export function StarryBackground() {
  // Generate stable star positions
  const stars = useMemo(() => {
    const colors = [
      "bg-yellow-400",
      "bg-orange-400",
      "bg-yellow-300",
      "bg-orange-300",
    ];
    return Array.from({ length: 30 }, (_, i) => {
      // Use a seeded random for consistent positions
      const seed = i * 137.508; // Golden angle approximation
      const top = (Math.sin(seed) * 0.5 + 0.5) * 100;
      const left = (Math.cos(seed) * 0.5 + 0.5) * 100;
      const size = (Math.sin(seed * 2) * 0.5 + 0.5) * 1.5 + 0.5;
      const delay = (i * 200) % 2000;
      const duration = 2000 + (Math.sin(seed * 3) * 0.5 + 0.5) * 2000;

      return {
        id: i,
        color: colors[i % colors.length],
        top,
        left,
        size,
        delay,
        duration,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 opacity-40 pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute ${star.color} rounded-full animate-pulse`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}ms`,
            animationDuration: `${star.duration}ms`,
          }}
        />
      ))}
    </div>
  );
}
