import { Calendar, Clock, MapPin, Users, Crown } from "lucide-react";

interface EventMetaProps {
  date: string;
  time: string;
  location: string;
  spotsLeft: number;
  totalSpots: number;
  hostName: string;
}

export function EventMeta({
  date,
  time,
  location,
  spotsLeft,
  totalSpots,
  hostName,
}: EventMetaProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex items-center gap-2 text-white/90">
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span className="text-base sm:text-lg">{date}</span>
      </div>
      <div className="flex items-center gap-2 text-white/90">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span className="text-base sm:text-lg">{time}</span>
      </div>
      <div className="flex items-start gap-2 text-white/90">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
        <span className="text-base sm:text-lg break-words">{location}</span>
      </div>
      <div className="flex items-center gap-2 text-white/90">
        <Users className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span className="text-base sm:text-lg">
          {spotsLeft}/{totalSpots} spots left
        </span>
      </div>
      <div className="flex items-center gap-2 text-white/90">
        <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 shrink-0" />
        <span className="text-base sm:text-lg">Hosted by {hostName}</span>
      </div>
    </div>
  );
}
