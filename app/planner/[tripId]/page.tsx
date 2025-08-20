import { PlannerHeader } from "@/components/planner-header"
import { PlannerLayout } from "@/components/planner-layout"

interface PlannerPageProps {
  params: {
    tripId: string
  }
}

export default function PlannerPage({ params }: PlannerPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <PlannerHeader tripId={params.tripId} />
      <PlannerLayout tripId={params.tripId} />
    </div>
  )
}
