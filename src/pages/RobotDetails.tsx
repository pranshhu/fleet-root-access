import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Battery, Camera, ChevronLeft, Cpu, Gauge, MemoryStick as Memory, MonitorPlay, Network, Signal, Thermometer, Activity, Terminal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardNav } from "@/components/DashboardNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import VideoFeed from "@/components/robot-feeds/VideoFeed";
import SensorsFeed from "@/components/robot-feeds/SensorsFeed";
import DiagnosticsFeed from "@/components/robot-feeds/DiagnosticsFeed";

type FeedType = "camera" | "sensors" | "diagnostics";

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
  const [currentFeed, setCurrentFeed] = useState<FeedType>("camera");

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

          {/* Main content */}
          <div className="relative w-full h-screen bg-background p-4">
            <div className="absolute inset-0 p-4">
              {/* Top row - Title and Status */}
              <div className="flex flex-col gap-4 mt-16 px-4 mb-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-white">Robot-A1</h1>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-white/80">Online</span>
                  </div>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center gap-4 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm w-fit text-xs">
                  <div className="flex items-center gap-1.5">
                    <Battery className="h-4 w-4 text-green-500" />
                    <span className="text-white font-medium">87%</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <Thermometer className="h-4 w-4 text-yellow-500" />
                    <span className="text-white font-medium">42°C</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <Signal className="h-4 w-4 text-blue-500" />
                    <span className="text-white font-medium">95%</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <Memory className="h-4 w-4 text-purple-500" />
                    <span className="text-white font-medium">32%</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-emerald-500" />
                    <span className="text-white font-medium">45%</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <MonitorPlay className="h-4 w-4 text-pink-500" />
                    <span className="text-white font-medium">60 FPS</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <Network className="h-4 w-4 text-orange-500" />
                    <span className="text-white font-medium">24ms</span>
                  </div>
                  <div className="w-px h-3 bg-white/20" />
                  <div className="flex items-center gap-1.5">
                    <Gauge className="h-4 w-4 text-indigo-500" />
                    <span className="text-white font-medium">1.2 m/s</span>
                  </div>
                </div>
              </div>

              {/* Feed Selection and Display */}
              <div className="flex-1 mb-4">
                <Tabs value={currentFeed} onValueChange={(value) => setCurrentFeed(value as FeedType)} className="h-full">
                  <TabsList className="bg-black/50 border-none">
                    <TabsTrigger value="camera" className="data-[state=active]:bg-white/10">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        <span>Camera</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="sensors" className="data-[state=active]:bg-white/10">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        <span>Sensors</span>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="diagnostics" className="data-[state=active]:bg-white/10">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        <span>Diagnostics</span>
                      </div>
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4 h-[calc(100%-6rem)]">
                    <TabsContent value="camera" className="h-full m-0">
                      <VideoFeed />
                    </TabsContent>
                    <TabsContent value="sensors" className="h-full m-0">
                      <SensorsFeed />
                    </TabsContent>
                    <TabsContent value="diagnostics" className="h-full m-0">
                      <DiagnosticsFeed />
                    </TabsContent>
                  </div>
                </Tabs>
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