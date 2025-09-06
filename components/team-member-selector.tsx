"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { X, Loader2 } from "lucide-react"
import { apiService, TeamMember } from "@/lib/api"
import { cn } from "@/lib/utils"

interface TeamMemberSelectorProps {
  selectedIds: string[]
  onSelectionChange: (ids: string[]) => void
}

export function TeamMemberSelector({ selectedIds, onSelectionChange }: TeamMemberSelectorProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTeamMembers()
  }, [])

  const loadTeamMembers = async () => {
    try {
      const members = await apiService.getTeamMembers()
      setTeamMembers(members)
    } catch (error) {
      console.error('Error loading team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMember = (memberId: string) => {
    if (selectedIds.includes(memberId)) {
      onSelectionChange(selectedIds.filter(id => id !== memberId))
    } else {
      onSelectionChange([...selectedIds, memberId])
    }
  }

  const removeMember = (memberId: string) => {
    onSelectionChange(selectedIds.filter(id => id !== memberId))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="ml-2 text-sm">Loading team members...</span>
      </div>
    )
  }

  const selectedMembers = teamMembers.filter(member => selectedIds.includes(member.id))

  return (
    <div className="space-y-3">
      {/* Selected Members */}
      {selectedMembers.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Members ({selectedMembers.length})</p>
          <div className="flex flex-wrap gap-2">
            {selectedMembers.map((member) => (
              <Badge key={member.id} variant="secondary" className="flex items-center gap-1 pr-1">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs">
                    {member.firstName[0]}{member.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs">{member.firstName} {member.lastName}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMember(member.id)}
                  className="h-4 w-4 p-0 hover:bg-destructive/20"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Available Members */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Available Team Members</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors",
                selectedIds.includes(member.id)
                  ? "bg-primary/10 border-primary"
                  : "hover:bg-muted"
              )}
              onClick={() => toggleMember(member.id)}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}