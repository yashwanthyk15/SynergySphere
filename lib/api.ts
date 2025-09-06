import { supabase } from './supabase'

export interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'planning' | 'review' | 'completed'
  progress: number
  dueDate: string
  color: string
  createdAt: string
  updatedAt: string
  ownerId: string
  teamMembers: TeamMember[]
  tasks: Task[]
}

export interface TeamMember {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  avatar?: string
  status: 'online' | 'away' | 'offline'
  joinDate: string
}

export interface Task {
  id: string
  name: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high'
  assigneeId: string
  projectId: string
  dueDate: string
  createdAt: string
}

export interface ProjectMember {
  projectId: string
  userId: string
  role: 'owner' | 'member' | 'viewer'
  joinedAt: string
}

export const apiService = {
  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      const { data: projects, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_members!inner(
            user_id,
            role,
            users(*)
          ),
          tasks(*)
        `)
        .order('createdAt', { ascending: false })

      if (error) throw error

      return projects.map(project => ({
        ...project,
        teamMembers: project.project_members.map((pm: any) => ({
          ...pm.users,
          role: pm.role
        })),
        tasks: project.tasks || []
      }))
    } catch (error) {
      console.error('Error fetching projects:', error)
      return []
    }
  },

  async createProject(projectData: {
    name: string
    description: string
    dueDate: string
    color: string
    teamMemberIds: string[]
  }): Promise<Project | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      // Create project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([
          {
            name: projectData.name,
            description: projectData.description,
            dueDate: projectData.dueDate,
            color: projectData.color,
            ownerId: user.id,
            status: 'active',
            progress: 0,
          },
        ])
        .select()
        .single()

      if (projectError) throw projectError

      // Add team members
      const memberInserts = [
        // Add owner as member
        {
          projectId: project.id,
          userId: user.id,
          role: 'owner',
        },
        // Add selected team members
        ...projectData.teamMemberIds.map(userId => ({
          projectId: project.id,
          userId,
          role: 'member',
        })),
      ]

      const { error: membersError } = await supabase
        .from('project_members')
        .insert(memberInserts)

      if (membersError) throw membersError

      // Fetch complete project data
      return await this.getProjectById(project.id)
    } catch (error) {
      console.error('Error creating project:', error)
      return null
    }
  },

  async getProjectById(id: string): Promise<Project | null> {
    try {
      const { data: project, error } = await supabase
        .from('projects')
        .select(`
          *,
          project_members(
            role,
            users(*)
          ),
          tasks(*)
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      return {
        ...project,
        teamMembers: project.project_members.map((pm: any) => ({
          ...pm.users,
          role: pm.role
        })),
        tasks: project.tasks || []
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      return null
    }
  },

  // Team Members
  async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('firstName', { ascending: true })

      if (error) throw error

      return users.map(user => ({
        ...user,
        status: 'online' // You can implement real-time status later
      }))
    } catch (error) {
      console.error('Error fetching team members:', error)
      return []
    }
  },

  async addTeamMemberToProject(projectId: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('project_members')
        .insert([
          {
            projectId,
            userId,
            role: 'member',
          },
        ])

      return !error
    } catch (error) {
      console.error('Error adding team member to project:', error)
      return false
    }
  },

  // Tasks
  async getTasksByProject(projectId: string): Promise<Task[]> {
    try {
      const { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('projectId', projectId)
        .order('createdAt', { ascending: false })

      if (error) throw error
      return tasks || []
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
  },

  async createTask(taskData: {
    name: string
    description: string
    projectId: string
    assigneeId: string
    priority: 'low' | 'medium' | 'high'
    dueDate: string
  }): Promise<Task | null> {
    try {
      const { data: task, error } = await supabase
        .from('tasks')
        .insert([
          {
            ...taskData,
            status: 'todo',
          },
        ])
        .select()
        .single()

      if (error) throw error
      return task
    } catch (error) {
      console.error('Error creating task:', error)
      return null
    }
  }
}