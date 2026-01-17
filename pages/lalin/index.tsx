import LalinScreen from '@component/screen/lalin'
import { AppSidebar } from '@shadcn/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@shadcn/components/ui/sidebar'

export default function LalinView() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <LalinScreen/>
      </SidebarInset>
    </SidebarProvider>
  )
}
