import {
  Calendar,
  Camera,
  Bell,
  MessageCircle,
  BarChart,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  camera: Camera,
  bell: Bell,
  messageCircle: MessageCircle,
  barChart: BarChart,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Calendar;
}
