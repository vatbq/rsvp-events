"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { RSVPButtons } from "@/components/RSVPButtons";
import { submitRSVP } from "@/app/_actions/event";
import { IconRenderer } from "@/components/IconRenderer";
import { Button } from "@/components/ui/button";

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
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="bg-white/10 hover:bg-white/20 hover:text-white border-white/10 text-white shrink-0"
      >
        <Copy className="w-4 h-4" />
        <span className="hidden sm:inline">
          {copied ? "Copied!" : "Copy Link"}
        </span>
      </Button>
    </div>
  );
}

interface RSVPSectionProps {
  eventId: string;
  isPrivate: boolean;
  hostName: string;
}

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
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
          Are you coming?
        </h2>
        <p className="text-white/60 text-sm sm:text-base">
          Let us know your plans
        </p>
      <RSVPButtons
        currentStatus={rsvpStatus}
        onStatusChange={handleStatusChange}
        disabled={isSubmitting}
      />
    </div>
  );
}
