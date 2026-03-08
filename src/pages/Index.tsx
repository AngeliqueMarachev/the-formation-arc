import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Sun, Anchor } from "lucide-react";
import BottomNav from "@/components/BottomNav";

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

        {/* Stats */}
        <div className="flex gap-6 pt-6 text-sm text-muted-foreground">
          <span>Reorientations: <strong className="text-foreground">{stats?.reorient_return_count ?? 0}</strong></span>
          <span>Anchors: <strong className="text-foreground">{stats?.anchors_created ?? 0}</strong></span>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
