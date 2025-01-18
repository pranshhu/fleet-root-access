import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, LineChart, PieChart, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardNav } from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
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
          <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Activity className="w-6 h-6" />}
              title="Total Missions"
              value="156"
              change={{ value: "12%", positive: true }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<BarChart className="w-6 h-6" />}
              title="Success Rate"
              value="94%"
              change={{ value: "4%", positive: true }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<LineChart className="w-6 h-6" />}
              title="Efficiency"
              value="87%"
              change={{ value: "2%", positive: true }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<PieChart className="w-6 h-6" />}
              title="Resource Usage"
              value="76%"
              change={{ value: "5%", positive: false }}
              className="bg-[#221F26] border-none"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#221F26] border-none">
              <CardHeader>
                <CardTitle className="text-white">Mission Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  Chart placeholder
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#221F26] border-none">
              <CardHeader>
                <CardTitle className="text-white">Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  Chart placeholder
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <DashboardNav />
      </div>
    </SidebarProvider>
  );
};

export default Analytics;