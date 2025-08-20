"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [vibeInput, setVibeInput] = useState("")

  const handleCreateTrip = () => {
    if (vibeInput.trim()) {
      // Navigate to planner with the vibe input
      console.log("Creating trip with vibe:", vibeInput)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-accent/10">
          {/* Placeholder for background video */}
          <div className="w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-30" />
        </div>
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Your Journey, Reimagined.
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Stop planning, start experiencing. Our AI crafts unique travel itineraries based on your personal vibe.
        </p>

        {/* CTA Input Section */}
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 p-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border shadow-lg">
            <Input
              type="text"
              placeholder="Describe your perfect getaway..."
              value={vibeInput}
              onChange={(e) => setVibeInput(e.target.value)}
              className="flex-1 text-base border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-muted-foreground"
              onKeyPress={(e) => e.key === "Enter" && handleCreateTrip()}
            />
            <Button onClick={handleCreateTrip} size="lg" className="whitespace-nowrap font-semibold">
              Create My Trip
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
