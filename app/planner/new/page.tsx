"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { Sparkles, MapPin, Calendar, Users, ArrowRight, Wand2 } from "lucide-react"
import { inspirationTags } from "@/lib/mock-data"

const vibeExamples = [
  "Relaxing beach getaway with sunset dinners",
  "Adventure-packed mountain hiking trip",
  "Cultural city exploration with local cuisine",
  "Romantic weekend with cozy cafes",
  "Family-friendly theme park adventure",
  "Solo backpacking through historic towns",
]

const loadingMessages = [
  "Analyzing your travel preferences...",
  "Finding the perfect destinations...",
  "Curating unique experiences...",
  "Optimizing your itinerary...",
  "Adding local hidden gems...",
  "Finalizing your dream trip...",
]

export default function NewPlannerPage() {
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState("")
  const router = useRouter()

  const handleGenerate = async () => {
    if (!description.trim()) return

    setIsGenerating(true)

    // Cycle through loading messages
    let messageIndex = 0
    setCurrentLoadingMessage(loadingMessages[0])

    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length
      setCurrentLoadingMessage(loadingMessages[messageIndex])
    }, 800)

    // Simulate AI processing for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000))

    clearInterval(messageInterval)

    // Generate a trip ID based on the description
    const tripId = description
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 30)

    router.push(`/planner/${tripId}`)
  }

  const handleExampleClick = (example: string) => {
    setDescription(example)
  }

  const handleTagClick = (tag: string) => {
    const isSelected = selectedTags.includes(tag)

    if (isSelected) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
      // Remove tag from description if it exists
      const tagText = tag.toLowerCase()
      const currentDesc = description.toLowerCase()
      if (currentDesc.includes(tagText)) {
        const newDesc = description.replace(new RegExp(tag, "gi"), "").replace(/\s+/g, " ").trim()
        setDescription(newDesc)
      }
    } else {
      setSelectedTags([...selectedTags, tag])
      // Add tag to description
      const addition = description.trim() ? `, ${tag.toLowerCase()}` : tag.toLowerCase()
      setDescription(description + addition)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {isGenerating && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Creating Your Perfect Trip</h2>
              <p className="text-lg text-muted-foreground animate-pulse">{currentLoadingMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <Button variant="ghost" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Wand2 className="h-4 w-4" />
            AI Trip Planner
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Describe your perfect getaway...</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your dream trip and our AI will create a personalized itinerary just for you
          </p>
        </div>

        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Choose Your Travel Inspiration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Click on tags that match your travel style. They'll automatically populate your description below.
            </p>
            <div className="flex flex-wrap gap-2">
              {inspirationTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 px-3 py-2 ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "hover:bg-primary/10 hover:border-primary/30 hover:scale-105"
                  }`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              What's your travel vibe?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="I want to explore ancient temples in a peaceful mountain setting, enjoy local street food, and experience traditional culture..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 text-base resize-none"
              disabled={isGenerating}
            />

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Need inspiration? Try these:</p>
              <div className="flex flex-wrap gap-2">
                {vibeExamples.map((example, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-colors px-3 py-1"
                    onClick={() => handleExampleClick(example)}
                  >
                    {example}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!description.trim() || isGenerating}
              size="lg"
              className="w-full font-semibold"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Creating your perfect itinerary...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate My Trip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Smart Destinations</h3>
            <p className="text-sm text-muted-foreground">
              AI-curated locations based on your preferences and travel style
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Perfect Timing</h3>
            <p className="text-sm text-muted-foreground">
              Optimized schedules that maximize your experience and minimize stress
            </p>
          </Card>

          <Card className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Collaborative Planning</h3>
            <p className="text-sm text-muted-foreground">
              Share and plan together with friends and family in real-time
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}
