"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Calendar, User, Flag, MoreHorizontal, CheckCircle2, AlertCircle, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

const mockMyTasks = [
  {
    id: 1,
    name: "Design user interface mockups",
    description: "Create wireframes and high-fidelity mockups for the new dashboard",
    status: "in-progress",
    priority: "high",
    assignee: { name: "John Doe", avatar: "JD" }, // Current user
    project: "Pleased Turtle",
    dueDate: "2024-02-10",
    tags: ["design", "ui/ux"],
    createdAt: "2024-01-15",
    progress: 60,
    timeSpent: "4h 30m",
    estimatedTime: "8h",
  },
  {
    id: 2,
    name: "Review authentication system",
    description: "Code review for the new user login and registration functionality",
    status: "todo",
    priority: "high",
    assignee: { name: "John Doe", avatar: "JD" },
    project: "Accomplished Dog",
    dueDate: "2024-02-08", // Overdue
    tags: ["backend", "security", "review"],
    createdAt: "2024-01-20",
    progress: 0,
    timeSpent: "0h",
    estimatedTime: "2h",
  },
  {
    id: 3,
    name: "Update API documentation",
    description: "Add new endpoints and update response examples",
    status: "review",
    priority: "medium",
    assignee: { name: "John Doe", avatar: "JD" },
    project: "Attentive Bee",
    dueDate: "2024-02-12",
    tags: ["documentation", "api"],
    createdAt: "2024-01-18",
    progress: 90,
    timeSpent: "3h 15m",
    estimatedTime: "4h",
  },
  {
    id: 4,
    name: "Setup monitoring dashboard",
    description: "Configure application performance monitoring and alerts",
    status: "done",
    priority: "medium",
    assignee: { name: "John Doe", avatar: "JD" },
    project: "Decisive Tiger",
    dueDate: "2024-02-05",
    tags: ["devops", "monitoring"],
    createdAt: "2024-01-12",
    progress: 100,
    timeSpent: "6h 45m",
    estimatedTime: "6h",
  },
  {
    id: 5,
    name: "Prepare user research plan",
    description: "Create interview questions and research methodology",
    status: "in-progress",
    priority: "low",
    assignee: { name: "John Doe", avatar: "JD" },
    project: "Tangible Swan",
    dueDate: "2024-02-15",
    tags: ["research", "planning"],
    createdAt: "2024-01-25",
    progress: 25,
    timeSpent: "1h 20m",
    estimatedTime: "5h",
  },
]

export default function MyTasksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredTasks = mockMyTasks.filter((task) => {
    const matchesSearch =
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    // Tab filtering
    let matchesTab = true
    if (activeTab === "overdue") {
      matchesTab = new Date(task.dueDate) < new Date() && task.status !== "done"
    } else if (activeTab === "today") {
      const today = new Date().toDateString()
      matchesTab = new Date(task.dueDate).toDateString() === today
    } else if (activeTab === "in-progress") {
      matchesTab = task.status === "in-progress"
    }

    return matchesSearch && matchesStatus && matchesPriority && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "done":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400"
      case "medium":
        return "text-yellow-600 dark:text-yellow-400"
      case "low":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    return new Date(dueDate) < new Date() && status !== "done"
  }

  const getTaskStats = () => {
    const total = mockMyTasks.length
    const completed = mockMyTasks.filter((t) => t.status === "done").length
    const inProgress = mockMyTasks.filter((t) => t.status === "in-progress").length
    const overdue = mockMyTasks.filter((t) => isOverdue(t.dueDate, t.status)).length

    return { total, completed, inProgress, overdue }
  }

  const stats = getTaskStats()

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
            <ThemeToggle />
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
            <Link href="/dashboard/team">
              <Button variant="ghost" className="w-full justify-start">
                Team
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              Calendar
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Reports
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total Tasks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                    <p className="text-xs text-muted-foreground">Overdue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="today">Due Today</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </Tabs>

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
              <Card
                key={task.id}
                className={`hover:shadow-md transition-shadow ${isOverdue(task.dueDate, task.status) ? "border-red-200 dark:border-red-800" : ""}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <CardTitle className="text-base md:text-lg font-[family-name:var(--font-playfair)] truncate">
                          {task.name}
                          {isOverdue(task.dueDate, task.status) && (
                            <AlertCircle className="inline w-4 h-4 ml-2 text-red-500" />
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={`${getStatusColor(task.status)} text-xs`}>
                            {task.status.replace("-", " ")}
                          </Badge>
                          <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                        </div>
                      </div>
                      <CardDescription className="text-sm line-clamp-2 mb-3">{task.description}</CardDescription>

                      {task.status !== "done" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress: {task.progress}%</span>
                            <span>
                              {task.timeSpent} / {task.estimatedTime}
                            </span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      )}
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
                        <DropdownMenuItem>
                          <Link href={`/dashboard/tasks/${task.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
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
                        <span className={isOverdue(task.dueDate, task.status) ? "text-red-600 font-medium" : ""}>
                          Due {new Date(task.dueDate).toLocaleDateString()}
                        </span>
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
