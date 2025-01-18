import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Battery, 
  ChevronLeft, 
  Cpu, 
  Signal, 
  Thermometer, 
  Timer, 
  Upload 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardNav } from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { RecentAlerts } from "@/components/recent-alerts";

const mockAlerts = [
  {
    id: "1",
    severity: "warning" as const,
    timestamp: "2 minutes ago",
    message: "Temperature above normal range"
  },
  {
    id: "2",
    severity: "info" as const,
    timestamp: "15 minutes ago",
    message: "Completed maintenance check"
  },
  {
    id: "3",
    severity: "critical" as const,
    timestamp: "1 hour ago",
    message: "Battery level critical"
  }
];

const RobotDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
      <div className="min-h-screen flex w-full bg-background">
        <main className="flex-1 p-8 space-y-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/robots")}
              className="text-muted-foreground hover:text-primary"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Robot-A1</h1>
            <div className="flex items-center gap-2 ml-4">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Battery className="w-6 h-6" />}
              title="Battery Level"
              value="87%"
              change={{ value: "2%", positive: false }}
            />
            <StatCard
              icon={<Thermometer className="w-6 h-6" />}
              title="Temperature"
              value="42°C"
              change={{ value: "3°C", positive: false }}
            />
            <StatCard
              icon={<Signal className="w-6 h-6" />}
              title="Signal Strength"
              value="95%"
              change={{ value: "1%", positive: true }}
            />
            <StatCard
              icon={<Timer className="w-6 h-6" />}
              title="Uptime"
              value="24h"
              change={{ value: "100%", positive: true }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-card-foreground">
                  System Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">CPU Usage</span>
                    <span className="text-card-foreground">45%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full w-[45%] bg-primary rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">RAM Usage</span>
                    <span className="text-card-foreground">32%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full w-[32%] bg-primary rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="text-card-foreground">78%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full w-[78%] bg-primary rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-card-foreground">
                  Current Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-card-foreground">
                        Warehouse Inspection
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Section A-3, Floor 2
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">
                        Progress
                      </p>
                      <p className="text-sm text-muted-foreground">67%</p>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-full w-[67%] bg-primary rounded-full" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Started: 2h ago</span>
                    <span>Est. completion: 1h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-2xl">
            <RecentAlerts alerts={mockAlerts} />
          </div>
        </main>
        <DashboardNav />
      </div>
    </SidebarProvider>
  );
};

export default RobotDetails;