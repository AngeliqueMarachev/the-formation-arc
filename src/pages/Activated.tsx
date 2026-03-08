import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";

const PHASES = [
  {
    title: "Line In The Sand™",
    purpose: "Interrupt escalation. Establish internal authority.",
    options: [
      "Breathe. Be calm.",
      "I speak peace to you, oh my soul.",
      "Be still, of whom shall I be afraid?",
      "Gently now, you're okay.",
    ],
  },
  {
    title: "Expose The Mechanism™",
    purpose: "Name what is happening.",
    options: [
      "My nervous system has shifted into hyper-vigilance.",
      "My brain is running an old trauma prediction loop.",
      "This is a protective pattern, not a present danger.",
      "My body is misreading this moment as danger.",
    ],
  },
  {
    title: "Untangle Time™",
    purpose: "Separate past learning from present reality.",
    options: [
      "The season that trained this response is in the past.",
      "I survived that chapter. This is a different moment.",
      "My nervous system is remembering, but I am safe now.",
      "I am not back there. I am here.",
    ],
  },
  {
    title: "Choose Your Agreement™",
    purpose: "Consciously align with truth rather than fear.",
    options: [
      "I recognize this as a stress response and align with God instead of fear.",
      "My body is activated but I belong to a Kingdom of peace.",
      "This is a trauma loop, not a prophecy.",
      "I release agreement with threat and align with truth.",
    ],
  },
  {
    title: "Shepherd Your Soul™",
    purpose: "Lead yourself with gentleness.",
    options: [
      "You're not broken. Your body is protecting you.",
      "You are allowed to need time.",
      "You are learning to stand differently.",
      "Activation does not remove your authority.",
    ],
  },
  {
    title: "Occupy Your Identity™",
    purpose: "Reinforce identity beyond state.",
    options: [
      "I am a child of God.",
      "I belong to God. Fear is not my master.",
      "I am not defined by this state.",
      "The Spirit of God dwells in me.",
    ],
  },
];

type Screen = "entry" | "phase" | "complete";

const Activated = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [screen, setScreen] = useState<Screen>("entry");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [selections, setSelections] = useState<(string | null)[]>(Array(6).fill(null));
  const [customTexts, setCustomTexts] = useState<string[]>(Array(6).fill(""));
  const [useCustom, setUseCustom] = useState<boolean[]>(Array(6).fill(false));
  const [saving, setSaving] = useState(false);

  const handleSelectOption = (option: string) => {
    const next = [...selections];
    next[phaseIndex] = option;
    setSelections(next);
    const nextCustom = [...useCustom];
    nextCustom[phaseIndex] = false;
    setUseCustom(nextCustom);
  };

  const handleCustomToggle = () => {
    const next = [...useCustom];
    next[phaseIndex] = true;
    setUseCustom(next);
    const nextSel = [...selections];
    nextSel[phaseIndex] = null;
    setSelections(nextSel);
  };

  const handleCustomChange = (val: string) => {
    const next = [...customTexts];
    next[phaseIndex] = val;
    setCustomTexts(next);
  };

  const currentSelection = useCustom[phaseIndex]
    ? customTexts[phaseIndex]
    : selections[phaseIndex];

  const canContinue = !!currentSelection && currentSelection.trim().length > 0;

  const handleContinue = () => {
    if (phaseIndex < 5) {
      setPhaseIndex(phaseIndex + 1);
    } else {
      setScreen("complete");
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    const lines: Record<string, string | null> = {};
    for (let i = 0; i < 6; i++) {
      const val = useCustom[i] ? customTexts[i] : selections[i];
      lines[`line_${i + 1}`] = val?.trim() || null;
    }

    await supabase.from("reorient_templates").insert({
      user_id: user.id,
      ...lines,
    });

    // Increment reorient_return_count
    const { data: stats } = await supabase
      .from("usage_stats")
      .select("reorient_return_count")
      .eq("user_id", user.id)
      .single();

    await supabase
      .from("usage_stats")
      .update({ reorient_return_count: (stats?.reorient_return_count ?? 0) + 1 })
      .eq("user_id", user.id);

    setSaving(false);
    navigate("/");
  };

  // ENTRY SCREEN
  if (screen === "entry") {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col justify-center px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">
            When activation rises
          </h1>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Fear accelerates perception.<br />
              It compresses time.<br />
              It predicts threat.<br />
              It prepares your body for survival.
            </p>
            <p>
              This is not spiritual failure.<br />
              It is learned prediction.
            </p>
            <p>You are not here to calm your body.</p>
            <p className="text-foreground font-medium">
              You are here to retrain perception.
            </p>
            <p className="text-muted-foreground">
              Each return interrupts reinforcement<br />
              and strengthens internal authority.
            </p>
          </div>
          <Button
            className="mt-10 w-full"
            size="lg"
            onClick={() => setScreen("phase")}
          >
            Begin
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  // COMPLETION SCREEN
  if (screen === "complete") {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col justify-center px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">
            Your Governance Declaration™
          </h1>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              You did not eliminate activation.<br />
              You governed it.
            </p>
            <p>
              You interrupted reinforcement.<br />
              You updated prediction.<br />
              You reinforced identity.
            </p>
            <p className="text-foreground font-medium">
              Each return strengthens this pathway.
            </p>
          </div>
          <div className="mt-10 space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Reorientation"}
            </Button>
            <Button
              className="w-full"
              size="lg"
              variant="secondary"
              onClick={() => navigate("/")}
            >
              Return Home
            </Button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // PHASE SCREENS
  const phase = PHASES[phaseIndex];

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="px-6 pt-8 pb-2">
        <p className="text-xs text-muted-foreground mb-2">
          Step {phaseIndex + 1} of 6
        </p>
        <Progress value={((phaseIndex + 1) / 6) * 100} className="h-1.5 mb-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          {phase.title}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{phase.purpose}</p>
      </header>

      <main className="flex-1 px-6 pt-4 space-y-3">
        {phase.options.map((option) => {
          const isSelected = !useCustom[phaseIndex] && selections[phaseIndex] === option;
          return (
            <button
              key={option}
              onClick={() => handleSelectOption(option)}
              className={`w-full rounded-lg border p-4 text-left text-sm transition-colors ${
                isSelected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              }`}
            >
              {option}
            </button>
          );
        })}

        {/* Write your own */}
        <div className="pt-2">
          {useCustom[phaseIndex] ? (
            <Textarea
              placeholder="Write your own…"
              value={customTexts[phaseIndex]}
              onChange={(e) => handleCustomChange(e.target.value)}
              className="min-h-[80px]"
              autoFocus
            />
          ) : (
            <button
              onClick={handleCustomToggle}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              + Write your own
            </button>
          )}
        </div>
      </main>

      <div className="px-6 pb-4 pt-2">
        <Button
          className="w-full"
          size="lg"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Activated;
