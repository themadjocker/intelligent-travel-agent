"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Activity, Day } from "@/lib/types"
import { geocode } from "@/lib/geocoder"

interface AddDestinationModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (dayId: string, activity: Omit<Activity, "id">) => void
  days: Day[]
}

export function AddDestinationModal({ isOpen, onClose, onAdd, days }: AddDestinationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    locationName: "",
    lat: "",
    lng: "",
    time: "",
    duration: "",
    category: "sightseeing" as Activity["category"],
    dayId: "",
  })

  const [isGeocoding, setIsGeocoding] = useState(false)

  const handleLocationChange = async (locationName: string) => {
    setFormData((prev) => ({ ...prev, locationName }))

    if (locationName.trim().length > 2) {
      setIsGeocoding(true)
      const coordinates = await geocode(locationName)
      if (coordinates) {
        setFormData((prev) => ({
          ...prev,
          lat: coordinates.lat.toString(),
          lng: coordinates.lng.toString(),
        }))
      }
      setIsGeocoding(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.dayId || !formData.name || !formData.locationName) return

    const newActivity: Omit<Activity, "id"> = {
      name: formData.name,
      description: formData.description,
      location: {
        name: formData.locationName,
        coordinates: {
          lat: Number.parseFloat(formData.lat) || 35.6762,
          lng: Number.parseFloat(formData.lng) || 139.6503,
        },
      },
      time: formData.time,
      duration: formData.duration,
      category: formData.category,
    }

    onAdd(formData.dayId, newActivity)

    // Reset form
    setFormData({
      name: "",
      description: "",
      locationName: "",
      lat: "",
      lng: "",
      time: "",
      duration: "",
      category: "sightseeing",
      dayId: "",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="day">Select Day</Label>
            <Select
              value={formData.dayId}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, dayId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day, index) => (
                  <SelectItem key={day.id} value={day.id}>
                    Day {index + 1} - {new Date(day.date).toLocaleDateString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">Activity Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Visit Tokyo Tower"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the activity"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="location">Location Name</Label>
            <div className="relative">
              <Input
                id="location"
                value={formData.locationName}
                onChange={(e) => handleLocationChange(e.target.value)}
                placeholder="e.g., Tokyo Tower"
                required
              />
              {isGeocoding && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            {formData.lat && formData.lng && (
              <p className="text-xs text-muted-foreground mt-1">
                Coordinates: {Number.parseFloat(formData.lat).toFixed(4)}, {Number.parseFloat(formData.lng).toFixed(4)}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 2 hours"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value: Activity["category"]) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sightseeing">Sightseeing</SelectItem>
                <SelectItem value="food">Food & Dining</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="accommodation">Accommodation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Activity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
