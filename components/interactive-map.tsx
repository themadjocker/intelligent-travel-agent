"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import type { Activity } from "@/lib/types"

interface InteractiveMapProps {
  activities: Activity[]
  selectedActivity: Activity | null
  onActivityClick: (activity: Activity) => void
}

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

export function InteractiveMap({ activities, selectedActivity, onActivityClick }: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [isMapReady, setIsMapReady] = useState(false)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    setIsClient(true)
    const timer = setTimeout(() => {
      setIsMapReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isClient || !isMapReady) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading interactive map...</p>
        </div>
      </div>
    )
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No activities to display on map</p>
        </div>
      </div>
    )
  }

  // Calculate center point from all activities
  const centerLat = activities.reduce((sum, activity) => sum + activity.location.coordinates.lat, 0) / activities.length
  const centerLng = activities.reduce((sum, activity) => sum + activity.location.coordinates.lng, 0) / activities.length

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        ref={mapRef}
        center={[centerLat, centerLng]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        key={`map-${activities.length}-${centerLat}-${centerLng}`}
        whenReady={() => {
          console.log("[v0] Map is ready and initialized")
        }}
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
              click: () => {
                console.log("[v0] Marker clicked:", activity.name)
                onActivityClick(activity)
              },
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
