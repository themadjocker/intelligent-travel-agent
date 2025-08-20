"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { CalendarDays, MapPin, Users, ArrowLeft, Map, Clock } from "lucide-react"

interface PlannerPageProps {
  params: {
    tripId: string
  }
}

export default function PlannerPage({ params }: PlannerPageProps) {
  const router = useRouter()

  const tripDestination = params.tripId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <MapPin className="h-8 w-8 text-primary" />
              {tripDestination}
            </h1>
            <Badge variant="secondary">Planning</Badge>
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>March 15-25, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>2 travelers</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interactive Map Section */}
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Interactive Map
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border-2 border-dashed border-primary/20">
                <div className="text-center">
                  <Map className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map Coming Soon</h3>
                  <p className="text-muted-foreground">Explore your destinations with our interactive map feature</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day-by-Day Timeline */}
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Day-by-Day Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto">
              <div className="space-y-4">
                {/* Placeholder Timeline Items */}
                {[1, 2, 3, 4, 5].map((day) => (
                  <div key={day} className="border-l-2 border-primary/20 pl-4 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-primary rounded-full -ml-6 border-2 border-background" />
                      <h4 className="font-semibold">Day {day}</h4>
                      <Badge variant="outline" className="text-xs">
                        March {14 + day}
                      </Badge>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 border-2 border-dashed border-muted-foreground/20">
                      <p className="text-muted-foreground text-center">
                        Detailed itinerary for Day {day} will appear here
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button size="lg">
            <Users className="mr-2 h-4 w-4" />
            Invite Collaborators
          </Button>
          <Button variant="outline" size="lg">
            <MapPin className="mr-2 h-4 w-4" />
            Add Destinations
          </Button>
          <Button variant="outline" size="lg">
            <CalendarDays className="mr-2 h-4 w-4" />
            Adjust Dates
          </Button>
        </div>
      </main>
    </div>
  )
}
