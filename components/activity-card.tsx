"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Clock, MapPin, MessageSquare, FileText, ChevronDown } from "lucide-react"
import type { Activity } from "@/lib/types"

interface ActivityCardProps {
  activity: Activity
  isSelected: boolean
  onClick: () => void
}

export function ActivityCard({ activity, isSelected, onClick }: ActivityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<"notes" | "comments">("notes")
  const [notes, setNotes] = useState(activity.notes || "")
  const [newComment, setNewComment] = useState("")

  const getCategoryColor = (category: Activity["category"]) => {
    const colors = {
      sightseeing: "bg-blue-100 text-blue-800",
      food: "bg-orange-100 text-orange-800",
      entertainment: "bg-purple-100 text-purple-800",
      transport: "bg-gray-100 text-gray-800",
      accommodation: "bg-green-100 text-green-800",
    }
    return colors[category] || colors.sightseeing
  }

  const handleCardClick = () => {
    onClick()
    setIsExpanded(!isExpanded)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        id={`activity-${activity.id}`}
        className={`cursor-pointer transition-all duration-200 hover:shadow-md card-hover ${
          isSelected ? "ring-2 ring-primary shadow-lg" : ""
        }`}
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h5 className="font-semibold text-sm mb-1">{activity.name}</h5>
              <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
            </div>
            <Badge className={`text-xs ${getCategoryColor(activity.category)}`}>{activity.category}</Badge>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{activity.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{activity.location.name}</span>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 border-t pt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex gap-2 mb-3">
                  <Button
                    variant={activeTab === "notes" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("notes")}
                    className="flex-1"
                  >
                    <FileText className="mr-1 h-3 w-3" />
                    Notes
                  </Button>
                  <Button
                    variant={activeTab === "comments" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("comments")}
                    className="flex-1"
                  >
                    <MessageSquare className="mr-1 h-3 w-3" />
                    Comments ({activity.comments?.length || 0})
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === "notes" && (
                    <motion.div
                      key="notes"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Textarea
                        placeholder="Add notes about this activity..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="text-xs"
                        rows={3}
                      />
                    </motion.div>
                  )}

                  {activeTab === "comments" && (
                    <motion.div
                      key="comments"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {activity.comments?.map((comment) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-muted/50 rounded p-2"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs">{comment.content}</p>
                        </motion.div>
                      ))}
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="text-xs"
                        rows={2}
                      />
                      <Button size="sm" className="mt-2">
                        Post Comment
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center mt-2">
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
