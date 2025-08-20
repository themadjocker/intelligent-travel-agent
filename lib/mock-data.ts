import type { Trip } from "./types"

export const mockTripData: Trip = {
  id: "trip-tokyo-2024",
  title: "Tokyo Adventure",
  destination: "Tokyo, Japan",
  startDate: "2024-03-15",
  endDate: "2024-03-18",
  coverImage: "/placeholder.svg?height=400&width=800",
  description:
    "An exciting 4-day journey through the vibrant streets of Tokyo, exploring traditional temples, modern districts, and incredible cuisine.",
  budget: 2500,
  status: "planning",
  collaborators: [
    {
      id: "user-1",
      name: "Alex Chen",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "owner",
    },
    {
      id: "user-2",
      name: "Sarah Kim",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "editor",
    },
  ],
  days: [
    {
      id: "day-1",
      date: "2024-03-15",
      activities: [
        {
          id: "activity-1",
          name: "Arrive at Haneda Airport",
          description: "Land in Tokyo and take the monorail to the city center",
          location: {
            name: "Haneda Airport",
            coordinates: { lat: 35.5494, lng: 139.7798 },
          },
          time: "14:30",
          duration: "2 hours",
          category: "transport",
          notes: "Flight JAL 123 - remember to get JR Pass at airport",
        },
        {
          id: "activity-2",
          name: "Check into Hotel",
          description: "Hotel Gracery Shinjuku - iconic Godzilla head view",
          location: {
            name: "Hotel Gracery Shinjuku",
            coordinates: { lat: 35.6938, lng: 139.7034 },
          },
          time: "17:00",
          duration: "1 hour",
          category: "accommodation",
        },
        {
          id: "activity-3",
          name: "Dinner in Shinjuku",
          description: "Explore the neon-lit streets and try authentic ramen",
          location: {
            name: "Shinjuku District",
            coordinates: { lat: 35.6896, lng: 139.7006 },
          },
          time: "19:00",
          duration: "2 hours",
          category: "food",
          comments: [
            {
              id: "comment-1",
              author: "Sarah Kim",
              content: "I heard Ichiran Ramen is amazing here!",
              timestamp: "2024-03-10T10:30:00Z",
            },
          ],
        },
      ],
    },
    {
      id: "day-2",
      date: "2024-03-16",
      activities: [
        {
          id: "activity-4",
          name: "Visit Senso-ji Temple",
          description: "Tokyo's oldest temple in historic Asakusa district",
          location: {
            name: "Senso-ji Temple",
            coordinates: { lat: 35.7148, lng: 139.7967 },
          },
          time: "09:00",
          duration: "2 hours",
          category: "sightseeing",
        },
        {
          id: "activity-5",
          name: "Tokyo Skytree",
          description: "Panoramic views from Tokyo's tallest structure",
          location: {
            name: "Tokyo Skytree",
            coordinates: { lat: 35.7101, lng: 139.8107 },
          },
          time: "12:00",
          duration: "2 hours",
          category: "sightseeing",
        },
        {
          id: "activity-6",
          name: "Shibuya Crossing",
          description: "Experience the world's busiest pedestrian crossing",
          location: {
            name: "Shibuya Crossing",
            coordinates: { lat: 35.6598, lng: 139.7006 },
          },
          time: "16:00",
          duration: "1 hour",
          category: "sightseeing",
        },
        {
          id: "activity-7",
          name: "Karaoke Night",
          description: "Private karaoke room in Shibuya",
          location: {
            name: "Big Echo Shibuya",
            coordinates: { lat: 35.658, lng: 139.7016 },
          },
          time: "20:00",
          duration: "3 hours",
          category: "entertainment",
        },
      ],
    },
    {
      id: "day-3",
      date: "2024-03-17",
      activities: [
        {
          id: "activity-8",
          name: "Tsukiji Outer Market",
          description: "Fresh sushi breakfast and market exploration",
          location: {
            name: "Tsukiji Outer Market",
            coordinates: { lat: 35.6654, lng: 139.7707 },
          },
          time: "07:00",
          duration: "2 hours",
          category: "food",
        },
        {
          id: "activity-9",
          name: "Imperial Palace Gardens",
          description: "Peaceful gardens in the heart of Tokyo",
          location: {
            name: "East Gardens of the Imperial Palace",
            coordinates: { lat: 35.6852, lng: 139.7594 },
          },
          time: "10:00",
          duration: "2 hours",
          category: "sightseeing",
        },
        {
          id: "activity-10",
          name: "Harajuku & Takeshita Street",
          description: "Youth culture and quirky fashion district",
          location: {
            name: "Takeshita Street",
            coordinates: { lat: 35.6702, lng: 139.7063 },
          },
          time: "14:00",
          duration: "3 hours",
          category: "sightseeing",
        },
      ],
    },
    {
      id: "day-4",
      date: "2024-03-18",
      activities: [
        {
          id: "activity-11",
          name: "Last-minute Shopping",
          description: "Souvenir shopping in Ginza district",
          location: {
            name: "Ginza District",
            coordinates: { lat: 35.6762, lng: 139.7653 },
          },
          time: "10:00",
          duration: "2 hours",
          category: "sightseeing",
        },
        {
          id: "activity-12",
          name: "Departure to Haneda",
          description: "Head to airport for evening flight",
          location: {
            name: "Haneda Airport",
            coordinates: { lat: 35.5494, lng: 139.7798 },
          },
          time: "15:00",
          duration: "2 hours",
          category: "transport",
        },
      ],
    },
  ],
}

export const inspirationTags = [
  "Adventure & Outdoor Activities",
  "Cultural Immersion",
  "Food & Culinary Experiences",
  "Relaxation & Wellness",
  "Urban Exploration",
  "Historical Sites",
  "Art & Museums",
  "Nightlife & Entertainment",
  "Nature & Scenic Views",
  "Shopping & Local Markets",
  "Photography Hotspots",
  "Off the Beaten Path",
]
