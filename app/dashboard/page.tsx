"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Filter, Grid3X3, List, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { AlertBanner } from "@/components/alert-banner"
import Link from "next/link"

const mockProjects = [
  {
    id: 1,
    name: "Pleased Turtle",
    description: "Mobile app redesign project",
    status: "active",
    progress: 75,
    teamMembers: 4,
    dueDate: "2024-02-15",
    color: "bg-emerald-500",
    tasks: 12,
    completedTasks: 9,
  },
  {
    id: 2,
    name: "Accomplished Dog",
    description: "Website development and optimization",
    status: "active",
    progress: 60,
    teamMembers: 6,
    dueDate: "2024-02-28",
    color: "bg-purple-500",
    tasks: 18,
    completedTasks: 11,
  },
  {
    id: 3,
    name: "Incomparable Camel",
    description: "Brand identity and marketing campaign",
    status: "planning",
    progress: 25,
    teamMembers: 3,
    dueDate: "2024-03-10",
    color: "bg-blue-500",
    tasks: 8,
    completedTasks: 2,
  },
  {
    id: 4,
    name: "Decisive Tiger",
    description: "Data analytics dashboard implementation",
    status: "active",
    progress: 90,
    teamMembers: 5,
    dueDate: "2024-02-05",
    color: "bg-orange-500",
    tasks: 15,
    completedTasks: 14,
  },
  {
    id: 5,
    name: "Tangible Swan",
    description: "Customer support system upgrade",
    status: "review",
    progress: 95,
    teamMembers: 2,
    dueDate: "2024-01-30",
    color: "bg-pink-500",
    tasks: 10,
    completedTasks: 10,
  },
  {
    id: 6,
    name: "Attentive Bee",
    description: "API integration and documentation",
    status: "active",
    progress: 40,
    teamMembers: 4,
    dueDate: "2024-03-15",
    color: "bg-yellow-500",
    tasks: 20,
    completedTasks: 8,
  },
]

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "planning":
        return "bg-blue-100 text-blue-800"
      case "review":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center space-x-4 md:space-x-8">
            <MobileNav />
            <h1 className="text-xl md:text-2xl font-bold text-primary font-[family-name:var(--font-playfair)]">
              SynergySphere
            </h1>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-primary font-medium">
                Home
              </Button>
              <Button variant="ghost">Solutions</Button>
              <Button variant="ghost">Work</Button>
              <Button variant="ghost">About</Button>
            </nav>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <NotificationsDropdown />
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 md:w-10 md:h-10 cursor-pointer">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="text-xs md:text-sm">JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@synergysphere.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/notifications">Notifications</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Help & Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:block w-64 border-r border-border bg-card p-6">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-primary font-medium">
              Projects
            </Button>
            <Link href="/dashboard/my-tasks">
              <Button variant="ghost" className="w-full justify-start">
                My Tasks
              </Button>
            </Link>
            <Link href="/dashboard/team">
              <Button variant="ghost" className="w-full justify-start">
                Team
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              Calendar
            </Button>
            <Link href="/dashboard/analytics">
              <Button variant="ghost" className="w-full justify-start">
                Analytics
              </Button>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4">
            <AlertBanner
              type="warning"
              title="Maintenance Notice"
              message="Scheduled maintenance will occur tonight from 11 PM to 1 AM EST. Some features may be temporarily unavailable."
              action={{
                label: "Learn More",
                onClick: () => console.log("Learn more clicked"),
              }}
            />
          </div>

          <div className="mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)]">Projects</h2>
                <p className="text-muted-foreground text-sm md:text-base">Manage and track your team projects</p>
              </div>
              <Link href="/dashboard/projects/new">
                <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-end">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-1 sm:flex-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="ml-2 sm:hidden">Grid</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-1 sm:flex-none"
                >
                  <List className="w-4 h-4" />
                  <span className="ml-2 sm:hidden">List</span>
                </Button>
              </div>
            </div>
          </div>

          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" : "space-y-4"
            }
          >
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${project.color}`} />
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-base md:text-lg font-[family-name:var(--font-playfair)] truncate">
                          {project.name}
                        </CardTitle>
                        <Badge variant="secondary" className={`${getStatusColor(project.status)} text-xs mt-1`}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex-shrink-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-sm line-clamp-2">{project.description}</CardDescription>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                      <span>
                        {project.completedTasks}/{project.tasks} tasks
                      </span>
                      <span>{project.teamMembers} members</span>
                    </div>

                    <div className="text-xs md:text-sm text-muted-foreground">
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found matching your search.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
