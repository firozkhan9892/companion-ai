import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "bullish" | "bearish" | "neutral";
  icon: LucideIcon;
}

const StatCard = ({ title, value, change, changeType = "neutral", icon: Icon }: StatCardProps) => {
  const changeColor = {
    bullish: "text-bullish",
    bearish: "text-bearish",
    neutral: "text-muted-foreground",
  }[changeType];

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-semibold font-mono text-foreground">{value}</span>
        {change && <span className={`text-xs font-medium ${changeColor}`}>{change}</span>}
      </div>
    </div>
  );
};

export default StatCard;
