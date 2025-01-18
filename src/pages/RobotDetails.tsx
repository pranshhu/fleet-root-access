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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      <div className="min-h-screen flex w-full bg-background dark">
        <main className="flex-1 relative">
          {/* Back button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/robots")}
            className="absolute top-4 left-4 z-50 text-white bg-black/50 hover:bg-black/60"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Video feed container */}
          <div className="relative w-full h-screen bg-black">
            {/* Placeholder for video feed - replace with actual video component */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Live Robot Feed
            </div>

            {/* Overlay container */}
            <div className="absolute inset-0 p-4">
              {/* Top row - Title and Status */}
              <div className="flex items-center gap-6 mb-8 mt-16 px-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-white">Robot-A1</h1>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-white/80">Online</span>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center gap-6 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-green-500" />
                    <span className="text-white font-medium">87%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-yellow-500" />
                    <span className="text-white font-medium">42°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Signal className="h-5 w-5 text-blue-500" />
                    <span className="text-white font-medium">95%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-purple-500" />
                    <span className="text-white font-medium">45%</span>
                  </div>
                </div>
              </div>

              {/* Stats overlay - right side */}
              <div className="absolute top-24 right-4 space-y-4 w-80">
                {/* System Resources */}
                <Card className="bg-black/50 border-0 backdrop-blur-sm text-white p-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      System Resources
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU</span>
                          <span>45%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full">
                          <div className="h-full w-[45%] bg-purple-500 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>RAM</span>
                          <span>32%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full">
                          <div className="h-full w-[32%] bg-purple-500 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage</span>
                          <span>78%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full">
                          <div className="h-full w-[78%] bg-purple-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Alerts overlay - bottom */}
              <div className="absolute bottom-4 left-4 right-4">
                <Card className="bg-black/50 border-0 backdrop-blur-sm text-white p-4">
                  <h3 className="font-semibold mb-3">Recent Alerts</h3>
                  <div className="space-y-2">
                    {mockAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div 
                          className={cn(
                            "w-2 h-2 rounded-full",
                            alert.severity === "critical" && "bg-red-500",
                            alert.severity === "warning" && "bg-yellow-500",
                            alert.severity === "info" && "bg-blue-500"
                          )}
                        />
                        <span className="flex-1">{alert.message}</span>
                        <span className="text-white/60">{alert.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <DashboardNav />
      </div>
    </SidebarProvider>
  );
};

export default RobotDetails;