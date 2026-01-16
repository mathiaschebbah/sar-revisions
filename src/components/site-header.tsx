"use client"

import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CommandMenu } from "@/components/command-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

const pageTitles: Record<string, { title: string; parent?: { title: string; href: string } }> = {
  "/": { title: "Dashboard" },
  "/quiz": { title: "Quiz" },
  "/simulateur": { title: "Simulateur" },
  "/exercices": { title: "Exercices" },
  "/cours": { title: "Cours" },
  "/cours/chapitre-1": { title: "Introduction", parent: { title: "Cours", href: "/cours" } },
  "/cours/chapitre-2": { title: "Communication", parent: { title: "Cours", href: "/cours" } },
  "/cours/chapitre-3": { title: "Temps", parent: { title: "Cours", href: "/cours" } },
  "/cours/chapitre-4": { title: "Concurrence", parent: { title: "Cours", href: "/cours" } },
  "/cours/chapitre-5": { title: "Election", parent: { title: "Cours", href: "/cours" } },
  "/parametres": { title: "Parametres" },
  "/aide": { title: "Aide" },
}

export function SiteHeader() {
  const pathname = usePathname()
  const pageInfo = pageTitles[pathname] || { title: "SAR Revisions" }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) md:rounded-t-xl">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Breadcrumbs */}
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
            </BreadcrumbItem>
            {pageInfo.parent && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={pageInfo.parent.href}>
                    {pageInfo.parent.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageInfo.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Mobile title */}
        <h1 className="text-base font-medium sm:hidden">{pageInfo.title}</h1>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <div className="hidden md:flex">
          <CommandMenu />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="relative size-8">
                  <Bell className="size-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-[10px]"
                  >
                    3
                  </Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>3 nouvelles notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
