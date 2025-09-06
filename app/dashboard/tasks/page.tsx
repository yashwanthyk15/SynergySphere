"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Calendar, User, Flag, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav" // Fixed import to use default import

const mockTasks = [
  {
    id: 1,
    name: "Design user interface mockups",
    description: "Create wireframes and high-fidelity mockups for the new dashboard",
    status: "in-progress",
    priority: "high",
    assignee: { name: "Alice Johnson", avatar: "AJ" },
    project: "Pleased Turtle",
    dueDate: "2024-02-10",
    tags: ["design", "ui/ux"],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Implement authentication system",
    description: "Set up user login, registration, and password reset functionality",
    status: "todo",
    priority: "high",
    assignee: { name: "Bob Smith", avatar: "BS" },
    project: "Accomplished Dog",
    dueDate: "2024-02-15",
    tags: ["backend", "security"],
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Write API documentation",
    description: "Document all REST endpoints with examples and response formats",
    status: "review",
    priority: "medium",
    assignee: { name: "Carol Davis", avatar: "CD" },
    project: "Attentive Bee",
    dueDate: "2024-02-08",
    tags: ["documentation", "api"],
    createdAt: "2024-01-18",
  },
  {
    id: 4,
    name: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment workflows",
    status: "done",
    priority: "medium",
    assignee: { name: "David Wilson", avatar: "DW" },
    project: "Decisive Tiger",
    dueDate: "2024-02-05",
    tags: ["devops", "automation"],
    createdAt: "2024-01-12",
  },
  {
    id: 5,
    name: "Conduct user research interviews",
    description: "Interview 10 users to gather feedback on current features",
    status: "in-progress",
    priority: "low",
    assignee: { name: "Eva Brown", avatar: "EB" },
    project: "Tangible Swan",
    dueDate: "2024-02-20",
    tags: ["research", "user-experience"],
    createdAt: "2024-01-25",
  },
]

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredTasks = mockTasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

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
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center space-x-4 md:space-x-8">
            <MobileNav />
            <Link href="/dashboard">
              <h1 className="text-xl md:text-2xl font-bold text-primary font-[family-name:var(--font-playfair)]">
                SynergySphere
              </h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard">
                <Button variant="ghost">Home</Button>
              </Link>
              <Button variant="ghost">Solutions</Button>
              <Button variant="ghost">Work</Button>
              <Button variant="ghost">About</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="text-xs md:text-sm">JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:block w-64 border-r border-border bg-card p-6">
          <nav className="space-y-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                Projects
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-primary font-medium">
              My Tasks
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Team
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Calendar
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Reports
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)]">My Tasks</h2>
                <p className="text-muted-foreground text-sm md:text-base">Manage and track your assigned tasks</p>
              </div>
              <Link href="/dashboard/tasks/create">
                <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="flex-1 sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="flex-1 sm:w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <CardTitle className="text-base md:text-lg font-[family-name:var(--font-playfair)] truncate">
                          {task.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={`${getStatusColor(task.status)} text-xs`}>
                            {task.status.replace("-", " ")}
                          </Badge>
                          <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                        </div>
                      </div>
                      <CardDescription className="text-sm line-clamp-2">{task.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="self-start">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/tasks/${task.id}/edit`}>Edit Task</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="truncate">{task.assignee.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs bg-muted px-2 py-1 rounded">{task.project}</span>
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tasks found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
