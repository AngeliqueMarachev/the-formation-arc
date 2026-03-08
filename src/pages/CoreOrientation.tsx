import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CoreOrientation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleEnter = async () => {
    if (!user) return;
    setLoading(true);
    await supabase
      .from("profiles")
      .update({ core_orientation_seen: true } as any)
      .eq("id", user.id);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-8 py-16">
      <div className="mx-auto max-w-md space-y-10">
        {/* Header */}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Formation is cumulative.
        </h1>

        {/* What this is not */}
        <div className="space-y-1.5 text-base leading-relaxed text-muted-foreground">
          <p>This is not symptom tracking.</p>
          <p>This is not spiritual performance.</p>
          <p>This is not emotional management.</p>
        </div>

        {/* What this is */}
        <p className="text-base leading-relaxed text-foreground font-medium">
          This is building capacity.
        </p>

        <p className="text-base leading-relaxed text-muted-foreground">
          This is perception governance, memory reconsolidation, and identity
          stabilization over time.
        </p>

        {/* Thesis */}
        <div className="space-y-1 border-l-2 border-primary/40 pl-5 text-base leading-relaxed text-foreground">
          <p>Fear conditions perception.</p>
          <p>Perception shapes chemistry.</p>
          <p>Chemistry reinforces expectation.</p>
          <p className="font-semibold">Return reshapes expectation.</p>
        </div>

        {/* Systems */}
        <div className="space-y-1.5 text-base leading-relaxed text-muted-foreground">
          <p>Use the script during spikes.</p>
          <p>Use the anchor for training.</p>
          <p>Use the tracking to reveal your formation.</p>
        </div>

        <p className="text-base leading-relaxed text-muted-foreground">
          Every time you return, you add to your formation arc.
        </p>

        {/* Enter */}
        <Button
          onClick={handleEnter}
          disabled={loading}
          className="w-full h-12 text-base"
          size="lg"
        >
          {loading ? "Loading…" : "Enter"}
        </Button>
      </div>
    </div>
  );
};

export default CoreOrientation;
