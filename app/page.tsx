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
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen text-white relative overflow-hidden">
      <StarryBackground />

      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="https://flairtime-copy.web.app/images/logo_gradient.png"
              alt="Flare"
              width={24}
              height={24}
              className="w-6 h-auto"
            />
            <span className="text-xl font-semibold">Flare</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 hover:bg-white/20 hover:text-white border-white/10 text-white"
          >
            Sign In
          </Button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="mb-6 lg:mb-0">
          <EventHeader title={eventData.title} icon="calendar" />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="order-1 lg:order-1 space-y-6">
            <DesktopEventHeader title={eventData.title} icon="calendar" />

            <div className="lg:hidden relative rounded-2xl overflow-hidden bg-white/5">
              <div className="aspect-[4/3] relative">
                {eventData.image ? (
            <Image
                    src={eventData.image}
                    alt={eventData.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="w-16 h-16 sm:w-20 sm:h-20 text-orange-400 mx-auto mb-4" />
                      <p className="text-white/60 text-sm">Event Image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <EventMeta
              date={eventData.date}
              time={eventData.time}
              location={eventData.location}
              spotsLeft={eventData.spotsLeft}
              totalSpots={eventData.totalSpots}
              hostName={eventData.host.name}
            />

            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              {eventData.description}
            </p>

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

            <Announcements
              isPrivate={eventData.isPrivate}
              announcements={announcements}
            />

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

          <div className="order-2 lg:order-2 space-y-6">
            <div className="hidden lg:block relative rounded-2xl overflow-hidden bg-white/5">
              <div className="aspect-[4/3] relative">
                {eventData.image ? (
                  <Image
                    src={eventData.image}
                    alt={eventData.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <Calendar className="w-20 h-20 text-orange-400 mx-auto mb-4" />
                      <p className="text-white/60 text-sm">Event Image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

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

            {eventData.hasVenmoPitchIn && !eventData.isPrivate && (
              <VenmoPitchIn
                venmoHandle={eventData.venmoHandle}
                suggestedAmount={eventData.suggestedAmount}
                description={eventData.venmoDescription}
              />
            )}

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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-white/60">
              <Image
                src="https://flairtime-copy.web.app/images/logo_gradient.png"
                alt="Flare"
                width={20}
                height={20}
                className="w-5 h-auto"
              />
              <span className="text-xs sm:text-lg">Powered by Flare</span>
            </div>
            <p className="text-white/60 text-xs sm:text-sm max-w-md">
              Tap here to get the full experience with photos, polls,
              announcements, reminders, comments, and more in the app.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-[#F26A4F] hover:bg-[#E55A3F] text-white font-bold w-full sm:w-auto"
          >
            Download Flare App
          </Button>
        </div>
      </main>
    </div>
  );
}
