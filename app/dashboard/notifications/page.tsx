"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Search, Check, CheckCheck, Clock, Users, MessageSquare, Calendar, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"

interface Notification {
  id: string
  type: "task" | "project" | "mention" | "deadline" | "team"
  title: string
  message: string
  timestamp: string
  read: boolean
  avatar?: string
  priority?: "low" | "medium" | "high"
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "task",
    title: "New task assigned",
    message:
      "You've been assigned to 'Design user interface mockups' in Pleased Turtle project. The task has a high priority and is due next week.",
    timestamp: "2 minutes ago",
    read: false,
    avatar: "AJ",
    priority: "high",
    actionUrl: "/dashboard/tasks/1",
  },
  {
    id: "2",
    type: "mention",
    title: "You were mentioned",
    message:
      "Sarah Wilson mentioned you in a comment on 'API Documentation' task: '@john can you review the authentication endpoints?'",
    timestamp: "15 minutes ago",
    read: false,
    avatar: "SW",
    priority: "medium",
    actionUrl: "/dashboard/tasks/3",
  },
  {
    id: "3",
    type: "deadline",
    title: "Task deadline approaching",
    message:
      "Review authentication system task is due tomorrow at 5:00 PM. Make sure to complete your review before the deadline.",
    timestamp: "1 hour ago",
    read: false,
    priority: "high",
    actionUrl: "/dashboard/tasks/2",
  },
  {
    id: "4",
    type: "project",
    title: "Project status updated",
    message:
      "Decisive Tiger project has been moved to review phase. All team members should prepare for the final review meeting.",
    timestamp: "2 hours ago",
    read: true,
    avatar: "DW",
    actionUrl: "/dashboard/projects/4",
  },
  {
    id: "5",
    type: "team",
    title: "New team member",
    message:
      "Alex Chen has joined the Accomplished Dog project team. Please welcome them and share the project documentation.",
    timestamp: "1 day ago",
    read: true,
    avatar: "AC",
    actionUrl: "/dashboard/team",
  },
  {
    id: "6",
    type: "task",
    title: "Task completed",
    message: "Mike Johnson completed the 'Setup CI/CD pipeline' task in Decisive Tiger project ahead of schedule.",
    timestamp: "2 days ago",
    read: true,
    avatar: "MJ",
    priority: "low",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesTab = activeTab === "all" || (activeTab === "unread" && !notification.read)

    return matchesSearch && matchesType && matchesTab
  })

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return <Check className="w-5 h-5 text-blue-500" />
      case "mention":
        return <MessageSquare className="w-5 h-5 text-green-500" />
      case "deadline":
        return <Clock className="w-5 h-5 text-red-500" />
      case "project":
        return <Calendar className="w-5 h-5 text-purple-500" />
      case "team":
        return <Users className="w-5 h-5 text-orange-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-200"
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

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
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="text-xs md:text-sm">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-playfair)] mb-2">Notifications</h2>
              <p className="text-muted-foreground">Stay updated with your projects and tasks</p>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
                <SelectItem value="project">Projects</SelectItem>
                <SelectItem value="mention">Mentions</SelectItem>
                <SelectItem value="deadline">Deadlines</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={cn(
                "transition-all hover:shadow-md border-l-4",
                !notification.read && "bg-muted/30",
                getPriorityColor(notification.priority),
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {notification.avatar ? (
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{notification.avatar}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-sm">{notification.title}</h3>
                      {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                      <Badge variant="outline" className="text-xs capitalize">
                        {notification.type}
                      </Badge>
                      {notification.priority && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            notification.priority === "high" && "bg-red-100 text-red-800",
                            notification.priority === "medium" && "bg-yellow-100 text-yellow-800",
                            notification.priority === "low" && "bg-green-100 text-green-800",
                          )}
                        >
                          {notification.priority}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
