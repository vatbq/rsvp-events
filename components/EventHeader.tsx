"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { RSVPButtons } from "@/components/RSVPButtons";
import { submitRSVP } from "@/app/_actions/event";
import { IconRenderer } from "@/components/IconRenderer";

interface EventHeaderProps {
  title: string;
  icon: string;
}

export function EventHeader({ title, icon }: EventHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-row items-start justify-between gap-3 sm:gap-4 mb-6 lg:hidden">
      <div className="flex items-center gap-2 sm:gap-3">
        <IconRenderer
          iconName={icon}
          className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400"
        />
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          {title}
        </h1>
      </div>
      <button
        onClick={handleCopyLink}
        className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 shrink-0"
      >
        <Copy className="w-4 h-4" />
        <span className="hidden sm:inline">
          {copied ? "Copied!" : "Copy Link"}
        </span>
      </button>
    </div>
  );
}

interface RSVPSectionProps {
  eventId: string;
  isPrivate: boolean;
  hostName: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RSVPSection({ eventId, isPrivate, hostName }: RSVPSectionProps) {
  const [rsvpStatus, setRsvpStatus] = useState<
    "going" | "maybe" | "cant-go" | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = async (
    status: "going" | "maybe" | "cant-go" | null,
  ) => {
    if (status === null) {
      setRsvpStatus(null);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitRSVP(eventId, status);
      setRsvpStatus(status);
    } catch (error) {
      console.error("Failed to submit RSVP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
          Are you coming?
        </h2>
        <p className="text-white/60 text-sm sm:text-base">
          Let us know your plans
        </p>
      </div>
      <RSVPButtons
        currentStatus={rsvpStatus}
        onStatusChange={handleStatusChange}
        disabled={isSubmitting}
      />
    </div>
  );
}
