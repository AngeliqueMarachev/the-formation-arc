import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Sun, Anchor } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { formatDistanceToNow } from "date-fns";

const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const { data: stats } = useQuery({
    queryKey: ["usage_stats", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("usage_stats")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  // Get most recent activity date from anchor_entries or reorient_templates
  const { data: lastActivity } = useQuery({
    queryKey: ["last_activity", user?.id],
    queryFn: async () => {
      const [{ data: anchors }, { data: templates }] = await Promise.all([
        supabase
          .from("anchor_entries")
          .select("created_at")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false })
          .limit(1),
        supabase
          .from("reorient_templates")
          .select("created_at")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false })
          .limit(1),
      ]);

      const dates = [
        anchors?.[0]?.created_at,
        templates?.[0]?.created_at,
      ].filter(Boolean) as string[];

      if (dates.length === 0) return null;
      return dates.sort().reverse()[0];
    },
    enabled: !!user,
  });

  // Redirect to onboarding if not yet seen
  if (!profileLoading && profile && !(profile as any).core_orientation_seen) {
    navigate("/onboarding", { replace: true });
    return null;
  }

  const cards = [
    {
      title: "I'm Activated",
      subtitle: "Fear rising. Begin reorientation.",
      icon: Shield,
      path: "/activated",
    },
    {
      title: "Daily Formation",
      subtitle: "Train stability before fear rises.",
      icon: Sun,
      path: "/daily-formation",
    },
    {
      title: "Anchors",
      subtitle: "View your anchor library.",
      icon: Anchor,
      path: "/anchors",
    },
  ];

  const reorientations = stats?.reorient_return_count ?? 0;
  const anchorsCreated = stats?.anchors_created ?? 0;
  const lastActivityLabel = lastActivity
    ? formatDistanceToNow(new Date(lastActivity), { addSuffix: true })
    : "—";

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">The Formation Arc™</h1>
        <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Sign out
        </button>
      </header>

      {/* Cards */}
      <main className="flex-1 px-6 space-y-4 pt-4">
        {cards.map((card) => (
          <Card
            key={card.path}
            className="cursor-pointer transition-colors hover:border-primary/40"
            onClick={() => navigate(card.path)}
          >
            <CardHeader className="flex-row items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary">
                <card.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{card.title}</CardTitle>
                <CardDescription>{card.subtitle}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}

        {/* Formation Progress */}
        <div className="pt-3">
          <Card className="border-none">
            <div className="px-5 pt-4 pb-1 text-center">
              <h3 className="font-medium tracking-tight" style={{ fontFamily: "'Fraunces', serif", fontSize: '16px', letterSpacing: '-0.01em' }}>
                Formation Progress
              </h3>
            </div>
            <div className="px-5 pb-4 pt-3">
              <div className="flex justify-center gap-8">
                {[
                  { value: String(reorientations), label: "Returns" },
                  { value: String(anchorsCreated), label: "Anchors" },
                ].map((metric) => (
                  <div key={metric.label} className="flex flex-col items-center gap-1.5">
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 60,
                        height: 60,
                        border: '1px solid rgba(51, 142, 127, 0.45)',
                        background: 'rgba(51, 142, 127, 0.08)',
                      }}
                    >
                      <span className="text-xl font-medium tracking-tight" style={{ color: '#F8F7F2' }}>
                        {metric.value}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(248, 247, 242, 0.52)' }}>
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs mt-3" style={{ color: 'rgba(248, 247, 242, 0.42)' }}>
                Last active: {lastActivityLabel}
              </p>
            </div>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
