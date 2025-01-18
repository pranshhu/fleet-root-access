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
  LogOut
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast.success("Successfully signed out!")
    navigate("/")
  }

  return (
    <Sidebar className="w-14 border-l bg-sidebar-background" side="right">
      <SidebarHeader className="h-2" />
      
      <SidebarContent>
        <div className="flex flex-col items-center mb-4 pt-2">
          <Avatar className="h-8 w-8 mb-2">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>

        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={() => navigate(item.href)}
                className="w-full flex justify-center p-2 text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
                tooltip={item.label}
              >
                <item.icon className="h-5 w-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="w-full flex justify-center p-2 text-red-400 hover:text-red-300 hover:bg-sidebar-accent"
              tooltip="Sign Out"
            >
              <LogOut className="h-5 w-5" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="h-2" />
    </Sidebar>
  )
}