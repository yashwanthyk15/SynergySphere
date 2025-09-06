"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, Users, CheckCircle, Clock, Download, Target } from "lucide-react"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsDropdown } from "@/components/notifications-dropdown"

// Mock data for analytics
const projectCompletionData = [
  { month: "Jan", completed: 12, inProgress: 8, planned: 5 },
  { month: "Feb", completed: 15, inProgress: 10, planned: 7 },
  { month: "Mar", completed: 18, inProgress: 12, planned: 6 },
  { month: "Apr", completed: 22, inProgress: 15, planned: 8 },
  { month: "May", completed: 25, inProgress: 18, planned: 10 },
  { month: "Jun", completed: 28, inProgress: 20, planned: 12 },
]

const taskStatusData = [
  { name: "Completed", value: 145, color: "#10b981" },
  { name: "In Progress", value: 67, color: "#3b82f6" },
  { name: "To Do", value: 89, color: "#6b7280" },
  { name: "Review", value: 23, color: "#f59e0b" },
]

const teamProductivityData = [
  { name: "John Doe", tasksCompleted: 28, efficiency: 92 },
  { name: "Sarah Wilson", tasksCompleted: 25, efficiency: 88 },
  { name: "Mike Johnson", tasksCompleted: 22, efficiency: 85 },
  { name: "Alice Chen", tasksCompleted: 20, efficiency: 90 },
  { name: "David Brown", tasksCompleted: 18, efficiency: 82 },
]

const weeklyActivityData = [
  { day: "Mon", tasks: 12, hours: 8.5 },
  { day: "Tue", tasks: 15, hours: 9.2 },
  { day: "Wed", tasks: 18, hours: 8.8 },
  { day: "Thu", tasks: 14, hours: 7.5 },
  { day: "Fri", tasks: 16, hours: 8.0 },
  { day: "Sat", tasks: 8, hours: 4.2 },
  { day: "Sun", tasks: 5, hours: 2.5 },
]

const priorityDistributionData = [
  { priority: "High", count: 45, color: "#ef4444" },
  { priority: "Medium", count: 78, color: "#f59e0b" },
  { priority: "Low", count: 32, color: "#10b981" },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [activeTab, setActiveTab] = useState("overview")

  const kpiData = [
    {
      title: "Total Projects",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Target,
      description: "Active and completed projects",
    },
    {
      title: "Tasks Completed",
      value: "324",
      change: "+8%",
      trend: "up",
      icon: CheckCircle,
      description: "This month",
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Users,
      description: "Active team members",
    },
    {
      title: "Avg. Completion Time",
      value: "3.2 days",
      change: "-15%",
      trend: "down",
      icon: Clock,
      description: "Per task",
    },
  ]

  const exportReport = () => {
    // Mock export functionality
    console.log("Exporting report...")
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
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <NotificationsDropdown />
            <ThemeToggle />
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="text-xs md:text-sm">JD</AvatarFallback>
            </Avatar>
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
            <Button variant="ghost" className="w-full justify-start text-primary font-medium">
              Analytics
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <div>
                <h2 className="text-3xl font-bold font-[family-name:var(--font-playfair)] mb-2">Analytics Dashboard</h2>
                <p className="text-muted-foreground">Track performance and insights across your projects</p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={exportReport} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {kpiData.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{kpi.title}</p>
                        <p className="text-2xl font-bold">{kpi.value}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {kpi.trend === "up" ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-green-500" />
                          )}
                          <span className="text-xs text-green-600">{kpi.change}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <kpi.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Completion Trends</CardTitle>
                      <CardDescription>Monthly project completion over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={projectCompletionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="completed" stackId="1" stroke="#10b981" fill="#10b981" />
                          <Area type="monotone" dataKey="inProgress" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                          <Area type="monotone" dataKey="planned" stackId="1" stroke="#6b7280" fill="#6b7280" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Task Status Distribution</CardTitle>
                      <CardDescription>Current task status breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={taskStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {taskStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Activity</CardTitle>
                    <CardDescription>Tasks completed and hours worked per day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyActivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="tasks" fill="#3b82f6" name="Tasks Completed" />
                        <Line yAxisId="right" type="monotone" dataKey="hours" stroke="#10b981" name="Hours Worked" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Progress</CardTitle>
                      <CardDescription>Completion status of active projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "Pleased Turtle", progress: 75, status: "On Track" },
                          { name: "Accomplished Dog", progress: 60, status: "At Risk" },
                          { name: "Decisive Tiger", progress: 90, status: "Ahead" },
                          { name: "Attentive Bee", progress: 40, status: "Behind" },
                        ].map((project, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{project.name}</span>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant={
                                    project.status === "On Track"
                                      ? "default"
                                      : project.status === "Ahead"
                                        ? "secondary"
                                        : project.status === "At Risk"
                                          ? "outline"
                                          : "destructive"
                                  }
                                  className="text-xs"
                                >
                                  {project.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground">{project.progress}%</span>
                              </div>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Priority Distribution</CardTitle>
                      <CardDescription>Task priority breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={priorityDistributionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            label={({ priority, count }) => `${priority}: ${count}`}
                          >
                            {priorityDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Task Completion Rate</CardTitle>
                    <CardDescription>Daily task completion over the past month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={projectCompletionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Productivity</CardTitle>
                    <CardDescription>Individual team member performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={teamProductivityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tasksCompleted" fill="#3b82f6" name="Tasks Completed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamProductivityData.map((member, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar>
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">Team Member</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Tasks Completed</span>
                            <span className="text-sm font-medium">{member.tasksCompleted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Efficiency</span>
                            <span className="text-sm font-medium">{member.efficiency}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${member.efficiency}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
