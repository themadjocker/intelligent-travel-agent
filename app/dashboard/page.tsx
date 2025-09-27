"use client"

import { useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TripPlanningCTA } from "@/components/trip-planning-cta"
import { TripsSection } from "@/components/trips-section"
import { createClient } from "@/lib/supabase-client"

export default function DashboardPage() {
  useEffect(() => {
    const verifySupabaseConnection = async () => {
      console.log("🔍 Verifying Supabase connection...")
      
      try {
        const supabase = createClient()
        
        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        console.log("👤 Auth check - User:", user)
        console.log("👤 Auth check - Error:", authError)
        
        // Perform a simple data query
        const { data, error } = await supabase.from('trips').select('id').limit(1)
        console.log("📊 Data query - Data:", data)
        console.log("📊 Data query - Error:", error)
        
        console.log("✅ Supabase verification complete")
      } catch (error) {
        console.error("❌ Supabase verification failed:", error)
      }
    }
    
    verifySupabaseConnection()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <TripPlanningCTA />
          <AIItineraryGenerator />
          <TripsSection />
        </div>
      </main>
    </div>
  )
}
