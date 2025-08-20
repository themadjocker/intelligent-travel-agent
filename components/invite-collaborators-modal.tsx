"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Mail, UserPlus } from "lucide-react"
import type { Collaborator } from "@/lib/types"

interface InviteCollaboratorsModalProps {
  isOpen: boolean
  onClose: () => void
  onInvite: (email: string, name: string) => void
  existingCollaborators: Collaborator[]
}

export function InviteCollaboratorsModal({
  isOpen,
  onClose,
  onInvite,
  existingCollaborators,
}: InviteCollaboratorsModalProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !name.trim()) return

    // Check if collaborator already exists
    const exists = existingCollaborators.some(
      (collaborator) => collaborator.email.toLowerCase() === email.toLowerCase(),
    )
    if (exists) {
      alert("This person is already a collaborator on this trip.")
      return
    }

    setIsLoading(true)

    // Simulate sending invitation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onInvite(email, name)

    // Reset form
    setEmail("")
    setName("")
    setIsLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Invite Collaborators
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Collaborators */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Current Collaborators</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {existingCollaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                  <img
                    src={collaborator.avatar || "/placeholder.svg"}
                    alt={collaborator.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{collaborator.name}</p>
                    <p className="text-xs text-muted-foreground">{collaborator.email}</p>
                  </div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {collaborator.role}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="inviteName">Full Name</Label>
              <Input
                id="inviteName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Smith"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="inviteEmail">Email Address</Label>
              <Input
                id="inviteEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., john@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">Email Invitation</p>
                  <p className="text-blue-700 mt-1">
                    They'll receive an email invitation to collaborate on this trip with editor permissions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading || !email.trim() || !name.trim()}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Invitation
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
