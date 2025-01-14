import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users2, Shield, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardNav } from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockTeamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Fleet Manager",
    email: "john@example.com",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Robot Technician",
    email: "jane@example.com",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Operations Lead",
    email: "mike@example.com",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Sarah Wilson",
    role: "Maintenance Engineer",
    email: "sarah@example.com",
    avatar: "/placeholder.svg"
  }
];

const Team = () => {
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#1A1F2C] dark">
        <main className="flex-1 p-8 space-y-8">
          <h1 className="text-2xl font-bold text-white">Team Management</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<Users2 className="w-6 h-6" />}
              title="Team Members"
              value="12"
              change={{ value: "2", positive: true }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<Shield className="w-6 h-6" />}
              title="Active Projects"
              value="8"
              change={{ value: "1", positive: true }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<Clock className="w-6 h-6" />}
              title="Avg. Response Time"
              value="14m"
              change={{ value: "2m", positive: true }}
              className="bg-[#221F26] border-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockTeamMembers.map((member) => (
              <Card key={member.id} className="bg-[#221F26] border-none">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium text-white">{member.name}</h3>
                      <p className="text-sm text-[#8A898C]">{member.role}</p>
                      <p className="text-sm text-[#8A898C]">{member.email}</p>
                    </div>
                  </div>
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

export default Team;