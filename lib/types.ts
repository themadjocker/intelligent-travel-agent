export interface Activity {
  id: string
  name: string
  description: string
  location: {
    name: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  time: string
  duration: string
  category: "sightseeing" | "food" | "entertainment" | "transport" | "accommodation"
  notes?: string
  comments?: Comment[]
}

export interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
}

export interface Day {
  id: string
  date: string
  activities: Activity[]
}

export interface Collaborator {
  id: string
  name: string
  email: string
  avatar: string
  role: "owner" | "editor" | "viewer"
}

export interface Trip {
  id: string
  title: string
  destination: string
  startDate: string
  endDate: string
  days: Day[]
  collaborators: Collaborator[]
  coverImage: string
  description: string
  budget?: number
  status: "planning" | "confirmed" | "completed"
}
