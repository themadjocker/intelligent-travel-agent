import { DashboardHeader } from "@/components/dashboard-header"
import { TripPlanningCTA } from "@/components/trip-planning-cta"
import { TripsSection } from "@/components/trips-section"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <TripPlanningCTA />
          <TripsSection />
        </div>
      </main>
    </div>
  )
}
