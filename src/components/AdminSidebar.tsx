import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Signal,
  Clock,
  MessageSquare,
  Settings,
  Bot,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/signals", icon: Signal, label: "Signals" },
  { to: "/schedule", icon: Clock, label: "Schedule" },
  { to: "/history", icon: MessageSquare, label: "History" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">TradingBot</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-primary font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-bullish animate-pulse" />
          <span className="text-xs text-muted-foreground">Bot Online</span>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
