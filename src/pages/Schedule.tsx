import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { toast } from "sonner";

interface ScheduleItem {
  id: string;
  name: string;
  time: string;
  description: string;
  enabled: boolean;
}

const defaultSchedule: ScheduleItem[] = [
  { id: "pre_market", name: "Pre-Market Brief", time: "09:00", description: "FII/DII data, global cues, gap analysis, key levels for the day", enabled: true },
  { id: "orb_alert", name: "ORB Alert Window", time: "09:30", description: "Opening range breakout signals for Nifty & Bank Nifty", enabled: true },
  { id: "mid_morning", name: "Mid-Morning Update", time: "11:00", description: "VWAP status, OI analysis, PCR update, trend status", enabled: true },
  { id: "afternoon", name: "Afternoon Scan", time: "13:30", description: "Trend exhaustion check, max pain analysis, position summary", enabled: false },
  { id: "eod_report", name: "EOD Report", time: "15:45", description: "Day summary, P&L tracking, next-day outlook, FII/DII flow", enabled: true },
];

const Schedule = () => {
  const [schedule, setSchedule] = useState(defaultSchedule);

  const toggleSchedule = (id: string) => {
    setSchedule((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  const updateTime = (id: string, time: string) => {
    setSchedule((prev) => prev.map((s) => (s.id === id ? { ...s, time } : s)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Broadcast Schedule</h2>
          <p className="text-sm text-muted-foreground mt-1">Configure daily timed broadcasts (IST)</p>
        </div>
        <Button onClick={() => toast.success("Schedule saved")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save Schedule
        </Button>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[23px] top-8 bottom-8 w-px bg-border" />

        <div className="space-y-4">
          {schedule.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="flex flex-col items-center pt-5">
                <div className={`w-3 h-3 rounded-full border-2 z-10 ${
                  item.enabled ? "border-primary bg-primary" : "border-border bg-card"
                }`} />
              </div>
              <div className={`flex-1 bg-card border rounded-lg p-5 transition-opacity ${
                item.enabled ? "border-border opacity-100" : "border-border/50 opacity-60"
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{item.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <Input
                          type="time"
                          value={item.time}
                          onChange={(e) => updateTime(item.id, e.target.value)}
                          className="w-24 h-7 text-xs font-mono bg-secondary border-border text-foreground"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch checked={item.enabled} onCheckedChange={() => toggleSchedule(item.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
