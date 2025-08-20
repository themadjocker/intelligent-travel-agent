"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { CalendarDays, MapPin, Users, ArrowLeft, Map, Clock, Plus, Save } from "lucide-react"
import { mockTripData } from "@/lib/mock-data"
import type { Trip, Activity, Collaborator } from "@/lib/types"
import { InteractiveMap } from "@/components/interactive-map"
import { AddDestinationModal } from "@/components/add-destination-modal"
import { AdjustDatesModal } from "@/components/adjust-dates-modal"
import { InviteCollaboratorsModal } from "@/components/invite-collaborators-modal"
import { ActivityCard } from "@/components/activity-card"
import { Toast } from "@/components/toast"

interface PlannerPageProps {
  params: {
    tripId: string
  }
}

export default function PlannerPage({ params }: PlannerPageProps) {
  const router = useRouter()
  const [trip, setTrip] = useState<Trip>(mockTripData)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDatesModal, setShowDatesModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const tripTitle = params.tripId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  useEffect(() => {
    setTrip((prev) => ({ ...prev, title: tripTitle }))
  }, [tripTitle])

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity)
    // Scroll to activity in timeline if needed
    const element = document.getElementById(`activity-${activity.id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const handleAddActivity = (dayId: string, newActivity: Omit<Activity, "id">) => {
    const activity: Activity = {
      ...newActivity,
      id: `activity-${Date.now()}`,
    }

    setTrip((prev) => ({
      ...prev,
      days: prev.days.map((day) => (day.id === dayId ? { ...day, activities: [...day.activities, activity] } : day)),
    }))
    setHasChanges(true)
    setShowAddModal(false)
    showToast("Activity added successfully!", "success")
  }

  const handleDateChange = (startDate: string, endDate: string) => {
    setTrip((prev) => ({ ...prev, startDate, endDate }))
    setHasChanges(true)
    setShowDatesModal(false)
    showToast("Trip dates updated!", "success")
  }

  const handleInviteCollaborator = (email: string, name: string) => {
    const newCollaborator: Collaborator = {
      id: `collaborator-${Date.now()}`,
      name,
      email,
      avatar: "/placeholder.svg?height=40&width=40",
      role: "editor",
    }

    setTrip((prev) => ({
      ...prev,
      collaborators: [...prev.collaborators, newCollaborator],
    }))
    setHasChanges(true)
    setShowInviteModal(false)
    showToast(`Invitation sent to ${name}!`, "success")
  }

  const handleSaveTrip = () => {
    // Mock save operation
    setHasChanges(false)
    showToast("Trip saved successfully!", "success")
  }

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="flex items-center gap-4">
              {hasChanges && (
                <Button onClick={handleSaveTrip} size="sm" className="bg-green-600 hover:bg-green-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Trip
                </Button>
              )}
              <Button variant="ghost" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
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
              {trip.title}
            </h1>
            <Badge variant="secondary" className="capitalize">
              {trip.status}
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{trip.collaborators.length} travelers</span>
            </div>
            <div className="flex -space-x-2">
              {trip.collaborators.map((collaborator) => (
                <img
                  key={collaborator.id}
                  src={collaborator.avatar || "/placeholder.svg"}
                  alt={collaborator.name}
                  className="w-8 h-8 rounded-full border-2 border-background hover:scale-110 transition-transform cursor-pointer"
                  title={`${collaborator.name} (${collaborator.role})`}
                />
              ))}
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
            <CardContent className="h-full p-0">
              <InteractiveMap
                activities={trip.days.flatMap((day) => day.activities)}
                selectedActivity={selectedActivity}
                onActivityClick={handleActivityClick}
              />
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
              <div className="space-y-6">
                {trip.days.map((day, dayIndex) => (
                  <div key={day.id} className="border-l-2 border-primary/20 pl-4 pb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-primary rounded-full -ml-6 border-2 border-background" />
                      <h4 className="font-semibold text-lg">Day {dayIndex + 1}</h4>
                      <Badge variant="outline" className="text-xs">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {day.activities.map((activity) => (
                        <ActivityCard
                          key={activity.id}
                          activity={activity}
                          isSelected={selectedActivity?.id === activity.id}
                          onClick={() => handleActivityClick(activity)}
                        />
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-dashed bg-transparent hover:bg-primary/5"
                        onClick={() => setShowAddModal(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Activity
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={() => setShowInviteModal(true)} className="hover:scale-105 transition-transform">
            <Users className="mr-2 h-4 w-4" />
            Invite Collaborators
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAddModal(true)}
            className="hover:scale-105 transition-transform"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Add Destinations
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowDatesModal(true)}
            className="hover:scale-105 transition-transform"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Adjust Dates
          </Button>
        </div>
      </main>

      {/* Modals */}
      <AddDestinationModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(dayId, activity) => handleAddActivity(dayId, activity)}
        days={trip.days}
      />

      <AdjustDatesModal
        isOpen={showDatesModal}
        onClose={() => setShowDatesModal(false)}
        currentStartDate={trip.startDate}
        currentEndDate={trip.endDate}
        onSave={handleDateChange}
      />

      <InviteCollaboratorsModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInviteCollaborator}
        existingCollaborators={trip.collaborators}
      />

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
