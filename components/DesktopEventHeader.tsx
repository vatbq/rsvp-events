"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { IconRenderer } from "@/components/IconRenderer";
import { Button } from "@/components/ui/button";

interface DesktopEventHeaderProps {
  title: string;
  icon: string;
}

export function DesktopEventHeader({ title, icon }: DesktopEventHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="hidden lg:flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <IconRenderer iconName={icon} className="w-10 h-10 text-orange-400" />
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          {title}
        </h1>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="mt-2 bg-white/10 hover:bg-white/20 hover:text-white border-white/10 text-white shrink-0"
      >
        <Copy className="w-4 h-4" />
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
