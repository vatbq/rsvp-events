"use client";

import { Users, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuestListProps {
  going: number;
  maybe: number;
  cantGo: number;
  invited: number;
  spotsLeft?: number;
  totalSpots?: number;
}

export function GuestList({
  going,
  maybe,
  cantGo,
  invited,
  spotsLeft,
  totalSpots,
}: GuestListProps) {
  // Mock guest avatars - in real app, these would come from props
  const guestAvatars = Array.from(
    { length: Math.min(going + maybe, 5) },
    (_, i) => ({
      id: i,
      name: `Guest ${i + 1}`,
      avatar: `/api/placeholder/40/40?seed=${i}`,
    }),
  );

  const remainingGuests = invited - guestAvatars.length;
  const isLimitedCapacity = totalSpots !== undefined && totalSpots > 0;
  const isFull = isLimitedCapacity && spotsLeft !== undefined && spotsLeft <= 0;
  const isLowCapacity =
    isLimitedCapacity &&
    spotsLeft !== undefined &&
    spotsLeft <= 5 &&
    spotsLeft > 0;

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Users className="w-5 h-5" />
          Guest List
        </h3>
        <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
          View All
        </button>
      </div>

      {/* Capacity Alert */}
      {isLimitedCapacity && (
        <div
          className={cn(
            "mb-4 p-3 rounded-lg flex items-start gap-2",
            isFull && "bg-red-500/20 border border-red-500/30",
            isLowCapacity && "bg-orange-500/20 border border-orange-500/30",
            !isFull &&
              !isLowCapacity &&
              "bg-blue-500/20 border border-blue-500/30",
          )}
        >
          <AlertCircle
            className={cn(
              "w-4 h-4 mt-0.5 shrink-0",
              isFull && "text-red-400",
              isLowCapacity && "text-orange-400",
              !isFull && !isLowCapacity && "text-blue-400",
            )}
          />
          <div className="flex-1">
            <p
              className={cn(
                "text-sm font-medium",
                isFull && "text-red-300",
                isLowCapacity && "text-orange-300",
                !isFull && !isLowCapacity && "text-blue-300",
              )}
            >
              {isFull
                ? "Event is full"
                : isLowCapacity
                  ? `Only ${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left!`
                  : `${spotsLeft} of ${totalSpots} spots available`}
            </p>
            {isFull && (
              <p className="text-red-300/70 text-xs mt-1">
                Join the waiting list to be notified if spots open up
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mb-4 text-white/70 text-sm">
        {going} Going · {maybe} Maybe · {cantGo} Can&apos;t Go · {invited}{" "}
        Invited
      </div>

      <div className="flex items-center gap-2">
        {guestAvatars.map((guest, index) => (
          <div
            key={guest.id}
            className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br",
              index === 0 && "from-orange-400 to-orange-600",
              index === 1 && "from-pink-400 to-pink-600",
              index === 2 && "from-purple-400 to-purple-600",
              index === 3 && "from-blue-400 to-blue-600",
              index === 4 && "from-green-400 to-green-600",
              "border-2 border-white/20 flex items-center justify-center text-white font-semibold text-sm",
            )}
            title={guest.name}
          >
            {guest.name.charAt(guest.name.length - 1)}
          </div>
        ))}
        {remainingGuests > 0 && (
          <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white/70 text-xs font-medium">
            +{remainingGuests}
          </div>
        )}
      </div>
    </div>
  );
}
