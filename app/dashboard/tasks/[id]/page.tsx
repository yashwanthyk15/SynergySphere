"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, User, Flag, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { TaskComments } from "@/components/task-comments"

const mockTask = {
  id: 1,
  name: "Design user interface mockups",
  description:
    "Create wireframes and high-fidelity mockups for the new dashboard. This includes user flow diagrams, component specifications, and interactive prototypes that will guide the development team.",
  status: "in-progress",
  priority: "high",
  assignee: { name: "Alice Johnson", avatar: "AJ" },
  project: "Pleased Turtle",
  dueDate: "2024-02-10",
  tags: ["design", "ui/ux"],
  createdAt: "2024-01-15",
  updatedAt: "2024-01-28",
}

export default function TaskDetailPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "review":
        return "bg-yellow-100 text-yellow-800"
      case "done":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold text-primary font-[family-name:var(--font-playfair)]">SynergySphere</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r border-border bg-card p-6">
          <nav className="space-y-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                Projects
              </Button>
            </Link>
            <Link href="/dashboard/tasks">
              <Button variant="ghost" className="w-full justify-start text-primary font-medium">
                My Tasks
              </Button>
            </Link>
            <Link href="/dashboard/team">
              <Button variant="ghost" className="w-full justify-start">
                Team
              </Button>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="mb-6">
              <Link href="/dashboard/tasks">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tasks
                </Button>
              </Link>
            </div>

            {/* Task Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-2xl font-[family-name:var(--font-playfair)]">
                        {mockTask.name}
                      </CardTitle>
                      <Badge variant="secondary" className={getStatusColor(mockTask.status)}>
                        {mockTask.status.replace("-", " ")}
                      </Badge>
                      <Flag className={`w-5 h-5 ${getPriorityColor(mockTask.priority)}`} />
                    </div>
                    <CardDescription className="text-base">{mockTask.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/tasks/${mockTask.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Assignee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">{mockTask.assignee.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{mockTask.assignee.name}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Due Date</span>
                    </div>
                    <div className="text-sm">{new Date(mockTask.dueDate).toLocaleDateString()}</div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-sm font-medium">Project</div>
                    <Badge variant="outline">{mockTask.project}</Badge>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm font-medium mb-2">Tags</div>
                  <div className="flex gap-2">
                    {mockTask.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <TaskComments taskId={mockTask.id} />
          </div>
        </main>
      </div>
    </div>
  )
}
