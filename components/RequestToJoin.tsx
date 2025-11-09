"use client";

import { useState } from "react";
import { Lock, UserPlus, CheckCircle, Clock } from "lucide-react";
import { requestToJoin } from "@/app/_actions/event";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RequestToJoinProps {
  isPrivate: boolean;
  hostName: string;
  eventId: string;
}

export function RequestToJoin({
  isPrivate,
  hostName,
  eventId,
}: RequestToJoinProps) {
  const [requested, setRequested] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isPrivate) {
    return null;
  }

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await requestToJoin(eventId, message);
      setRequested(true);
    } catch (error) {
      console.error("Failed to submit request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (requested) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Request Sent!</h3>
              <p className="text-white/70 text-sm mb-4">
                Your request to join this event has been sent to {hostName}.
                You&apos;ll be notified when they respond.
              </p>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <Clock className="w-3 h-3" />
                <span>Waiting for approval</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3 mb-4">
          <Lock className="w-5 h-5 text-orange-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">Private Event</h3>
            <p className="text-white/70 text-sm">
              This event is private. Request to join and the host will review your
              request.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Why do you want to join?
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the host why you'd like to attend..."
              className="w-full bg-white/5 border-white/10 text-white placeholder-white/40 focus:ring-orange-500 resize-none"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-white/50 mt-1 text-right">
              {message.length}/500
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!message.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:text-white text-white disabled:from-white/10 disabled:to-white/10 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Request to Join
              </>
            )}
          </Button>

          <p className="text-xs text-white/50 text-center">
            The host will review your request and notify you of their decision
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
