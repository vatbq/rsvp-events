"use client";

import { useState } from "react";
import { Users, AlertCircle, X, CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuestListProps {
  going: number;
  maybe: number;
  cantGo: number;
  invited: number;
  spotsLeft?: number;
  totalSpots?: number;
}

// Mock guest names - in real app, these would come from props
const generateGuestNames = (count: number): string[] => {
  const firstNames = [
    "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn",
    "Sam", "Blake", "Cameron", "Dakota", "Emery", "Finley", "Harper", "Hayden",
    "Jamie", "Kendall", "Logan", "Parker", "Peyton", "Reese", "River", "Sage",
    "Skylar", "Tatum", "Winter", "Zion", "Addison", "Bailey", "Brooklyn", "Carter",
    "Charlie", "Drew", "Ellis", "Gray", "Harley", "Indigo", "Jules", "Kai"
  ];
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor",
    "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Sanchez",
    "Clark", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright",
    "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson"
  ];
  return Array.from({ length: count }, (_, i) => {
    const firstNameIndex = i % firstNames.length;
    const lastNameIndex = Math.floor(i / firstNames.length) % lastNames.length;
    return `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
  });
};

// Helper function to get initials from a full name
const getInitials = (fullName: string): string => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
  return fullName.charAt(0).toUpperCase();
};

type TabType = "going" | "maybe" | "cantGo";

export function GuestList({
  going,
  maybe,
  cantGo,
  invited,
  spotsLeft,
  totalSpots,
}: GuestListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("going");

  // Generate mock guest data
  const goingGuests = generateGuestNames(going);
  const maybeGuests = generateGuestNames(maybe);
  const cantGoGuests = generateGuestNames(cantGo);
  const allGuests = [...goingGuests, ...maybeGuests];

  // Mock guest avatars - in real app, these would come from props
  const guestAvatars = Array.from(
    { length: Math.min(going + maybe, 5) },
    (_, i) => ({
      id: i,
      name: allGuests[i] || `Guest ${i + 1}`,
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
        <button 
          onClick={() => {
            // Set default tab to first tab with guests
            if (going > 0) setActiveTab("going");
            else if (maybe > 0) setActiveTab("maybe");
            else if (cantGo > 0) setActiveTab("cantGo");
            setIsModalOpen(true);
          }}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
        >
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
            {getInitials(guest.name)}
          </div>
        ))}
        {remainingGuests > 0 && (
          <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-white/70 text-xs font-medium">
            +{remainingGuests}
          </div>
        )}
      </div>

      {/* Modal for viewing all guests */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-2xl h-[600px] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Users className="w-6 h-6" />
                Guest List
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-6">
              <button
                onClick={() => setActiveTab("going")}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                  activeTab === "going"
                    ? "border-green-400 text-green-400"
                    : "border-transparent text-white/60 hover:text-white/80"
                )}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Going ({goingGuests.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab("maybe")}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                  activeTab === "maybe"
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-white/60 hover:text-white/80"
                )}
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Maybe ({maybeGuests.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab("cantGo")}
                className={cn(
                  "px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                  activeTab === "cantGo"
                    ? "border-red-400 text-red-400"
                    : "border-transparent text-white/60 hover:text-white/80"
                )}
              >
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Can&apos;t Go ({cantGoGuests.length})
                </div>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6 min-h-0">
              {/* Going Tab */}
              {activeTab === "going" && (
                <>
                  {goingGuests.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {goingGuests.map((name, index) => (
                        <div
                          key={`going-${index}`}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full bg-gradient-to-br border-2 border-white/20 flex items-center justify-center text-white font-semibold text-sm shrink-0",
                              index % 5 === 0 && "from-orange-400 to-orange-600",
                              index % 5 === 1 && "from-pink-400 to-pink-600",
                              index % 5 === 2 && "from-purple-400 to-purple-600",
                              index % 5 === 3 && "from-blue-400 to-blue-600",
                              index % 5 === 4 && "from-green-400 to-green-600",
                            )}
                          >
                            {getInitials(name)}
                          </div>
                          <span className="text-white/90">{name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-white/60">
                      <CheckCircle2 className="w-16 h-16 mx-auto mb-4 opacity-50 text-green-400" />
                      <p>No one is going yet</p>
                    </div>
                  )}
                </>
              )}

              {/* Maybe Tab */}
              {activeTab === "maybe" && (
                <>
                  {maybeGuests.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {maybeGuests.map((name, index) => (
                        <div
                          key={`maybe-${index}`}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full bg-gradient-to-br border-2 border-white/20 flex items-center justify-center text-white font-semibold text-sm shrink-0",
                              (goingGuests.length + index) % 5 === 0 && "from-orange-400 to-orange-600",
                              (goingGuests.length + index) % 5 === 1 && "from-pink-400 to-pink-600",
                              (goingGuests.length + index) % 5 === 2 && "from-purple-400 to-purple-600",
                              (goingGuests.length + index) % 5 === 3 && "from-blue-400 to-blue-600",
                              (goingGuests.length + index) % 5 === 4 && "from-green-400 to-green-600",
                            )}
                          >
                            {getInitials(name)}
                          </div>
                          <span className="text-white/90">{name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-white/60">
                      <HelpCircle className="w-16 h-16 mx-auto mb-4 opacity-50 text-amber-400" />
                      <p>No maybes yet</p>
                    </div>
                  )}
                </>
              )}

              {/* Can't Go Tab */}
              {activeTab === "cantGo" && (
                <>
                  {cantGoGuests.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cantGoGuests.map((name, index) => (
                        <div
                          key={`cantgo-${index}`}
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-60"
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full bg-gradient-to-br border-2 border-white/20 flex items-center justify-center text-white font-semibold text-sm shrink-0",
                              (goingGuests.length + maybeGuests.length + index) % 5 === 0 && "from-orange-400 to-orange-600",
                              (goingGuests.length + maybeGuests.length + index) % 5 === 1 && "from-pink-400 to-pink-600",
                              (goingGuests.length + maybeGuests.length + index) % 5 === 2 && "from-purple-400 to-purple-600",
                              (goingGuests.length + maybeGuests.length + index) % 5 === 3 && "from-blue-400 to-blue-600",
                              (goingGuests.length + maybeGuests.length + index) % 5 === 4 && "from-green-400 to-green-600",
                            )}
                          >
                            {getInitials(name)}
                          </div>
                          <span className="text-white/90">{name}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-white/60">
                      <XCircle className="w-16 h-16 mx-auto mb-4 opacity-50 text-red-400" />
                      <p>No one can&apos;t go</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
