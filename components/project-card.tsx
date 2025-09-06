"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock,
  Plus
} from "lucide-react"
import { Project, TeamMember } from "@/lib/api"
import { cn } from "@/lib/utils"
import { TeamMemberDropdown } from "./team-member-dropdown"

interface ProjectCardProps {
  project: Project
  onAddMember: (projectId: string, userId: string) => void
}

export function ProjectCard({ project, onAddMember }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  const completedTasks = project.tasks.filter(task => task.status === 'done').length
  const totalTasks = project.tasks.length

  return (
    <Card className={cn(
      "hover:shadow-lg transition-all duration-300 cursor-pointer",
      "dark:bg-gray-800 dark:border-gray-700"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${project.color}`} />
            <div className="min-w-0 flex-1">
              <CardTitle 
                className="text-base md:text-lg font-[family-name:var(--font-playfair)] truncate cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {project.name}
              </CardTitle>
              <Badge variant="secondary" className={`${getStatusColor(project.status)} text-xs mt-1`}>
                {project.status}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-shrink-0"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
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
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="mb-4 text-sm line-clamp-2">
          {project.description}
        </CardDescription>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              <span>{completedTasks}/{totalTasks} tasks</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{project.teamMembers.length} members</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Expanded Content */}
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        )}>
          <div className="space-y-4 pt-4 border-t">
            {/* Team Members Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Team Members</h4>
                <TeamMemberDropdown
                  onAddMember={(userId) => onAddMember(project.id, userId)}
                  excludeUserIds={project.teamMembers.map(m => m.id)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-2 bg-muted rounded-full px-3 py-1">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="text-xs">
                        {member.firstName[0]}{member.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{member.firstName} {member.lastName}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tasks */}
            <div>
              <h4 className="text-sm font-medium mb-2">Recent Tasks</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {project.tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        task.status === 'done' ? 'bg-green-500' :
                        task.status === 'in-progress' ? 'bg-blue-500' :
                        task.status === 'review' ? 'bg-yellow-500' : 'bg-gray-400'
                      )} />
                      <span className="text-xs truncate">{task.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                ))}
                {project.tasks.length === 0 && (
                  <p className="text-xs text-muted-foreground">No tasks yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}