import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const mockHistory = [
  { id: 1, type: "Pre-Market Brief", instrument: "ALL", message: "🌅 Pre-Market Brief\nNIFTY: Gap up +0.4% | FII bought ₹1,200Cr | PCR: 1.12 (Bullish)\nKey Levels: Support 24,400 | Resistance 24,650", time: "09:00", date: "2026-04-05", status: "delivered", recipients: 1247 },
  { id: 2, type: "ORB Signal", instrument: "NIFTY 50", message: "📊 ORB LONG Signal\nNIFTY 50 broke above 24,550 (15m ORB)\nVolume: 1.8x avg | ADX: 32\n⚠️ Educational purpose only", time: "09:32", date: "2026-04-05", status: "delivered", recipients: 1247 },
  { id: 3, type: "VWAP Cross", instrument: "BANK NIFTY", message: "📉 VWAP Short Alert\nBANK NIFTY crossed below VWAP at 51,180\nStd Dev Band: -1σ | Volume confirming\n⚠️ Not investment advice", time: "10:15", date: "2026-04-05", status: "delivered", recipients: 1245 },
  { id: 4, type: "OI Wall", instrument: "NIFTY 50", message: "🧱 OI Wall Detected\nMassive PE OI at 24,400 (8.2L contracts)\nActing as strong support\n⚠️ For informational purposes", time: "11:00", date: "2026-04-05", status: "failed", recipients: 0 },
  { id: 5, type: "Mid-Morning", instrument: "ALL", message: "📊 Mid-Morning Update\nNIFTY: 24,580 (+0.6%) | BN: 51,120 (-0.2%)\nPCR: 1.08 | Max Pain: 24,500\nTrend: Bullish but losing momentum", time: "11:00", date: "2026-04-05", status: "delivered", recipients: 1247 },
  { id: 6, type: "Trend Exhaustion", instrument: "SENSEX", message: "⚠️ Trend Exhaustion\nSENSEX showing RSI divergence at 80,900\nVolume declining 22% from peak\n⚠️ Educational disclaimer applies", time: "12:30", date: "2026-04-05", status: "delivered", recipients: 1240 },
];

const History = () => {
  const [search, setSearch] = useState("");

  const filtered = mockHistory.filter(
    (h) =>
      h.type.toLowerCase().includes(search.toLowerCase()) ||
      h.instrument.toLowerCase().includes(search.toLowerCase()) ||
      h.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Message History</h2>
        <p className="text-sm text-muted-foreground mt-1">All sent alerts and broadcasts</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-border text-foreground"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((msg) => (
          <div key={msg.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs font-mono border-border text-foreground">
                  {msg.type}
                </Badge>
                <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                  {msg.instrument}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{msg.time}</span>
                <span className={`flex items-center gap-1 ${msg.status === "delivered" ? "text-bullish" : "text-bearish"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${msg.status === "delivered" ? "bg-bullish" : "bg-bearish"}`} />
                  {msg.status}
                </span>
                {msg.recipients > 0 && (
                  <span className="text-muted-foreground">({msg.recipients})</span>
                )}
              </div>
            </div>
            <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap leading-relaxed">
              {msg.message}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
