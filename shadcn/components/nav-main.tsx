"use client"

import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@shadcn/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@shadcn/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ComponentType<{ className?: string }>
    icons?: React.ComponentType<{ className?: string }>
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = (item.items?.length ?? 0) > 0
          const isActive =
            (pathname && item.url && pathname === item.url) ||
            item.items?.some((sub) => sub.url && pathname?.startsWith(sub.url))

          const Icon = isActive ? item.icons ?? item.icon : item.icon

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={isActive ? "!text-[#0F3FB3] text-sm font-medium bg-[#F1F5F9] rounded-md" : "text-[#64748B] text-sm font-normal"}
                >
                  <a href={item.url}>
                    {Icon && <Icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isActive ? "!text-[#0F3FB3] text-sm font-medium bg-[#F1F5F9] rounded-md" : ""}
                  >
                    {Icon && <Icon />}
                    <span className={isActive ? "!text-[#0F3FB3] text-sm font-medium bg-[#F1F5F9] rounded-md" : "text-[#64748B] text-sm font-normal"}>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive =
                        subItem.url && pathname ? pathname.startsWith(subItem.url) : false

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={
                              isSubActive
                                ? "!text-[#0F3FB3] text-sm font-medium bg-[#F1F5F9] rounded-md"
                                : "text-[#64748B] text-sm font-normal"
                            }
                          >
                            <a href={subItem.url || "#"}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
