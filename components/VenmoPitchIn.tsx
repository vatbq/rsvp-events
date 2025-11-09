"use client";

import { useState } from "react";
import { DollarSign, ExternalLink, Copy, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VenmoPitchInProps {
  venmoHandle?: string;
  suggestedAmount?: number;
  description?: string;
}

export function VenmoPitchIn({
  venmoHandle = "@addison-white",
  suggestedAmount = 15,
  description = "Help cover food and drinks",
}: VenmoPitchInProps) {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState(suggestedAmount.toString());

  const handleCopyVenmo = () => {
    navigator.clipboard.writeText(venmoHandle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenVenmo = () => {
    window.open(`https://venmo.com/${venmoHandle.replace("@", "")}`, "_blank");
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent>
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex-1 text-white">
            <h3 className="text-xl font-semibold mb-1">Pitch In</h3>
            <p className="text-white/70 text-sm">
              {description || "Help cover event costs"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                $
              </span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                className="w-full pl-8 bg-white/5 border-white/10 text-white placeholder-white/40 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[5, 10, 15, 20].map((suggested) => (
                <Button
                  key={suggested}
                  variant={amount === suggested.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAmount(suggested.toString())}
                  className={
                    amount === suggested.toString()
                      ? "bg-green-500 text-white hover:bg-green-600 hover:text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border-white/10"
                  }
                >
                  ${suggested}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Venmo Handle
            </label>
            <div className="flex gap-2">
              <div className="flex-1 p-1 pl-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                <span className="text-white font-medium">{venmoHandle}</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleCopyVenmo}
                  className="p-1.5 hover:bg-white/10 hover:text-white text-white"
                  title="Copy Venmo handle"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/60" />
                  )}
                </Button>
              </div>
              <Button
                onClick={handleOpenVenmo}
                className="bg-green-500 hover:bg-green-600 hover:text-white text-white font-medium h-auto "
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden md:inline">Open Venmo</span>
              </Button>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10">
            <p className="text-xs text-white/50 text-center">
              This is a suggested contribution. You can send any amount you&apos;re
              comfortable with.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
