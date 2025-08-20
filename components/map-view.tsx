"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, ZoomIn, ZoomOut, Layers, Navigation } from "lucide-react"

interface MapViewProps {
  tripId: string
}

export function MapView({ tripId }: MapViewProps) {
  const [selectedPin, setSelectedPin] = useState<number | null>(null)

  // Mock data for map pins
  const mapPins = [
    { id: 1, name: "Tokyo Station", type: "transport", lat: 35.6812, lng: 139.7671 },
    { id: 2, name: "Senso-ji Temple", type: "attraction", lat: 35.7148, lng: 139.7967 },
    { id: 3, name: "Tsukiji Outer Market", type: "food", lat: 35.6654, lng: 139.7707 },
    { id: 4, name: "Shibuya Crossing", type: "attraction", lat: 35.6598, lng: 139.7006 },
  ]

  return (
    <div className="relative h-full">
      {/* Map Placeholder */}
      <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/10 relative overflow-hidden">
        {/* Placeholder map background */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-20" />

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
            <Navigation className="h-4 w-4" />
          </Button>
        </div>

        {/* Map Pins */}
        {mapPins.map((pin, index) => (
          <div
            key={pin.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + index * 10}%`,
            }}
            onClick={() => setSelectedPin(pin.id)}
          >
            <div
              className={`w-8 h-8 rounded-full border-2 border-background shadow-lg flex items-center justify-center transition-all ${
                selectedPin === pin.id
                  ? "bg-primary scale-110"
                  : pin.type === "attraction"
                    ? "bg-accent"
                    : pin.type === "food"
                      ? "bg-orange-500"
                      : "bg-blue-500"
              }`}
            >
              <MapPin className="h-4 w-4 text-white" />
            </div>
            {selectedPin === pin.id && (
              <Card className="absolute top-10 left-1/2 transform -translate-x-1/2 w-48 z-10">
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm">{pin.name}</h4>
                  <p className="text-xs text-muted-foreground capitalize">{pin.type}</p>
                </CardContent>
              </Card>
            )}
          </div>
        ))}

        {/* Map Legend */}
        <Card className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm">
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs">Attractions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-xs">Food & Dining</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs">Transportation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
