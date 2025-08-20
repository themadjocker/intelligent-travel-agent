"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Clock, MapPin, ChevronDown, ChevronUp, GripVertical, Star, DollarSign, Users, Camera } from "lucide-react"

interface ItineraryTimelineProps {
  tripId: string
}

interface Activity {
  id: number
  title: string
  location: string
  time: string
  duration: string
  type: "attraction" | "food" | "transport" | "accommodation"
  description: string
  rating?: number
  price?: string
  groupSize?: number
  photos?: number
}

interface DayItinerary {
  date: string
  day: number
  activities: Activity[]
}

export function ItineraryTimeline({ tripId }: ItineraryTimelineProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([1])
  const [expandedActivities, setExpandedActivities] = useState<number[]>([])

  const itinerary: DayItinerary[] = [
    {
      date: "March 15, 2025",
      day: 1,
      activities: [
        {
          id: 1,
          title: "Arrive at Haneda Airport",
          location: "Tokyo Haneda Airport",
          time: "14:30",
          duration: "1h",
          type: "transport",
          description: "Flight arrival and customs clearance",
        },
        {
          id: 2,
          title: "Check-in at Hotel",
          location: "Shibuya District",
          time: "16:00",
          duration: "30min",
          type: "accommodation",
          description: "Modern hotel in the heart of Shibuya with city views",
          rating: 4.8,
        },
        {
          id: 3,
          title: "Explore Shibuya Crossing",
          location: "Shibuya Crossing",
          time: "17:00",
          duration: "2h",
          type: "attraction",
          description: "Experience the world's busiest pedestrian crossing and surrounding area",
          rating: 4.9,
          groupSize: 3,
          photos: 15,
        },
        {
          id: 4,
          title: "Dinner at Izakaya",
          location: "Shibuya",
          time: "19:30",
          duration: "1.5h",
          type: "food",
          description: "Traditional Japanese pub experience with local dishes",
          rating: 4.6,
          price: "$$",
        },
      ],
    },
    {
      date: "March 16, 2025",
      day: 2,
      activities: [
        {
          id: 5,
          title: "Visit Senso-ji Temple",
          location: "Asakusa",
          time: "09:00",
          duration: "2h",
          type: "attraction",
          description: "Tokyo's oldest temple with traditional architecture and shopping street",
          rating: 4.7,
          groupSize: 3,
        },
        {
          id: 6,
          title: "Tsukiji Outer Market Food Tour",
          location: "Tsukiji",
          time: "11:30",
          duration: "2.5h",
          type: "food",
          description: "Fresh sushi, street food, and local delicacies",
          rating: 4.8,
          price: "$$$",
        },
      ],
    },
  ]

  const toggleDay = (day: number) => {
    setExpandedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const toggleActivity = (activityId: number) => {
    setExpandedActivities((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId],
    )
  }

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "attraction":
        return <Camera className="h-4 w-4" />
      case "food":
        return <DollarSign className="h-4 w-4" />
      case "transport":
        return <MapPin className="h-4 w-4" />
      case "accommodation":
        return <Users className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "attraction":
        return "bg-accent"
      case "food":
        return "bg-orange-500"
      case "transport":
        return "bg-blue-500"
      case "accommodation":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Itinerary Timeline</h2>
        <p className="text-sm text-muted-foreground">March 15-25, 2025 • Tokyo, Japan</p>
      </div>

      <div className="p-4 space-y-4">
        {itinerary.map((dayData) => (
          <Collapsible
            key={dayData.day}
            open={expandedDays.includes(dayData.day)}
            onOpenChange={() => toggleDay(dayData.day)}
          >
            <CollapsibleTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">Day {dayData.day}</h3>
                      <p className="text-sm text-muted-foreground">{dayData.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{dayData.activities.length} activities</Badge>
                      {expandedDays.includes(dayData.day) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-3 mt-2">
              {dayData.activities.map((activity, index) => (
                <Card key={activity.id} className="ml-4 group hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center text-white`}
                        >
                          {getActivityIcon(activity.type)}
                        </div>
                        {index < dayData.activities.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground text-sm">{activity.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {activity.time}
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{activity.duration}</span>
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {activity.location}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                            >
                              <GripVertical className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleActivity(activity.id)}
                              className="p-1 h-auto"
                            >
                              {expandedActivities.includes(activity.id) ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <Collapsible
                          open={expandedActivities.includes(activity.id)}
                          onOpenChange={() => toggleActivity(activity.id)}
                        >
                          <CollapsibleContent className="mt-3 pt-3 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-3">{activity.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {activity.rating && (
                                <Badge variant="outline" className="text-xs">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  {activity.rating}
                                </Badge>
                              )}
                              {activity.price && (
                                <Badge variant="outline" className="text-xs">
                                  {activity.price}
                                </Badge>
                              )}
                              {activity.groupSize && (
                                <Badge variant="outline" className="text-xs">
                                  <Users className="h-3 w-3 mr-1" />
                                  {activity.groupSize}
                                </Badge>
                              )}
                              {activity.photos && (
                                <Badge variant="outline" className="text-xs">
                                  <Camera className="h-3 w-3 mr-1" />
                                  {activity.photos}
                                </Badge>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
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
  )
}
