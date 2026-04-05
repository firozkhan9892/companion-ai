import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BotSettings = () => {
  const [chatId, setChatId] = useState("-1001234567890");
  const [botToken, setBotToken] = useState("••••••••••:AAAAAAAAAAAAAAAAAAAA");
  const [disclaimer, setDisclaimer] = useState(
    "⚠️ Disclaimer: This signal is for educational and informational purposes only. It does not constitute investment advice or a recommendation to buy/sell any securities. Trading involves risk. Please consult a SEBI-registered advisor before making investment decisions."
  );
  const [adxFilter, setAdxFilter] = useState("20");
  const [cooldown, setCooldown] = useState("15");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">Bot configuration and SEBI compliance</p>
        </div>
        <Button onClick={() => toast.success("Settings saved")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Telegram Config */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Telegram Configuration</h3>
          <div>
            <Label className="text-xs text-muted-foreground">Bot Token</Label>
            <Input value={botToken} onChange={(e) => setBotToken(e.target.value)} type="password" className="mt-1 bg-secondary border-border text-foreground font-mono" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Channel/Group Chat ID</Label>
            <Input value={chatId} onChange={(e) => setChatId(e.target.value)} className="mt-1 bg-secondary border-border text-foreground font-mono" />
          </div>
        </div>

        {/* Global Filters */}
        <div className="bg-card border border-border rounded-lg p-5 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Global Filters</h3>
          <div>
            <Label className="text-xs text-muted-foreground">Minimum ADX Threshold</Label>
            <Input value={adxFilter} onChange={(e) => setAdxFilter(e.target.value)} className="mt-1 bg-secondary border-border text-foreground font-mono" />
            <p className="text-xs text-muted-foreground mt-1">Signals suppressed when ADX is below this value (choppy market filter)</p>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Signal Cooldown (minutes)</Label>
            <Input value={cooldown} onChange={(e) => setCooldown(e.target.value)} className="mt-1 bg-secondary border-border text-foreground font-mono" />
            <p className="text-xs text-muted-foreground mt-1">Minimum gap between signals for the same instrument</p>
          </div>
        </div>

        {/* SEBI Disclaimer */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">SEBI Compliance Disclaimer</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-warning/10 text-warning font-medium">Required</span>
          </div>
          <Textarea
            value={disclaimer}
            onChange={(e) => setDisclaimer(e.target.value)}
            className="bg-secondary border-border text-foreground text-sm min-h-[100px]"
          />
          <p className="text-xs text-muted-foreground">This disclaimer is appended to every signal message per SEBI regulations. Framing signals as tips or advice is prohibited.</p>
        </div>
      </div>
    </div>
  );
};

export default BotSettings;
