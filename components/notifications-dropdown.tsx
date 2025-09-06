"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Bell, Check, CheckCheck, Clock, Users, MessageSquare, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

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
    message: "You've been assigned to 'Design user interface mockups' in Pleased Turtle",
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
    message: "Sarah Wilson mentioned you in a comment on 'API Documentation'",
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
    message: "Review authentication system is due tomorrow",
    timestamp: "1 hour ago",
    read: false,
    priority: "high",
    actionUrl: "/dashboard/tasks/2",
  },
  {
    id: "4",
    type: "project",
    title: "Project status updated",
    message: "Decisive Tiger project moved to review phase",
    timestamp: "2 hours ago",
    read: true,
    avatar: "DW",
    actionUrl: "/dashboard/projects/4",
  },
  {
    id: "5",
    type: "team",
    title: "New team member",
    message: "Alex Chen joined the Accomplished Dog project",
    timestamp: "1 day ago",
    read: true,
    avatar: "AC",
    actionUrl: "/dashboard/team",
  },
]

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return <Check className="w-4 h-4 text-blue-500" />
      case "mention":
        return <MessageSquare className="w-4 h-4 text-green-500" />
      case "deadline":
        return <Clock className="w-4 h-4 text-red-500" />
      case "project":
        return <Calendar className="w-4 h-4 text-purple-500" />
      case "team":
        return <Users className="w-4 h-4 text-orange-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-1 text-xs">
              <CheckCheck className="w-3 h-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No notifications yet</div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-3 cursor-pointer border-l-2",
                  !notification.read && "bg-muted/50",
                  getPriorityColor(notification.priority),
                )}
                onClick={() => {
                  markAsRead(notification.id)
                  if (notification.actionUrl) {
                    window.location.href = notification.actionUrl
                  }
                }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {notification.avatar ? (
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-xs">{notification.avatar}</AvatarFallback>
                    </Avatar>
                  ) : (
                    getNotificationIcon(notification.type)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium truncate">{notification.title}</p>
                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/notifications" className="w-full text-center text-sm">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationsDropdown
