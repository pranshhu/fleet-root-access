import { Battery, Signal, Thermometer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RobotCardProps {
  id?: string;
  name: string;
  status: "online" | "offline" | "error";
  battery: number;
  temperature: number;
  signal: number;
}

export function RobotCard({ id = "1", name, status, battery, temperature, signal }: RobotCardProps) {
  const navigate = useNavigate();
  
  const statusColor = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    error: "bg-red-500"
  };

  const statusText = {
    online: "Online",
    offline: "Offline",
    error: "Error"
  };

  return (
    <Card 
      className="p-6 space-y-4 bg-card border-border cursor-pointer hover:bg-secondary/50 transition-colors"
      onClick={() => navigate(`/robots/${id}`)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", statusColor[status])} />
          <h3 className="font-medium text-card-foreground">{name}</h3>
        </div>
        <span className="text-sm text-muted-foreground">{statusText[status]}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1">
          <Battery className="text-muted-foreground" />
          <span className="text-sm font-medium text-card-foreground">{battery}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Thermometer className="text-muted-foreground" />
          <span className="text-sm font-medium text-card-foreground">{temperature}°C</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Signal className="text-muted-foreground" />
          <span className="text-sm font-medium text-card-foreground">{signal}%</span>
        </div>
      </div>
    </Card>
  );
}