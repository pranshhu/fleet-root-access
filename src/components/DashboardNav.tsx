import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  Bell,
  Users2,
  Settings,
  Building2
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Bot, label: "Robots", href: "/robots" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Bell, label: "Alerts", href: "/alerts" },
  { icon: Users2, label: "Team", href: "/team" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function DashboardNav() {
  const navigate = useNavigate()

  return (
    <Sidebar className="border-l" side="right">
      <SidebarHeader className="flex justify-center p-4">
        <Building2 className="h-10 w-10" />
      </SidebarHeader>
      
      <SidebarContent>
        <div className="flex flex-col items-center mb-8 pt-4">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <span className="text-sm text-sidebar-foreground">User Name</span>
        </div>

        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={() => navigate(item.href)}
                className="w-full flex items-center gap-2"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="flex justify-center p-4">
        <Building2 className="h-6 w-6 text-sidebar-foreground/50" />
      </SidebarFooter>
    </Sidebar>
  )
}