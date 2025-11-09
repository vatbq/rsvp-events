"use client";

import { useState } from "react";
import { Copy, PartyPopper } from "lucide-react";
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
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-6 lg:hidden">
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
        className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2 shrink-0 self-start sm:self-auto"
      >
        <Copy className="w-4 h-4" />
        <span className="hidden sm:inline">
          {copied ? "Copied!" : "Copy Link"}
        </span>
        <span className="sm:hidden">{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );
}

interface RSVPSectionProps {
  eventId: string;
  isPrivate: boolean;
  hostName: string;
}

export function RSVPSection({ eventId, isPrivate }: RSVPSectionProps) {
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
    <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">RSVP</h2>
      {isPrivate ? (
        <div className="text-white/70 text-sm">
          This is a private event. Please request to join.
        </div>
      ) : (
        <>
          <RSVPButtons
            currentStatus={rsvpStatus}
            onStatusChange={handleStatusChange}
            disabled={isSubmitting}
          />
          {rsvpStatus && (
            <p className="mt-4 text-white/70 text-sm flex items-center gap-2">
              {rsvpStatus === "going" && (
                <>
                  <PartyPopper className="w-4 h-4" />
                  <span>Great! We&apos;ll see you there!</span>
                </>
              )}
              {rsvpStatus === "maybe" &&
                "No worries, let us know when you decide!"}
              {rsvpStatus === "cant-go" &&
                "Sorry you can't make it. Maybe next time!"}
            </p>
          )}
        </>
      )}
    </div>
  );
}
