import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardNav } from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent } from "@/components/ui/card";

const mockAlerts = [
  {
    id: "1",
    severity: "critical",
    timestamp: "2 minutes ago",
    message: "Robot-C3 battery critically low",
    robot: "Robot-C3"
  },
  {
    id: "2",
    severity: "warning",
    timestamp: "15 minutes ago",
    message: "Robot-A1 temperature above threshold",
    robot: "Robot-A1"
  },
  {
    id: "3",
    severity: "info",
    timestamp: "1 hour ago",
    message: "Robot-B2 completed maintenance",
    robot: "Robot-B2"
  },
  {
    id: "4",
    severity: "critical",
    timestamp: "2 hours ago",
    message: "Robot-D4 connection lost",
    robot: "Robot-D4"
  }
];

const severityStyles = {
  critical: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500"
};

const Alerts = () => {
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
          <h1 className="text-2xl font-bold text-white">Alert Center</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<Bell className="w-6 h-6" />}
              title="Total Alerts"
              value="24"
              change={{ value: "5", positive: false }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<AlertTriangle className="w-6 h-6" />}
              title="Critical Alerts"
              value="3"
              change={{ value: "1", positive: false }}
              className="bg-[#221F26] border-none"
            />
            <StatCard
              icon={<CheckCircle className="w-6 h-6" />}
              title="Resolved Today"
              value="12"
              change={{ value: "8", positive: true }}
              className="bg-[#221F26] border-none"
            />
          </div>

          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <Card key={alert.id} className="bg-[#221F26] border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${severityStyles[alert.severity as keyof typeof severityStyles]}`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white">{alert.message}</p>
                          <p className="text-sm text-[#8A898C]">{alert.robot}</p>
                        </div>
                        <span className="text-sm text-[#8A898C]">{alert.timestamp}</span>
                      </div>
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

export default Alerts;