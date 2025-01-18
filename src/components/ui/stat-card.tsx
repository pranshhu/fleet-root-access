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
    <Card className={cn("p-4 md:p-6 bg-[#221F26] border-gray-800/50", className)}>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="p-2 md:p-3 rounded-lg bg-[#2D2B35] text-gray-400">{icon}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-gray-400 truncate">{title}</p>
          <div className="flex items-center gap-2">
            <h3 className="text-lg md:text-2xl font-bold text-white truncate">{value}</h3>
            {change && (
              <span className={cn(
                "text-xs md:text-sm whitespace-nowrap",
                change.positive ? "text-green-500" : "text-red-500"
              )}>
                {change.positive ? "+" : ""}{change.value}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}