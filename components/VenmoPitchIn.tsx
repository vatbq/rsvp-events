"use client";

import { useState } from "react";
import { DollarSign, ExternalLink, Copy, CheckCircle } from "lucide-react";

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
    // In a real app, this would deep link to Venmo app or open Venmo web
    window.open(`https://venmo.com/${venmoHandle.replace("@", "")}`, "_blank");
  };

  return (
    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center shrink-0">
          <DollarSign className="w-5 h-5 text-green-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">Pitch In</h3>
          <p className="text-white/70 text-sm">
            {description || "Help cover event costs"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Suggested Amount */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
              $
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {[5, 10, 15, 20].map((suggested) => (
              <button
                key={suggested}
                onClick={() => setAmount(suggested.toString())}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  amount === suggested.toString()
                    ? "bg-green-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                ${suggested}
              </button>
            ))}
          </div>
        </div>

        {/* Venmo Handle */}
        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Venmo Handle
          </label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-white font-medium">{venmoHandle}</span>
              <button
                onClick={handleCopyVenmo}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
                title="Copy Venmo handle"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-white/60" />
                )}
              </button>
            </div>
            <button
              onClick={handleOpenVenmo}
              className="px-4 py-3 rounded-lg bg-green-500 hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Open Venmo
            </button>
          </div>
        </div>

        {/* Info Note */}
        <div className="pt-3 border-t border-white/10">
          <p className="text-xs text-white/50 text-center">
            This is a suggested contribution. You can send any amount you&apos;re
            comfortable with.
          </p>
        </div>
      </div>
    </div>
  );
}
