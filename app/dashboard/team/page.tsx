"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Mail, Calendar, MessageSquare, Activity, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import MobileNav from "@/components/mobile-nav" // Fixed import to use default import

const mockTeamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@synergysphere.com",
    role: "Product Manager",
    avatar: "AJ",
    status: "online",
    joinDate: "2023-06-15",
    tasksCompleted: 45,
    activeProjects: 3,
    lastActive: "2 minutes ago",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@synergysphere.com",
    role: "Senior Developer",
    avatar: "BS",
    status: "online",
    joinDate: "2023-05-20",
    tasksCompleted: 67,
    activeProjects: 2,
    lastActive: "5 minutes ago",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@synergysphere.com",
    role: "UX Designer",
    avatar: "CD",
    status: "away",
    joinDate: "2023-07-10",
    tasksCompleted: 32,
    activeProjects: 4,
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@synergysphere.com",
    role: "DevOps Engineer",
    avatar: "DW",
    status: "offline",
    joinDate: "2023-04-12",
    tasksCompleted: 28,
    activeProjects: 1,
    lastActive: "3 hours ago",
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva@synergysphere.com",
    role: "Marketing Specialist",
    avatar: "EB",
    status: "online",
    joinDate: "2023-08-01",
    tasksCompleted: 19,
    activeProjects: 2,
    lastActive: "Just now",
  },
]

const mockActivity = [
  {
    id: 1,
    user: "Alice Johnson",
    action: "completed task",
    target: "Design user interface mockups",
    time: "10 minutes ago",
    type: "task_completed",
  },
  {
    id: 2,
    user: "Bob Smith",
    action: "commented on",
    target: "Implement authentication system",
    time: "25 minutes ago",
    type: "comment",
  },
  {
    id: 3,
    user: "Carol Davis",
    action: "created new task",
    target: "User research interviews",
    time: "1 hour ago",
    type: "task_created",
  },
  {
    id: 4,
    user: "David Wilson",
    action: "updated project",
    target: "Decisive Tiger",
    time: "2 hours ago",
    type: "project_updated",
  },
  {
    id: 5,
    user: "Eva Brown",
    action: "joined project",
    target: "Tangible Swan",
    time: "3 hours ago",
    type: "project_joined",
  },
]

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = mockTeamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task_completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "comment":
        return <MessageSquare className="w-4 h-4 text-blue-600" />
      case "task_created":
        return <Plus className="w-4 h-4 text-purple-600" />
      case "project_updated":
        return <Activity className="w-4 h-4 text-orange-600" />
      case "project_joined":
        return <AlertCircle className="w-4 h-4 text-indigo-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
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
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
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
            <Link href="/dashboard/tasks">
              <Button variant="ghost" className="w-full justify-start">
                My Tasks
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-primary font-medium">
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
                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)]">Team</h2>
                <p className="text-muted-foreground text-sm md:text-base">Collaborate with your team members</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>
          </div>

          <Tabs defaultValue="members" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="activity">Activity Feed</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search team members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10 md:w-12 md:h-12">
                            <AvatarImage
                              src={`/ceholder-svg-key-kjjsh.jpg?key=kjjsh&key=8g3jz&key=rawtr&key=m5gyy&height=48&width=48`}
                            />
                            <AvatarFallback className="text-sm md:text-lg">{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base md:text-lg font-[family-name:var(--font-playfair)] truncate">
                            {member.name}
                          </CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {member.role}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate text-xs md:text-sm">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span className="text-xs md:text-sm">Last active: {member.lastActive}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-primary">{member.tasksCompleted}</div>
                          <div className="text-xs text-muted-foreground">Tasks Done</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-primary">{member.activeProjects}</div>
                          <div className="text-xs text-muted-foreground">Projects</div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Message</span>
                          <span className="sm:hidden">Chat</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Schedule</span>
                          <span className="sm:hidden">Meet</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-playfair)]">Recent Activity</CardTitle>
                  <CardDescription>Stay updated with your team's latest actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="mt-1">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-muted-foreground"> {activity.action} </span>
                            <span className="font-medium text-primary">{activity.target}</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
