import GerbangScreen from '@component/screen/gerbang'
import { AppSidebar } from '@shadcn/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@shadcn/components/ui/sidebar'

export default function GerbangView() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <GerbangScreen/>
      </SidebarInset>
    </SidebarProvider>
  )
}
