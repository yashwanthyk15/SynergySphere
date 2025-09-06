"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Plus, Loader2 } from "lucide-react"
import { apiService, TeamMember } from "@/lib/api"

interface TeamMemberDropdownProps {
  onAddMember: (userId: string) => void
  excludeUserIds?: string[]
}

export function TeamMemberDropdown({ onAddMember, excludeUserIds = [] }: TeamMemberDropdownProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen && teamMembers.length === 0) {
      loadTeamMembers()
    }
  }, [isOpen])

  const loadTeamMembers = async () => {
    setLoading(true)
    try {
      const members = await apiService.getTeamMembers()
      setTeamMembers(members)
    } catch (error) {
      console.error('Error loading team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const availableMembers = teamMembers.filter(member => !excludeUserIds.includes(member.id))

  const handleAddMember = (userId: string) => {
    onAddMember(userId)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-transparent">
          <Plus className="w-4 h-4 mr-1" />
          Add Member
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Add Team Member</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="ml-2 text-sm">Loading members...</span>
          </div>
        ) : availableMembers.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No available members to add
          </div>
        ) : (
          availableMembers.map((member) => (
            <DropdownMenuItem
              key={member.id}
              onClick={() => handleAddMember(member.id)}
              className="flex items-center gap-3 p-3 cursor-pointer"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">
                  {member.firstName[0]}{member.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {member.firstName} {member.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {member.role}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}