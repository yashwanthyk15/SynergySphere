"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MobileNavProps {
  children?: React.ReactNode
}

export function MobileNav({ children }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Projects" },
    { href: "/dashboard/tasks", label: "My Tasks" },
    { href: "/dashboard/team", label: "Team" },
    { href: "/dashboard/calendar", label: "Calendar" },
    { href: "/dashboard/reports", label: "Reports" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-primary font-[family-name:var(--font-playfair)]">SynergySphere</h2>
          </div>
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      pathname === item.href ? "text-primary font-medium bg-primary/10" : ""
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
          {children && <div className="p-6 border-t">{children}</div>}
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Default export for compatibility
export default MobileNav
