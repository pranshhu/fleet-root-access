import { Battery, Signal, Thermometer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RobotCardProps {
  name: string;
  status: "online" | "offline" | "error";
  battery: number;
  temperature: number;
  signal: number;
}

export function RobotCard({ name, status, battery, temperature, signal }: RobotCardProps) {
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
    <Card className="p-6 space-y-4 bg-[#221F26] border-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", statusColor[status])} />
          <h3 className="font-medium text-white">{name}</h3>
        </div>
        <span className="text-sm text-[#8A898C]">{statusText[status]}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1">
          <Battery className="text-[#8A898C]" />
          <span className="text-sm font-medium text-white">{battery}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Thermometer className="text-[#8A898C]" />
          <span className="text-sm font-medium text-white">{temperature}°C</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Signal className="text-[#8A898C]" />
          <span className="text-sm font-medium text-white">{signal}%</span>
        </div>
      </div>
    </Card>
  );
}