"use client";

import {
  Calendar,
  Camera,
  Bell,
  MessageCircle,
  BarChart,
  type LucideIcon,
} from "lucide-react";

// Icon mapping for client components
const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  camera: Camera,
  bell: Bell,
  messageCircle: MessageCircle,
  barChart: BarChart,
};

interface IconRendererProps {
  iconName: string;
  className?: string;
}

export function IconRenderer({ iconName, className }: IconRendererProps) {
  const Icon = iconMap[iconName] || Calendar;
  return <Icon className={className} />;
}
