"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, MapPin, Calendar, Users } from "lucide-react"

export function TripPlanningCTA() {
  const [user] = useState({ name: "Sarah" })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground mt-2">Ready to plan your next adventure?</p>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/5 border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Plan a New Trip
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md">
                Let our AI create the perfect itinerary based on your vibe. Just describe your dream getaway and we'll
                handle the rest.
              </p>
              <Button size="lg" className="font-semibold">
                <Sparkles className="mr-2 h-4 w-4" />
                Start Planning
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Smart Destinations</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Perfect Timing</p>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Group Planning</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
