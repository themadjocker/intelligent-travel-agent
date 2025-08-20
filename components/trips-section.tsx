"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CalendarDays, MapPin, Users, ChevronDown, ChevronUp } from "lucide-react"

const upcomingTrips = [
  {
    id: 1,
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
    id: 2,
    destination: "Barcelona, Spain",
    dates: "June 8-15, 2025",
    status: "Confirmed",
    collaborators: [{ name: "John Smith", avatar: "/placeholder.svg?height=32&width=32" }],
    image: "/placeholder.svg?height=200&width=300",
  },
]

const pastTrips = [
  {
    id: 3,
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
    id: 4,
    destination: "Paris, France",
    dates: "September 5-12, 2024",
    status: "Completed",
    collaborators: [],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function TripsSection() {
  const [isPastTripsOpen, setIsPastTripsOpen] = useState(false)

  const TripCard = ({ trip }: { trip: (typeof upcomingTrips)[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img
          src={trip.image || "/placeholder.svg"}
          alt={trip.destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant={trip.status === "Confirmed" ? "default" : trip.status === "Planning" ? "secondary" : "outline"}
          >
            {trip.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {trip.destination}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <CalendarDays className="h-4 w-4" />
              {trip.dates}
            </p>
          </div>

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
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Upcoming Trips */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Upcoming Trips</h2>
          {upcomingTrips.length === 0 && <Button variant="outline">Browse Destinations</Button>}
        </div>

        {upcomingTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="max-w-md mx-auto">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming trips yet</h3>
              <p className="text-muted-foreground mb-4">
                Start planning your next adventure and let our AI create the perfect itinerary for you.
              </p>
              <Button>Plan Your First Trip</Button>
            </div>
          </Card>
        )}
      </div>

      {/* Past Trips */}
      <Collapsible open={isPastTripsOpen} onOpenChange={setIsPastTripsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
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
