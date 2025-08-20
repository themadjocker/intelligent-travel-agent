"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, ArrowLeft, Share, Settings } from "lucide-react"

interface PlannerHeaderProps {
  tripId: string
}

export function PlannerHeader({ tripId }: PlannerHeaderProps) {
  const [trip] = useState({
    title: "Tokyo Adventure",
    collaborators: [
      { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 2, name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 3, name: "Maria Garcia", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  })

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-lg font-semibold text-foreground">{trip.title}</h1>
              <Badge variant="secondary" className="text-xs">
                Planning
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Collaborators */}
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {trip.collaborators.slice(0, 4).map((collaborator) => (
                  <Avatar key={collaborator.id} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                    <AvatarFallback className="text-xs">
                      {collaborator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* AI Re-router Button */}
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-semibold">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Re-router
            </Button>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
