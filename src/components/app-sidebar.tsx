"use client"

import * as React from "react"
import {
  IconBook,
  IconBrain,
  IconCircleDot,
  IconDashboard,
  IconFlask,
  IconHelp,
  IconSettings,
  IconSparkles,
} from "@tabler/icons-react"

import { NavChapters } from "@/components/nav-chapters"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Etudiant",
    email: "etudiant@dauphine.fr",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Quiz",
      url: "/quiz",
      icon: IconBrain,
    },
    {
      title: "Simulateur",
      url: "/simulateur",
      icon: IconCircleDot,
    },
    {
      title: "Exercices",
      url: "/exercices",
      icon: IconFlask,
    },
  ],
  chapters: [
    {
      id: 1,
      name: "Introduction",
      url: "/cours/chapitre-1",
      icon: IconBook,
    },
    {
      id: 2,
      name: "Communication",
      url: "/cours/chapitre-2",
      icon: IconBook,
    },
    {
      id: 3,
      name: "Temps",
      url: "/cours/chapitre-3",
      icon: IconBook,
    },
    {
      id: 4,
      name: "Concurrence",
      url: "/cours/chapitre-4",
      icon: IconBook,
    },
    {
      id: 5,
      name: "Election",
      url: "/cours/chapitre-5",
      icon: IconBook,
    },
  ],
  navSecondary: [
    {
      title: "Parametres",
      url: "/parametres",
      icon: IconSettings,
    },
    {
      title: "Aide",
      url: "/aide",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconSparkles className="!size-5" />
                <span className="text-base font-semibold">SAR Revisions</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavChapters items={data.chapters} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
