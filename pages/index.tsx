import OverScreen from '@component/screen/overview'
import { AppSidebar } from '@shadcn/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@shadcn/components/ui/sidebar'

export default function OverviewView() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <OverScreen />
      </SidebarInset>
    </SidebarProvider>
  )
}
