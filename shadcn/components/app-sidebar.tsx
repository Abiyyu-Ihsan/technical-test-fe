"use client"

import * as React from "react"
import { NavMain } from "@shadcn/components/nav-main"
import { NavUser } from "@shadcn/components/nav-user"
import { TeamSwitcher } from "@shadcn/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@shadcn/components/ui/sidebar"
import Logooo from "../../public/logo/logo"
import { useRouter } from "next/router"
import Logoes from "../../public/logo/logoes"
import Dashboard from "../../public/icons/Dashboard"
import DashboardActive from "../../public/icons/DashboardActive"
import Lalin from "../../public/icons/Lalin"
import LalinActive from "../../public/icons/LalinActive"
import GateActive from "../../public/icons/GateActive"
import Gate from "../../public/icons/Gate"

type NavSubItem = {
  title: string
  url: string
  role?: string | string[]
}

type NavItem = {
  title: string
  url: string
  icon?: (props: { className?: string }) => React.ReactElement
  icons?: (props: { className?: string }) => React.ReactElement
  isActive?: boolean
  role?: string | string[]
  items?: NavSubItem[]
}

const baseNavMain: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Dashboard,
    icons: DashboardActive,
    isActive: true,
  },
  {
    title: "Lalin",
    url: "/lalin",
    icon: Lalin,
    icons: LalinActive,
    isActive: true,
  },
  {
    title: "Gerbang",
    url: "/gerbang",
    icon: Gate,
    icons: GateActive,
    isActive: true,
  },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [navMain, setNavMain] = React.useState<NavItem[]>(baseNavMain)
 
  const data = {
    user: {
      name: "Super Admin",
      email: "m@example.com",
      avatar: "/logo/logo 2.png",
    },
    teams: [{ logo: Logooo, logoes: Logoes }],
    navMain,
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
