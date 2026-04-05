import { Signal, MessageSquare, Users, Activity, TrendingUp, TrendingDown } from "lucide-react";
import StatCard from "@/components/StatCard";

const recentAlerts = [
  { id: 1, type: "ORB", instrument: "NIFTY 50", direction: "LONG", time: "09:32 IST", status: "sent" },
  { id: 2, type: "VWAP Cross", instrument: "BANK NIFTY", direction: "SHORT", time: "10:15 IST", status: "sent" },
  { id: 3, type: "OI Wall", instrument: "NIFTY 50", direction: "NEUTRAL", time: "11:00 IST", status: "pending" },
  { id: 4, type: "Trend Exhaustion", instrument: "SENSEX", direction: "SHORT", time: "12:30 IST", status: "sent" },
  { id: 5, type: "VWAP Cross", instrument: "NIFTY 50", direction: "LONG", time: "13:45 IST", status: "failed" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">Live bot overview and today's activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Signals Today" value={18} change="+3 vs yesterday" changeType="bullish" icon={Signal} />
        <StatCard title="Messages Sent" value={142} change="+12%" changeType="bullish" icon={MessageSquare} />
        <StatCard title="Subscribers" value="1,247" change="+28 this week" changeType="bullish" icon={Users} />
        <StatCard title="Bot Uptime" value="99.8%" change="Last 30d" changeType="neutral" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Status */}
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Market Status</h3>
          <div className="space-y-3">
            {[
              { name: "NIFTY 50", value: "24,532.15", change: "+0.82%", up: true },
              { name: "BANK NIFTY", value: "51,245.30", change: "-0.34%", up: false },
              { name: "SENSEX", value: "80,812.45", change: "+0.65%", up: true },
            ].map((idx) => (
              <div key={idx.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{idx.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-foreground">{idx.value}</span>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${idx.up ? "text-bullish" : "text-bearish"}`}>
                    {idx.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {idx.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-foreground mb-4">Recent Alerts</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left pb-3">Type</th>
                  <th className="text-left pb-3">Instrument</th>
                  <th className="text-left pb-3">Direction</th>
                  <th className="text-left pb-3">Time</th>
                  <th className="text-left pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentAlerts.map((alert) => (
                  <tr key={alert.id}>
                    <td className="py-2.5 font-mono text-foreground">{alert.type}</td>
                    <td className="py-2.5 text-foreground">{alert.instrument}</td>
                    <td className="py-2.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                        alert.direction === "LONG" ? "bg-bullish/10 text-bullish" :
                        alert.direction === "SHORT" ? "bg-bearish/10 text-bearish" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {alert.direction}
                      </span>
                    </td>
                    <td className="py-2.5 font-mono text-muted-foreground">{alert.time}</td>
                    <td className="py-2.5">
                      <span className={`w-2 h-2 rounded-full inline-block mr-1.5 ${
                        alert.status === "sent" ? "bg-bullish" :
                        alert.status === "pending" ? "bg-warning" : "bg-bearish"
                      }`} />
                      <span className="text-muted-foreground capitalize">{alert.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
