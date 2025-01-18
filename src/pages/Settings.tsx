import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings as SettingsIcon, Bell, Lock, User, Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardNav } from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
      }
    };
    
    checkUser();
  }, [navigate]);

  const settingsSections = [
    {
      icon: <User className="w-5 h-5" />,
      title: "Profile Settings",
      description: "Manage your account information and preferences"
    },
    {
      icon: <Bell className="w-5 h-5" />,
      title: "Notification Settings",
      description: "Configure your notification preferences"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Security Settings",
      description: "Manage your security preferences and authentication methods"
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: "Data Management",
      description: "Configure data retention and backup settings"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#1A1F2C] dark">
        <main className="flex-1 p-8 space-y-8">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-6 h-6 text-white" />
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingsSections.map((section, index) => (
              <Card key={index} className="bg-[#221F26] border-none hover:bg-[#2A2730] transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-[#2D2B35] rounded-md text-white">
                      {section.icon}
                    </div>
                    <CardTitle className="text-white">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{section.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <DashboardNav />
      </div>
    </SidebarProvider>
  );
};

export default Settings;