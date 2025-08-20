"use client"

import { MapView } from "@/components/map-view"
import { ItineraryTimeline } from "@/components/itinerary-timeline"

interface PlannerLayoutProps {
  tripId: string
}

export function PlannerLayout({ tripId }: PlannerLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Map Column - 70% width */}
      <div className="flex-1 lg:w-[70%]">
        <MapView tripId={tripId} />
      </div>

      {/* Timeline Column - 30% width */}
      <div className="w-full lg:w-[30%] border-l border-border bg-card">
        <ItineraryTimeline tripId={tripId} />
      </div>
    </div>
  )
}
