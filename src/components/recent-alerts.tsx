import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  message: string;
}

interface RecentAlertsProps {
  alerts: Alert[];
}

export function RecentAlerts({ alerts }: RecentAlertsProps) {
  const severityStyles = {
    critical: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500"
  };

  return (
    <Card className="bg-[#221F26] border-gray-800/50">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl font-medium text-white">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#2D2B35]"
          >
            <div className={cn("w-2 h-2 rounded-full shrink-0", severityStyles[alert.severity])} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{alert.message}</p>
              <p className="text-xs text-gray-400">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}