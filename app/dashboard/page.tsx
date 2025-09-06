"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Grid3X3, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { AlertBanner } from "@/components/alert-banner"
import { ProjectCard } from "@/components/project-card"
import { NewProjectDialog } from "@/components/new-project-dialog"
import { useAuth } from "@/contexts/AuthContext"
import { apiService, Project } from "@/lib/api"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }
    loadProjects()
  }, [user, router])

  const loadProjects = async () => {
    setLoading(true)
    try {
      const projectsData = await apiService.getProjects()
      setProjects(projectsData)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async (projectId: string, userId: string) => {
    try {
      const success = await apiService.addTeamMemberToProject(projectId, userId)
      if (success) {
        // Refresh projects to show updated team members
        loadProjects()
      }
    } catch (error) {
      console.error('Error adding team member:', error)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!user) {
    return null
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
                  <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} />
                  <AvatarFallback className="text-xs md:text-sm">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} />
                    <AvatarFallback className="text-xs">
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
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
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
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
              <NewProjectDialog onProjectCreated={loadProjects} />
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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Loading projects...</span>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" : "space-y-4"
              }
            >
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onAddMember={handleAddMember}
                />
              ))}
            </div>
          )}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {loading ? "Loading projects..." : "No projects found matching your search."}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
