import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Battery, Signal, Thermometer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardNav } from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RobotCard } from "@/components/ui/robot-card";
import { StatCard } from "@/components/ui/stat-card";

const mockRobots = [
  {
    name: "Robot-A1",
    status: "online" as const,
    battery: 87,
    temperature: 42,
    signal: 95
  },
  {
    name: "Robot-B2",
    status: "online" as const,
    battery: 92,
    temperature: 38,
    signal: 88
  },
  {
    name: "Robot-C3",
    status: "error" as const,
    battery: 23,
    temperature: 58,
    signal: 45
  },
  {
    name: "Robot-D4",
    status: "offline" as const,
    battery: 0,
    temperature: 21,
    signal: 0
  }
];

const Robots = () => {
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
          <h1 className="text-2xl font-bold text-white">Robot Fleet</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<Bot className="w-6 h-6" />}
              title="Total Robots"
              value="16"
              change={{ value: "4", positive: true }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<Battery className="w-6 h-6" />}
              title="Average Battery"
              value="76%"
              change={{ value: "2%", positive: false }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<Signal className="w-6 h-6" />}
              title="Network Status"
              value="95%"
              change={{ value: "1%", positive: true }}
              className="bg-[#221F26] border-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockRobots.map((robot) => (
              <RobotCard key={robot.name} {...robot} />
            ))}
          </div>
        </main>
        <DashboardNav />
      </div>
    </SidebarProvider>
  );
};

export default Robots;