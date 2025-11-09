"use client";

import { Bell, ChevronRight, Lock } from "lucide-react";
import { useState } from "react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isAppOnly?: boolean;
}

interface AnnouncementsProps {
  announcements?: Announcement[];
  isPrivate?: boolean;
}

export function Announcements({
  announcements = [],
  isPrivate = false,
}: AnnouncementsProps) {
  const [expanded, setExpanded] = useState(false);

  // Use announcements from props if provided, otherwise use mock data
  const displayAnnouncements: Announcement[] =
    announcements.length > 0
      ? announcements
      : [
          {
            id: "1",
            title: "Event Update",
            message: "We've moved the start time to 1:00pm. See you there!",
            timestamp: "2 hours ago",
          },
          {
            id: "2",
            title: "What to Bring",
            message:
              "Please bring a side dish or dessert. We'll have the main course covered!",
            timestamp: "1 day ago",
          },
        ];

  if (isPrivate && displayAnnouncements.length === 0) {
    return (
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Bell className="w-5 h-5 text-orange-400 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-semibold">Announcements</h3>
                <Lock className="w-4 h-4 text-white/50" />
              </div>
              <p className="text-white/60 text-sm mb-4">
                Join the event to see announcements from the host
              </p>
              <button className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors text-sm font-medium flex items-center gap-2">
                Get App to View
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-400" />
          <h3 className="text-xl font-semibold">Announcements</h3>
          {displayAnnouncements.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium">
              {displayAnnouncements.length}
            </span>
          )}
        </div>
        {displayAnnouncements.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            {expanded ? "Show Less" : "Show All"}
          </button>
        )}
      </div>

      {displayAnnouncements.length === 0 ? (
        <p className="text-white/60 text-sm">No announcements yet.</p>
      ) : (
        <div className="space-y-4">
          {(expanded
            ? displayAnnouncements
            : displayAnnouncements.slice(0, 2)
          ).map((announcement) => (
            <div
              key={announcement.id}
              className="pb-4 border-b border-white/10 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-white">
                  {announcement.title}
                </h4>
                <span className="text-xs text-white/50 shrink-0">
                  {announcement.timestamp}
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {announcement.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* App-only notice */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-start gap-2 text-white/60 text-xs">
          <Lock className="w-3 h-3 mt-0.5 shrink-0" />
          <p>
            Get real-time notifications and view all announcements in the Flare
            app.
          </p>
        </div>
        <button className="mt-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-xs font-medium flex items-center gap-1">
          Download App
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
