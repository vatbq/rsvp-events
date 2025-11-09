import { EventHeader, RSVPSection } from "@/components/EventHeader";
import { DesktopEventHeader } from "@/components/DesktopEventHeader";
import { StarryBackground } from "@/components/StarryBackground";
import { EventMeta } from "@/components/EventMeta";
import { GuestList } from "@/components/GuestList";
import { Announcements } from "@/components/Announcements";
import { AppOnlyFeature } from "@/components/AppOnlyFeature";
import { VenmoPitchIn } from "@/components/VenmoPitchIn";
import { RequestToJoin } from "@/components/RequestToJoin";
import { getEventData, getAnnouncements } from "@/app/_actions/event";
import { Calendar } from "lucide-react";

interface EventRSVPPageProps {
  searchParams: { id?: string };
}

export default async function EventRSVPPage({
  searchParams,
}: EventRSVPPageProps) {
  const eventId = searchParams.id || "friendsgiving-2024";

  const eventData = await getEventData(eventId);
  const announcements = await getAnnouncements(eventId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] text-white relative overflow-hidden">
      {/* Starry background effect */}
      <StarryBackground />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">F</span>
            </div>
            <span className="text-xl font-semibold">Flare</span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Event Title - Always first on mobile */}
        <div className="mb-6 lg:mb-0">
          <EventHeader title={eventData.title} icon="calendar" />
        </div>

        {/* Mobile-first: Single column layout, reordered for better UX */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Column - Event Details (Desktop) / First on Mobile */}
          <div className="order-1 lg:order-1 space-y-6">
            {/* Event Title & Copy Link - Desktop only */}
            <DesktopEventHeader title={eventData.title} icon="calendar" />

            {/* Event Image - Mobile: Show first after title */}
            <div className="lg:hidden relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-16 h-16 sm:w-20 sm:h-20 text-orange-400 mx-auto mb-4" />
                  <p className="text-white/60 text-sm">Event Image</p>
                </div>
              </div>
            </div>

            {/* Event Meta */}
            <EventMeta
              date={eventData.date}
              time={eventData.time}
              location={eventData.location}
              spotsLeft={eventData.spotsLeft}
              totalSpots={eventData.totalSpots}
              hostName={eventData.host.name}
            />

            {/* Description */}
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              {eventData.description}
            </p>

            {/* RSVP Section - Mobile: Show after event details */}
            <div className="lg:hidden">
              {eventData.isPrivate ? (
                <RequestToJoin
                  isPrivate={eventData.isPrivate}
                  hostName={eventData.host.name}
                  eventId={eventId}
                />
              ) : (
                <RSVPSection
                  eventId={eventId}
                  isPrivate={eventData.isPrivate}
                  hostName={eventData.host.name}
                />
              )}
            </div>

            {/* Guest List - Mobile: Show after RSVP */}
            <div className="lg:hidden">
              <GuestList
                going={eventData.guests.going}
                maybe={eventData.guests.maybe}
                cantGo={eventData.guests.cantGo}
                invited={eventData.guests.invited}
                spotsLeft={eventData.spotsLeft}
                totalSpots={eventData.totalSpots}
              />
            </div>

            {/* Announcements */}
            <Announcements
              isPrivate={eventData.isPrivate}
              announcements={announcements}
            />

            {/* Guest List - Desktop: Show in left column */}
            <div className="hidden lg:block">
              <GuestList
                going={eventData.guests.going}
                maybe={eventData.guests.maybe}
                cantGo={eventData.guests.cantGo}
                invited={eventData.guests.invited}
                spotsLeft={eventData.spotsLeft}
                totalSpots={eventData.totalSpots}
              />
            </div>
          </div>

          {/* Right Column - Image & RSVP (Desktop) */}
          <div className="order-2 lg:order-2 space-y-6">
            {/* Event Image - Desktop only */}
            <div className="hidden lg:block relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-20 h-20 text-orange-400 mx-auto mb-4" />
                  <p className="text-white/60 text-sm">Event Image</p>
                </div>
              </div>
            </div>

            {/* RSVP Section - Desktop only */}
            <div className="hidden lg:block">
              {eventData.isPrivate ? (
                <RequestToJoin
                  isPrivate={eventData.isPrivate}
                  hostName={eventData.host.name}
                  eventId={eventId}
                />
              ) : (
                <RSVPSection
                  eventId={eventId}
                  isPrivate={eventData.isPrivate}
                  hostName={eventData.host.name}
                />
              )}
            </div>

            {/* Venmo Pitch In */}
            {eventData.hasVenmoPitchIn && !eventData.isPrivate && (
              <VenmoPitchIn
                venmoHandle={eventData.venmoHandle}
                suggestedAmount={eventData.suggestedAmount}
                description={eventData.venmoDescription}
              />
            )}

            {/* App-Only Features */}
            <div className="space-y-3 sm:space-y-4">
              <AppOnlyFeature
                title="Photos & Videos"
                description="View and share photos from the event"
                icon="camera"
                benefit="See all event photos instantly"
              />
              <AppOnlyFeature
                title="Real-time Announcements"
                description="Get instant push notifications for updates"
                icon="bell"
                benefit="Never miss an update"
              />
              <AppOnlyFeature
                title="Comments & Discussion"
                description="Chat with other guests before and after"
                icon="messageCircle"
                benefit="Connect with attendees"
              />
              <AppOnlyFeature
                title="Polls & Voting"
                description="Vote on event details and preferences"
                icon="barChart"
                benefit="Have your voice heard"
              />
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">F</span>
              </div>
              <span className="text-xs sm:text-lg">Powered by Flare</span>
            </div>
            <p className="text-white/60 text-xs sm:text-sm max-w-md">
              Tap here to get the full experience with photos, polls,
              announcements, reminders, comments, and more in the app.
            </p>
          </div>
          <button className="px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-[#F26A4F] hover:bg-[#E55A3F] transition-colors text-white font-bold text-sm sm:text-base">
            Download Flare App
          </button>
        </div>
      </main>
    </div>
  );
}
