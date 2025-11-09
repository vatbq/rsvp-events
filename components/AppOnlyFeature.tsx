"use client";

import { Lock, ChevronRight, Sparkles } from "lucide-react";
import { IconRenderer } from "@/components/IconRenderer";

interface AppOnlyFeatureProps {
  title: string;
  description: string;
  icon: string;
  benefit?: string;
}

export function AppOnlyFeature({
  title,
  description,
  icon,
  benefit,
}: AppOnlyFeatureProps) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <IconRenderer iconName={icon} className="w-6 h-6 text-white/80" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-white">{title}</h4>
              <Lock className="w-4 h-4 text-white/50" />
            </div>
            <p className="text-white/60 text-sm mb-2">{description}</p>
            {benefit && (
              <div className="flex items-center gap-1.5 text-orange-400 text-xs">
                <Sparkles className="w-3 h-3" />
                <span>{benefit}</span>
              </div>
            )}
          </div>
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all text-xs font-medium flex items-center gap-1 shrink-0 group-hover:scale-105">
          Get App
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
