"use client";

import { Bell, ChevronRight, Lock } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Bell className="w-5 h-5 text-orange-400 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-white">Announcements</h3>
                  <Lock className="w-4 h-4 text-white/50" />
                </div>
                <p className="text-white/60 text-sm mb-4">
                  Join the event to see announcements from the host
                </p>
                <Button className="bg-orange-500 hover:bg-orange-600 hover:text-white text-white text-sm font-medium">
                  Get App to View
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-400" />
            <h3 className="text-xl font-semibold text-white">Announcements</h3>
            {displayAnnouncements.length > 0 && (
              <Badge className="bg-orange-500/20 text-orange-400 border-transparent">
                {displayAnnouncements.length}
              </Badge>
            )}
          </div>
          {displayAnnouncements.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="text-white/60 hover:text-white hover:bg-transparent"
            >
              {expanded ? "Show Less" : "Show All"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
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

        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-start gap-2 text-white/60 text-xs">
            <Lock className="w-3 h-3 mt-0.5 shrink-0" />
            <p>
              Get real-time notifications and view all announcements in the Flare
              app.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 bg-white/10 hover:bg-white/20 hover:text-white border-white/10 text-xs text-white"
          >
            Download App
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
