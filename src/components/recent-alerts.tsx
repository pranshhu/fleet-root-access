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
    <Card className="bg-[#221F26] border-none">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#403E43]"
          >
            <div className={cn("w-2 h-2 rounded-full", severityStyles[alert.severity])} />
            <div className="flex-1">
              <p className="text-sm text-white">{alert.message}</p>
              <p className="text-xs text-[#8A898C]">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}