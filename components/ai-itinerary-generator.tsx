"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Sparkles, MapPin, Clock, ChevronDown, ChevronUp, Loader2 } from "lucide-react"

interface Activity {
  time: string
  title: string
  description: string
  location: string
  duration: string
  type: "sightseeing" | "food" | "transport" | "accommodation"
}

interface DayItinerary {
  day: number
  date: string
  activities: Activity[]
}

export function AIItineraryGenerator() {
  const [destination, setDestination] = useState("")
  const [days, setDays] = useState<number>(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [itinerary, setItinerary] = useState<DayItinerary[]>([])
  const [expandedDays, setExpandedDays] = useState<number[]>([])

  const generateMockItinerary = (destination: string, numDays: number): DayItinerary[] => {
    const activities: Record<string, Activity[]> = {
      tokyo: [
        {
          time: "09:00",
          title: "Visit Senso-ji Temple",
          description: "Explore Tokyo's oldest temple in historic Asakusa district",
          location: "Asakusa, Tokyo",
          duration: "2 hours",
          type: "sightseeing"
        },
        {
          time: "12:00",
          title: "Tsukiji Outer Market Food Tour",
          description: "Sample fresh sushi and local street food",
          location: "Tsukiji, Tokyo",
          duration: "2 hours",
          type: "food"
        },
        {
          time: "15:00",
          title: "Tokyo Skytree Observatory",
          description: "Panoramic views from Tokyo's tallest structure",
          location: "Sumida, Tokyo",
          duration: "1.5 hours",
          type: "sightseeing"
        },
        {
          time: "18:00",
          title: "Shibuya Crossing Experience",
          description: "Experience the world's busiest pedestrian crossing",
          location: "Shibuya, Tokyo",
          duration: "1 hour",
          type: "sightseeing"
        }
      ],
      paris: [
        {
          time: "09:00",
          title: "Eiffel Tower Visit",
          description: "Iconic iron tower with stunning city views",
          location: "Champ de Mars, Paris",
          duration: "2 hours",
          type: "sightseeing"
        },
        {
          time: "12:00",
          title: "Seine River Cruise",
          description: "Scenic boat tour along the Seine",
          location: "Seine River, Paris",
          duration: "1.5 hours",
          type: "sightseeing"
        },
        {
          time: "15:00",
          title: "Louvre Museum",
          description: "World's largest art museum",
          location: "Rue de Rivoli, Paris",
          duration: "3 hours",
          type: "sightseeing"
        },
        {
          time: "19:00",
          title: "French Bistro Dinner",
          description: "Authentic French cuisine experience",
          location: "Latin Quarter, Paris",
          duration: "2 hours",
          type: "food"
        }
      ],
      london: [
        {
          time: "09:00",
          title: "Tower of London",
          description: "Historic castle and Crown Jewels exhibition",
          location: "Tower Hill, London",
          duration: "2.5 hours",
          type: "sightseeing"
        },
        {
          time: "13:00",
          title: "Traditional Pub Lunch",
          description: "Classic British pub experience",
          location: "Borough Market, London",
          duration: "1.5 hours",
          type: "food"
        },
        {
          time: "15:30",
          title: "Westminster Abbey",
          description: "Gothic abbey church with royal history",
          location: "Westminster, London",
          duration: "2 hours",
          type: "sightseeing"
        },
        {
          time: "18:00",
          title: "Thames Evening Walk",
          description: "Scenic walk along the Thames with city views",
          location: "South Bank, London",
          duration: "1 hour",
          type: "sightseeing"
        }
      ]
    }

    const defaultActivities: Activity[] = [
      {
        time: "09:00",
        title: "City Center Exploration",
        description: "Discover the heart of the city and main attractions",
        location: `${destination} City Center`,
        duration: "2 hours",
        type: "sightseeing"
      },
      {
        time: "12:00",
        title: "Local Cuisine Experience",
        description: "Try authentic local dishes and specialties",
        location: `${destination} Restaurant District`,
        duration: "1.5 hours",
        type: "food"
      },
      {
        time: "15:00",
        title: "Cultural Site Visit",
        description: "Explore museums, galleries, or historical landmarks",
        location: `${destination} Cultural District`,
        duration: "2.5 hours",
        type: "sightseeing"
      },
      {
        time: "18:30",
        title: "Evening Entertainment",
        description: "Local nightlife, shows, or evening activities",
        location: `${destination} Entertainment District`,
        duration: "2 hours",
        type: "sightseeing"
      }
    ]

    const cityKey = destination.toLowerCase().replace(/\s+/g, '')
    const selectedActivities = activities[cityKey] || defaultActivities

    const result: DayItinerary[] = []
    const startDate = new Date()

    for (let i = 0; i < numDays; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      
      // Rotate activities for variety across days
      const dayActivities = selectedActivities.map((activity, index) => ({
        ...activity,
        title: `${activity.title} ${i > 0 ? `(Day ${i + 1} Variant)` : ''}`.replace(' (Day 1 Variant)', ''),
      })).slice(0, Math.min(4, selectedActivities.length))

      result.push({
        day: i + 1,
        date: currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        activities: dayActivities
      })
    }

    return result
  }

  const handleGenerate = async () => {
    if (!destination.trim() || days < 1) return

    setIsGenerating(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const generatedItinerary = generateMockItinerary(destination, days)
    setItinerary(generatedItinerary)
    setExpandedDays([1]) // Expand first day by default
    setIsGenerating(false)
  }

  const toggleDay = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  const getActivityTypeColor = (type: Activity["type"]) => {
    switch (type) {
      case "sightseeing": return "bg-blue-100 text-blue-800"
      case "food": return "bg-orange-100 text-orange-800"
      case "transport": return "bg-gray-100 text-gray-800"
      case "accommodation": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Itinerary Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="e.g., Tokyo, Paris, London"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={isGenerating}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="days">Number of Days</Label>
            <Input
              id="days"
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value) || 1)}
              disabled={isGenerating}
            />
          </div>
        </div>

        <Button 
          onClick={handleGenerate}
          disabled={!destination.trim() || days < 1 || isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Your Perfect Itinerary...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Itinerary
            </>
          )}
        </Button>

        {/* Generated Itinerary */}
        {itinerary.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pt-4 border-t">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Your {days}-Day {destination} Itinerary
              </h3>
            </div>

            <div className="space-y-3">
              {itinerary.map((dayData) => (
                <Collapsible
                  key={dayData.day}
                  open={expandedDays.includes(dayData.day)}
                  onOpenChange={() => toggleDay(dayData.day)}
                >
                  <CollapsibleTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">Day {dayData.day}</h4>
                            <p className="text-sm text-muted-foreground">{dayData.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {dayData.activities.length} activities
                            </Badge>
                            {expandedDays.includes(dayData.day) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="space-y-2 mt-2">
                    {dayData.activities.map((activity, index) => (
                      <Card key={index} className="ml-4">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              {index < dayData.activities.length - 1 && (
                                <div className="w-px h-16 bg-border mt-2" />
                              )}
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h5 className="font-medium">{activity.title}</h5>
                                  <p className="text-sm text-muted-foreground">
                                    {activity.description}
                                  </p>
                                </div>
                                <Badge className={getActivityTypeColor(activity.type)}>
                                  {activity.type}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {activity.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {activity.location}
                                </div>
                                <span>Duration: {activity.duration}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}