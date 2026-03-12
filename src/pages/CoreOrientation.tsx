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
      <div className="content-container space-y-10">
        <h1 className="tracking-tight">
          Formation is cumulative.
        </h1>

        <div className="space-y-1.5 leading-relaxed text-text-body">
          <p>This is not symptom tracking.</p>
          <p>This is not spiritual performance.</p>
          <p>This is not emotional management.</p>
        </div>

        <p className="leading-relaxed text-text-heading font-medium">
          This is building capacity.
        </p>

        <p className="leading-relaxed text-text-body">
          This is perception governance, memory reconsolidation, and identity
          stabilization over time.
        </p>

        <div className="space-y-1 border-l-2 border-primary/40 pl-5 leading-relaxed text-text-heading">
          <p>Fear conditions perception.</p>
          <p>Perception shapes chemistry.</p>
          <p>Chemistry reinforces expectation.</p>
          <p className="font-semibold">Return reshapes expectation.</p>
        </div>

        <div className="space-y-1.5 leading-relaxed text-text-body">
          <p>Use the script during spikes.</p>
          <p>Use the anchor for training.</p>
          <p>Use the tracking to reveal your formation.</p>
        </div>

        <p className="leading-relaxed text-text-body">
          Every time you return, you add to your formation arc.
        </p>

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
