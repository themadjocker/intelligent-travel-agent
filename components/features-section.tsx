import { Card, CardContent } from "@/components/ui/card"
import { Brain, Route, Leaf, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Vibe-Based Planning",
    description:
      "Our AI understands your travel personality and creates itineraries that match your unique style and preferences.",
  },
  {
    icon: Route,
    title: "AI Itinerary Re-router",
    description:
      "Real-time adjustments to your plans based on weather, crowds, or spontaneous discoveries along the way.",
  },
  {
    icon: Leaf,
    title: "Sustainability Score",
    description: "Make eco-conscious travel choices with our sustainability ratings for accommodations and activities.",
  },
  {
    icon: Users,
    title: "Collaborative Trips",
    description:
      "Plan together with friends and family. Share ideas, vote on activities, and create memories as a group.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Intelligent Travel Planning</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of travel planning with AI-powered features designed to make your journey
            unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
