"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, AlertTriangle, Info, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertBannerProps {
  type?: "info" | "success" | "warning" | "error"
  title?: string
  message: string
  dismissible?: boolean
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function AlertBanner({
  type = "info",
  title,
  message,
  dismissible = true,
  action,
  className,
}: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getVariantClass = () => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
      case "warning":
        return "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
      case "error":
        return "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
      default:
        return "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
    }
  }

  return (
    <Alert className={cn(getVariantClass(), className)}>
      {getIcon()}
      <div className="flex-1">
        {title && <h4 className="font-medium mb-1">{title}</h4>}
        <AlertDescription>{message}</AlertDescription>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        {action && (
          <Button variant="outline" size="sm" onClick={action.onClick} className="h-7 text-xs bg-transparent">
            {action.label}
          </Button>
        )}
        {dismissible && (
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-7 w-7 p-0">
            <X className="h-3 w-3" />
            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </div>
    </Alert>
  )
}

export default AlertBanner
