import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SignalConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  params: Record<string, string>;
}

const defaultSignals: SignalConfig[] = [
  {
    id: "orb",
    name: "Opening Range Breakout (ORB)",
    description: "Triggers at 09:30 IST when price breaks the opening 15-min range with volume confirmation.",
    enabled: true,
    params: { rangeMinutes: "15", volumeMultiplier: "1.5", adxThreshold: "25" },
  },
  {
    id: "vwap",
    name: "VWAP Cross",
    description: "Alerts when price crosses VWAP with standard deviation band confirmation.",
    enabled: true,
    params: { stdDevBands: "2", minDistance: "0.3", cooldownMinutes: "30" },
  },
  {
    id: "oi_wall",
    name: "OI Wall Proximity",
    description: "Detects large OI build-up at strike prices acting as support/resistance.",
    enabled: false,
    params: { oiThreshold: "500000", proximityPercent: "0.5", lookbackStrikes: "5" },
  },
  {
    id: "trend_exhaustion",
    name: "Trend Exhaustion",
    description: "RSI divergence + volume decline to detect trend exhaustion setups.",
    enabled: true,
    params: { rsiOverbought: "70", rsiOversold: "30", volumeDeclinePercent: "20" },
  },
];

const Signals = () => {
  const [signals, setSignals] = useState(defaultSignals);

  const toggleSignal = (id: string) => {
    setSignals((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const updateParam = (signalId: string, key: string, value: string) => {
    setSignals((prev) =>
      prev.map((s) =>
        s.id === signalId ? { ...s, params: { ...s.params, [key]: value } } : s
      )
    );
  };

  const handleSave = () => {
    toast.success("Signal configurations saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Signal Configuration</h2>
          <p className="text-sm text-muted-foreground mt-1">Configure intraday setup detection parameters</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save Changes
        </Button>
      </div>

      <div className="space-y-4">
        {signals.map((signal) => (
          <div key={signal.id} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-foreground">{signal.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    signal.enabled ? "bg-bullish/10 text-bullish" : "bg-muted text-muted-foreground"
                  }`}>
                    {signal.enabled ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{signal.description}</p>
              </div>
              <Switch checked={signal.enabled} onCheckedChange={() => toggleSignal(signal.id)} />
            </div>

            {signal.enabled && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                {Object.entries(signal.params).map(([key, value]) => (
                  <div key={key}>
                    <Label className="text-xs text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Input
                      value={value}
                      onChange={(e) => updateParam(signal.id, key, e.target.value)}
                      className="mt-1 bg-secondary border-border text-foreground font-mono text-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Signals;
