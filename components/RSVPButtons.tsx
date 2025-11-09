"use client";

import { cn } from "@/lib/utils";
import { ThumbsUp, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type RSVPStatus = "going" | "maybe" | "cant-go" | null;

interface RSVPButtonsProps {
  currentStatus: RSVPStatus;
  onStatusChange: (status: RSVPStatus) => void;
  disabled?: boolean;
}

export function RSVPButtons({
  currentStatus,
  onStatusChange,
  disabled = false,
}: RSVPButtonsProps) {
  const buttons = [
    {
      status: "going" as const,
      label: "Going",
      icon: ThumbsUp,
      selectedClass: "bg-gradient-to-br from-green-500/40 via-emerald-500/35 to-green-600/40 border-green-400/60 text-white shadow-[0_8px_32px_rgba(34,197,94,0.3)] ring-1 ring-green-400/40",
      unselectedClass: "bg-white/5 border-white/15 text-white/70 shadow-lg shadow-black/20",
      hoverClass: "hover:bg-green-500/20 hover:border-green-400/40 hover:text-white",
    },
    {
      status: "maybe" as const,
      label: "Maybe",
      icon: HelpCircle,
      selectedClass: "bg-gradient-to-br from-amber-500/40 via-orange-500/35 to-amber-600/40 border-amber-400/60 text-white shadow-[0_8px_32px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/40",
      unselectedClass: "bg-white/5 border-white/15 text-white/70 shadow-lg shadow-black/20",
      hoverClass: "hover:bg-yellow-500/20 hover:border-yellow-400/40 hover:text-white",
    },
    {
      status: "cant-go" as const,
      label: "Can't Go",
      icon: X,
      selectedClass: "bg-gradient-to-br from-slate-500/40 via-gray-500/35 to-slate-600/40 border-slate-400/60 text-white shadow-[0_8px_32px_rgba(100,116,139,0.3)] ring-1 ring-slate-400/40",
      unselectedClass: "bg-white/5 border-white/15 text-white/70 shadow-lg shadow-black/20",
      hoverClass: "hover:bg-red-500/20 hover:border-red-400/40 hover:text-white",
    },
  ];

  return (
    <div className="flex gap-4 sm:gap-5">
      {buttons.map((button) => {
        const isSelected = currentStatus === button.status;
        const Icon = button.icon;
        return (
          <Button
            key={button.status}
            onClick={() => onStatusChange(isSelected ? null : button.status)}
            disabled={disabled}
            className={cn(
              "flex-1 flex flex-row items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl transition-all duration-300",
              "border font-medium text-sm sm:text-base backdrop-blur-md",
              "transform active:scale-[0.97]",
              disabled && "opacity-50 cursor-not-allowed",
              isSelected
                ? `${button.selectedClass} scale-[1.02]`
                : `${button.unselectedClass} ${button.hoverClass} hover:scale-[1.01]`,
            )}
            variant="outline"
          >
            <Icon className={cn(
              "w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300",
              isSelected && "scale-110"
            )} />
            <span className={cn(
              "transition-all duration-300",
              isSelected && "font-semibold"
            )}>{button.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
