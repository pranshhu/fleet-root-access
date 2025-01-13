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
  Building2,
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
    <Sidebar className="border-l w-14 hover:w-64 transition-width duration-300" side="right">
      <SidebarHeader className="flex justify-center p-2">
        <Building2 className="h-8 w-8" />
      </SidebarHeader>
      
      <SidebarContent>
        <div className="flex flex-col items-center mb-4 pt-2">
          <Avatar className="h-10 w-10 mb-2">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <span className="text-xs text-sidebar-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">User Name</span>
        </div>

        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={() => navigate(item.href)}
                className="w-full flex items-center gap-2 px-2"
                tooltip={item.label}
              >
                <item.icon className="h-4 w-4" />
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-2 text-destructive hover:text-destructive"
              tooltip="Sign Out"
            >
              <LogOut className="h-4 w-4" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="flex justify-center p-2">
        <Building2 className="h-6 w-6 text-sidebar-foreground/50" />
      </SidebarFooter>
    </Sidebar>
  )
}