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
      className="p-4 md:p-6 space-y-3 md:space-y-4 bg-[#221F26] border-gray-800/50 hover:bg-[#2A2730] transition-all cursor-pointer"
      onClick={() => navigate(`/robots/${id}`)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className={cn("w-2 h-2 rounded-full shrink-0", statusColor[status])} />
          <h3 className="font-medium text-white truncate">{name}</h3>
        </div>
        <span className="text-xs md:text-sm text-gray-400 shrink-0">{statusText[status]}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        <div className="flex flex-col items-center gap-1">
          <Battery className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          <span className="text-xs md:text-sm font-medium text-white">{battery}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Thermometer className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          <span className="text-xs md:text-sm font-medium text-white">{temperature}°C</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Signal className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          <span className="text-xs md:text-sm font-medium text-white">{signal}%</span>
        </div>
      </div>
    </Card>
  );
}