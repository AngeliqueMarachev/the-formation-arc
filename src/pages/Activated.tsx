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

type Screen = "loading" | "use-script" | "entry" | "phase" | "complete";

const Activated = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user already has a saved reorientation script
  const { data: existingScript, isLoading: scriptLoading } = useQuery({
    queryKey: ["reorient_script", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("reorient_templates")
        .select("id, line_1, line_2, line_3, line_4, line_5, line_6")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(1);
      return data && data.length > 0 ? data[0] : null;
    },
    enabled: !!user,
  });

  const [screen, setScreen] = useState<Screen>("loading");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [selections, setSelections] = useState<(string | null)[]>(Array(6).fill(null));
  const [customTexts, setCustomTexts] = useState<string[]>(Array(6).fill(""));
  const [useCustom, setUseCustom] = useState<boolean[]>(Array(6).fill(false));
  const [saving, setSaving] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Determine initial screen based on whether a script exists
  useEffect(() => {
    if (scriptLoading) return;
    if (existingScript) {
      setScreen("use-script");
    } else {
      setScreen("entry");
    }
  }, [scriptLoading, existingScript]);

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

  // LOADING SCREEN
  if (screen === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  // USE EXISTING SCRIPT SCREEN
  if (screen === "use-script" && existingScript) {
    const lines = [
      existingScript.line_1,
      existingScript.line_2,
      existingScript.line_3,
      existingScript.line_4,
      existingScript.line_5,
      existingScript.line_6,
    ].filter(Boolean) as string[];

    const handleUseComplete = async () => {
      if (!user) return;
      setSaving(true);
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

    const stepLabels = [
      "LINE IN THE SAND™",
      "EXPOSE THE MECHANISM™",
      "UNTANGLE TIME™",
      "CHOOSE YOUR AGREEMENT™",
      "SHEPHERD YOUR SOUL™",
      "OCCUPY YOUR IDENTITY™",
    ];

    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col px-6 pt-10 pb-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Your Reorientation
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            Read each line slowly. Let each one interrupt the loop.
          </p>

          {/* Vertical step flow */}
          <div className="relative mb-12">
            {lines.map((line, i) => {
              const isActive = activeStep === i;
              return (
                <div key={i} className="relative flex gap-4">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground scale-110"
                        : "border-primary/40 bg-primary/10 text-primary"
                    }`}>
                      {i + 1}
                    </div>
                    {i < lines.length - 1 && (
                      <div className="w-px flex-1 bg-border/50 my-1" />
                    )}
                  </div>

                  {/* Step card */}
                  <button
                    onClick={() => setActiveStep(isActive ? null : i)}
                    className="pb-8 flex-1 text-left"
                  >
                    <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1 transition-colors duration-300 ${
                      isActive ? "text-primary" : "text-primary/70"
                    }`}>
                      {stepLabels[i] || `Step ${i + 1}`}
                    </p>
                    <div className={`rounded-lg border p-4 text-sm leading-relaxed backdrop-blur-sm transition-all duration-300 ${
                      isActive
                        ? "border-primary/60 bg-primary/10 text-foreground scale-[1.02] shadow-lg shadow-primary/5"
                        : "border-border bg-card/60 text-foreground/60 hover:border-primary/30 hover:text-foreground/80"
                    }`}>
                      {line}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={handleUseComplete}
              disabled={saving}
            >
              {saving ? "Saving…" : "I have returned"}
            </Button>
            <Button
              className="w-full"
              size="lg"
              variant="secondary"
              onClick={() => setScreen("entry")}
            >
              Create new script
            </Button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

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
