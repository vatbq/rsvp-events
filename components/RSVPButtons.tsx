"use client";

import { cn } from "@/lib/utils";
import { ThumbsUp, HelpCircle, X } from "lucide-react";

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
    },
    {
      status: "maybe" as const,
      label: "Maybe",
      icon: HelpCircle,
    },
    {
      status: "cant-go" as const,
      label: "Can't Go",
      icon: X,
    },
  ];

  return (
    <div className="flex gap-2 sm:gap-3">
      {buttons.map((button) => {
        const isSelected = currentStatus === button.status;
        const Icon = button.icon;
        return (
          <button
            key={button.status}
            onClick={() => onStatusChange(isSelected ? null : button.status)}
            disabled={disabled}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 sm:py-4 rounded-xl transition-all",
              "border-2 font-medium text-xs sm:text-sm",
              disabled && "opacity-50 cursor-not-allowed",
              isSelected
                ? "bg-white/20 border-white/40 text-white"
                : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20",
            )}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs sm:text-sm">{button.label}</span>
          </button>
        );
      })}
    </div>
  );
}
