import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ icon, title, value, change, className }: StatCardProps) {
  return (
    <Card className={cn("p-6 flex items-center gap-4", className)}>
      <div className="p-3 rounded-lg bg-muted text-muted-foreground">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          {change && (
            <span className={cn(
              "text-sm",
              change.positive ? "text-green-500" : "text-red-500"
            )}>
              {change.positive ? "+" : ""}{change.value}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}