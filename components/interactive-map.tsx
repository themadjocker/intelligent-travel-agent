"use client"

import { useEffect, useState } from "react"
import type { Activity } from "@/lib/types"

interface InteractiveMapProps {
  activities: Activity[]
  selectedActivity: Activity | null
  onActivityClick: (activity: Activity) => void
}

export function InteractiveMap({ activities, selectedActivity, onActivityClick }: InteractiveMapProps) {
  const [Map, setMap] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      import("react-leaflet").then((leaflet) => {
        setMap(leaflet)
      })
    }
  }, [isClient])

  if (!isClient || !Map) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading interactive map...</p>
        </div>
      </div>
    )
  }

  const { MapContainer, TileLayer, Marker, Popup } = Map

  // Calculate center point from all activities
  const centerLat = activities.reduce((sum, activity) => sum + activity.location.coordinates.lat, 0) / activities.length
  const centerLng = activities.reduce((sum, activity) => sum + activity.location.coordinates.lng, 0) / activities.length

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        key={`${centerLat}-${centerLng}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {activities.map((activity) => (
          <Marker
            key={activity.id}
            position={[activity.location.coordinates.lat, activity.location.coordinates.lng]}
            eventHandlers={{
              click: () => onActivityClick(activity),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm">{activity.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {activity.time} • {activity.duration}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
