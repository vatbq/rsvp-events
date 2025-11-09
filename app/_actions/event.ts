"use server";

// Mock server action for fetching event data
export async function getEventData(eventId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id: eventId,
    title: "Friendsgiving",
    date: "Sunday, Nov 23",
    time: "12:45am",
    location: "299 Fremont St. San Francisco CA",
    spotsLeft: 10,
    totalSpots: 25,
    isPrivate: false,
    host: {
      name: "Addison White",
      avatar: "/api/placeholder/40/40",
    },
    description:
      "Gather your favorite people for a night of laughter, too much food, and questionable pumpkin pie decisions. Bring your best dish (or just your best self) — it's Friendsgiving!",
    image: "/api/placeholder/600/400",
    guests: {
      going: 1,
      maybe: 1,
      cantGo: 0,
      invited: 25,
    },
    hasVenmoPitchIn: true,
    venmoHandle: "@addison-white",
    suggestedAmount: 15,
    venmoDescription: "Help cover food and drinks",
  };
}

// Mock server action for fetching announcements
export async function getAnnouncements(eventId: string) {
  await new Promise((resolve) => setTimeout(resolve, 50));

  return [
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
}

// Mock server action for submitting RSVP
export async function submitRSVP(
  eventId: string,
  status: "going" | "maybe" | "cant-go",
) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app, this would save to database
  return {
    success: true,
    status,
    message: `RSVP submitted: ${status}`,
  };
}

// Mock server action for requesting to join private event
export async function requestToJoin(eventId: string, message: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would send notification to host
  return {
    success: true,
    message: "Request submitted successfully",
  };
}
