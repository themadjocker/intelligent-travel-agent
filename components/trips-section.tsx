"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CalendarDays, MapPin, Users, ChevronDown, ChevronUp, Compass } from "lucide-react"

const upcomingTrips = [
  {
    id: "tokyo-japan",
    destination: "Tokyo, Japan",
    dates: "March 15-25, 2025",
    status: "Planning",
    collaborators: [
      { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Maria Garcia", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "barcelona-spain",
    destination: "Barcelona, Spain",
    dates: "June 8-15, 2025",
    status: "Confirmed",
    collaborators: [{ name: "John Smith", avatar: "/placeholder.svg?height=32&width=32" }],
    image: "/placeholder.svg?height=200&width=300",
  },
]

const pastTrips = [
  {
    id: "bali-indonesia",
    destination: "Bali, Indonesia",
    dates: "December 10-20, 2024",
    status: "Completed",
    collaborators: [
      { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "David Lee", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "paris-france",
    destination: "Paris, France",
    dates: "September 5-12, 2024",
    status: "Completed",
    collaborators: [],
    image: "/placeholder.svg?height=200&width=300",
  },
]

const demoUpcomingTrips: typeof upcomingTrips = []

export function TripsSection() {
  const [isPastTripsOpen, setIsPastTripsOpen] = useState(false)

  const TripCard = ({ trip }: { trip: (typeof upcomingTrips)[0] }) => (
    <Link href={`/planner/${trip.id}`}>
      <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          <img
            src={trip.image || "/placeholder.svg"}
            alt={trip.destination}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 z-20">
            <Badge
              variant={trip.status === "Confirmed" ? "default" : trip.status === "Planning" ? "secondary" : "outline"}
              className="bg-background/90 backdrop-blur-sm"
            >
              {trip.status}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 right-3 z-20 text-white">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-1">
              <MapPin className="h-4 w-4" />
              {trip.destination}
            </h3>
            <p className="text-sm opacity-90 flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {trip.dates}
            </p>
          </div>
        </div>
        <CardContent className="p-4">
          {trip.collaborators.length > 0 && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="flex -space-x-2">
                {trip.collaborators.slice(0, 3).map((collaborator, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-background">
                    <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                    <AvatarFallback className="text-xs">
                      {collaborator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {trip.collaborators.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">+{trip.collaborators.length - 3}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <div className="space-y-8">
      {/* Upcoming Trips */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Upcoming Trips</h2>
        </div>

        {demoUpcomingTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoUpcomingTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-dashed border-2 border-primary/20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Your adventures are waiting!</h3>
              <p className="text-muted-foreground mb-6">
                Ready to explore the world? Let our AI create the perfect itinerary tailored just for you.
              </p>
              <Button size="lg" asChild>
                <Link href="/planner/new">
                  <Compass className="mr-2 h-4 w-4" />
                  Plan Your First Trip
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Past Trips */}
      <Collapsible open={isPastTripsOpen} onOpenChange={setIsPastTripsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto hover:bg-transparent">
            <h2 className="text-2xl font-bold text-foreground">Past Adventures</h2>
            {isPastTripsOpen ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
