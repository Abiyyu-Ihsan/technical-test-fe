import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@shadcn/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@shadcn/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    logo: React.ElementType
    logoes: React.ElementType
  }[]
}) {
  const { open } = useSidebar() 
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) return null

  const LogoComponent = open ? activeTeam.logo : activeTeam.logoes

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              aria-label="button"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <LogoComponent className="size-8" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
