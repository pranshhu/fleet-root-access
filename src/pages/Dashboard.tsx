import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Battery, Bot, Signal, Thermometer, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardNav } from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StatCard } from "@/components/ui/stat-card";
import { RobotCard } from "@/components/ui/robot-card";
import { RecentAlerts } from "@/components/recent-alerts";

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

const mockAlerts = [
  {
    id: "1",
    severity: "critical" as const,
    timestamp: "2 minutes ago",
    message: "Robot-C3 battery critically low"
  },
  {
    id: "2",
    severity: "warning" as const,
    timestamp: "15 minutes ago",
    message: "Robot-A1 temperature above threshold"
  },
  {
    id: "3",
    severity: "info" as const,
    timestamp: "1 hour ago",
    message: "Robot-B2 completed maintenance"
  }
];

const Dashboard = () => {
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
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <StatCard
              icon={<Bot className="w-5 h-5 md:w-6 md:h-6" />}
              title="Active Robots"
              value="12"
              change={{ value: "2.5%", positive: true }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<Activity className="w-5 h-5 md:w-6 md:h-6" />}
              title="Total Missions"
              value="48"
              change={{ value: "10%", positive: true }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<Battery className="w-5 h-5 md:w-6 md:h-6" />}
              title="Avg. Battery"
              value="78%"
              change={{ value: "0.8%", positive: false }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<Signal className="w-5 h-5 md:w-6 md:h-6" />}
              title="Connection Status"
              value="98%"
              change={{ value: "0.2%", positive: true }}
              className="bg-[#221F26] border-none"
            />
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Active Robots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {mockRobots.map((robot) => (
                <RobotCard key={robot.name} {...robot} />
              ))}
            </div>
          </div>

          <div className="w-full max-w-3xl">
            <RecentAlerts alerts={mockAlerts} />
          </div>
        </main>
        <DashboardNav />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;