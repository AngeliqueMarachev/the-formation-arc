import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";
import AnchorRecall from "@/components/AnchorRecall";

type Screen =
  | "reorientation"
  | "readiness"
  | "anchor-choice"
  | "daily-loop"
  | "create-anchor"
  | "completion";

interface ReorientLines {
  line_1: string | null;
  line_2: string | null;
  line_3: string | null;
  line_4: string | null;
  line_5: string | null;
  line_6: string | null;
}

interface AnchorEntry {
  id: string;
  scene_text: string;
  anchor_phrase: string;
  session_count: number;
}

// Negative emotions for the old flow are no longer needed here;
// positive emotion tags are handled inside AnchorRecall.

const DailyFormation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [screen, setScreen] = useState<Screen>("reorientation");
  const [loading, setLoading] = useState(true);
  const [glowingLine, setGlowingLine] = useState<number | null>(null);

  // Reorientation lines
  const [lines, setLines] = useState<ReorientLines | null>(null);

  // Existing anchors for daily loop
  const [anchors, setAnchors] = useState<AnchorEntry[]>([]);
  const [currentAnchorIndex, setCurrentAnchorIndex] = useState(0);

  // Create anchor form
  const [sceneText, setSceneText] = useState("");
  const [emotionTags, setEmotionTags] = useState<string[]>([]);
  const [meaningConclusion, setMeaningConclusion] = useState("");
  const [widenedMeaning, setWidenedMeaning] = useState("");
  const [anchorPhrase, setAnchorPhrase] = useState("");
  const [communionAwareness, setCommunionAwareness] = useState("");
  const [whereIsGod, setWhereIsGod] = useState("");
  const [createStep, setCreateStep] = useState(0); // 0=anchor-recall, 1=meaning, 2=anchor phrase, 3=optional
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      // Fetch latest reorientation template
      const { data: templates } = await supabase
        .from("reorient_templates")
        .select("line_1, line_2, line_3, line_4, line_5, line_6")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (templates && templates.length > 0) {
        setLines(templates[0]);
      }

      // Fetch anchors
      const { data: anchorData } = await supabase
        .from("anchor_entries")
        .select("id, scene_text, anchor_phrase, session_count")
        .eq("user_id", user.id)
        .order("session_count", { ascending: true });

      if (anchorData) setAnchors(anchorData);
      setLoading(false);
    };
    fetchData();
  }, [user]);


  const handleDailyLoopDone = async () => {
    if (!user || anchors.length === 0) return;
    const anchor = anchors[currentAnchorIndex];

    // Increment session_count
    await supabase
      .from("anchor_entries")
      .update({ session_count: anchor.session_count + 1 })
      .eq("id", anchor.id);

    setScreen("completion");
  };

  const handleSaveAnchor = async () => {
    if (!user) return;
    setSaving(true);

    await supabase.from("anchor_entries").insert({
      user_id: user.id,
      scene_text: sceneText.trim(),
      emotion_tags: emotionTags,
      meaning_conclusion: meaningConclusion.trim() || null,
      widened_meaning: widenedMeaning.trim() || null,
      anchor_phrase: anchorPhrase.trim(),
      communion_awareness: communionAwareness.trim()
        ? parseInt(communionAwareness) || null
        : null,
      where_is_god: whereIsGod.trim() || null,
    });

    // Increment anchors_created
    const { data: stats } = await supabase
      .from("usage_stats")
      .select("anchors_created")
      .eq("user_id", user.id)
      .single();

    await supabase
      .from("usage_stats")
      .update({ anchors_created: (stats?.anchors_created ?? 0) + 1 })
      .eq("user_id", user.id);

    setSaving(false);
    setScreen("completion");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  // ── STEP 1: REORIENTATION ──
  if (screen === "reorientation") {
    const hasLines = lines && Object.values(lines).some((v) => v);
    
    // Phase structure mapping line indices to phase titles
    const phases = [
      { title: "LINE IN THE SAND™", lineIndex: 0 },
      { title: "INTERRUPT THE LOOP", lineIndex: 1 },
      { title: "ORIENTATION", lineIndex: 2 },
      { title: "GROUNDING", lineIndex: 3 },
      { title: "RESOURCE", lineIndex: 4 },
      { title: "RETURN", lineIndex: 5 },
    ];
    
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col px-6 pt-10 pb-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            Stabilize before you build.
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            Even when calm, you are rehearsing leadership.
          </p>

          {hasLines ? (
            <>
              {/* Section label */}
              <p className="text-[10px] font-semibold tracking-widest text-primary/70 uppercase mb-1">
                Reorientation Script
              </p>
              <p className="text-xs text-muted-foreground/50 mb-6">
                Tap each step slowly.
              </p>

              <div className="space-y-6 mb-12">
                {phases.map((phase) => {
                  const line = Object.values(lines!)[phase.lineIndex];
                  if (!line) return null;
                  
                  const isReturnPhase = phase.lineIndex === 5;
                  
                  return (
                    <button
                      key={phase.lineIndex}
                      onClick={() => {
                        setGlowingLine(phase.lineIndex);
                        setTimeout(() => setGlowingLine((prev) => (prev === phase.lineIndex ? null : prev)), 800);
                      }}
                      className={`w-full text-left rounded-lg border p-5 transition-all duration-300 ${
                        glowingLine === phase.lineIndex
                          ? isReturnPhase
                            ? "border-primary bg-primary/15 text-foreground shadow-lg shadow-primary/20"
                            : "border-primary/50 bg-primary/10 text-foreground shadow-lg shadow-primary/10"
                          : isReturnPhase
                          ? "border-primary/40 bg-primary/8 text-foreground"
                          : "border-border/50 bg-card/50 text-muted-foreground hover:border-primary/20"
                      }`}
                    >
                      <p className="text-[10px] font-semibold tracking-widest text-primary/70 uppercase mb-2">
                        {phase.title}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground">
                        {line}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Completion message and transition */}
              <div className="pt-4 space-y-6">
                <div className="text-center">
                  <p className="text-sm text-foreground/80 mb-1">You returned.</p>
                  <p className="text-sm text-foreground font-medium" style={{ fontFamily: "'Fraunces', serif" }}>
                    You are steady enough to build.
                  </p>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setScreen("readiness")}
                >
                  Begin Anchor
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground italic mb-10">
                No saved reorientation yet. Complete a reorientation in the
                Activated tab first.
              </p>
              <Button
                className="w-full"
                size="lg"
                onClick={() => setScreen("readiness")}
              >
                Continue
              </Button>
            </>
          )}
        </main>
        <BottomNav />
      </div>
    );
  }

  // ── STEP 2: READINESS GATE ──
  if (screen === "readiness") {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col justify-center px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">
            Check your state.
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Memory work requires steadiness.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            If you are activated, return to the reorientation first.
          </p>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => navigate("/activated")}
              style={{
                boxShadow: "0 0 14px rgba(221, 255, 44, 0.25)",
              }}
            >
              Return to Reorientation
            </Button>
            <Button
              className="w-full"
              size="lg"
              variant="secondary"
              onClick={() => setScreen("anchor-choice")}
            >
              I am steady enough
            </Button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // ── STEP 3: ANCHOR LAYER CHOICE ──
  if (screen === "anchor-choice") {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col justify-center px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-6">
            The Anchor Layer™
          </h1>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground mb-10">
            <p>Anchors train the nervous system to expect steadiness.</p>
            <p>
              When a memory is recalled, the neural network briefly becomes
              flexible.
            </p>
            <p>In that window:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>meaning can widen</li>
              <li>prediction can update</li>
              <li>identity detaches from fear</li>
            </ul>
            <p>We are not rewriting the past.</p>
            <p className="text-foreground font-medium">
              We are widening the meaning attached to it.
            </p>
          </div>

          <div className="space-y-3">
            {anchors.length > 0 && (
              <Button
                className="w-full"
                size="lg"
                onClick={() => setScreen("daily-loop")}
              >
                Daily Anchor Loop
              </Button>
            )}
            <Button
              className="w-full"
              size="lg"
              variant={anchors.length > 0 ? "secondary" : "default"}
              onClick={() => setScreen("create-anchor")}
            >
              Create New Anchor
            </Button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // ── DAILY ANCHOR LOOP ──
  if (screen === "daily-loop") {
    const anchor = anchors[currentAnchorIndex];
    if (!anchor) {
      setScreen("anchor-choice");
      return null;
    }
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col justify-center px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">
            Daily Anchor Loop
          </h1>

          <div className="rounded-lg border border-border bg-card p-5 mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Scene
            </p>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              {anchor.scene_text}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Anchor Phrase
            </p>
            <p className="text-sm text-foreground font-medium">
              {anchor.anchor_phrase}
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-10">
            Recall the scene for 10–20 seconds.
            <br />
            Then say the Anchor Phrase once.
          </p>

          <Button className="w-full" size="lg" onClick={handleDailyLoopDone}>
            Done
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  // ── CREATE NEW ANCHOR ──
  if (screen === "create-anchor") {
    const totalSteps = 4; // anchor-recall, meaning, anchor phrase, optional
    
    // Step 0 is handled by AnchorRecall component
    if (createStep === 0) {
      return (
        <>
          <AnchorRecall
            sceneText={sceneText}
            onSceneTextChange={setSceneText}
            emotionTags={emotionTags}
            onEmotionTagsChange={setEmotionTags}
            onContinue={() => setCreateStep(1)}
            totalSteps={totalSteps}
          />
          <BottomNav />
        </>
      );
    }

    const canProceed = () => {
      if (createStep === 1)
        return meaningConclusion.trim().length > 0 && widenedMeaning.trim().length > 0;
      if (createStep === 2) return anchorPhrase.trim().length > 0;
      return true; // optional step
    };

    const handleNext = () => {
      if (createStep < totalSteps - 1) {
        setCreateStep(createStep + 1);
      } else {
        handleSaveAnchor();
      }
    };

    return (
      <div className="flex min-h-screen flex-col pb-20">
        <header className="px-6 pt-8 pb-2">
          <p className="text-xs text-muted-foreground mb-2">
            Step {createStep + 1} of {totalSteps}
          </p>
          <Progress
            value={((createStep + 1) / totalSteps) * 100}
            className="h-1.5 mb-6"
          />
        </header>

        <main className="flex-1 px-6 pt-2">
          {/* Step 1: Meaning */}
          {createStep === 1 && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold tracking-tight">
                Meaning conclusion.
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                What did your nervous system conclude from this experience?
              </p>
              <Textarea
                placeholder="e.g. I am not safe. I am alone."
                value={meaningConclusion}
                onChange={(e) => setMeaningConclusion(e.target.value)}
                className="min-h-[80px]"
              />

              <Label className="block pt-2">Widened meaning</Label>
              <p className="text-sm text-muted-foreground leading-relaxed">
                What is also true — a fuller reading of that moment?
              </p>
              <Textarea
                placeholder="e.g. I was not as alone as I believed."
                value={widenedMeaning}
                onChange={(e) => setWidenedMeaning(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          )}

          {/* Step 2: Anchor Phrase */}
          {createStep === 2 && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold tracking-tight">
                Anchor Phrase
              </h1>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Your brain remembers stories.</p>
                <p>But it stabilizes around summaries.</p>
                <p>
                  Many memories trained your nervous system to expect something.
                </p>
                <div className="space-y-1 italic">
                  <p>"I am alone."</p>
                  <p>"I am not supported."</p>
                  <p>"I am not enough."</p>
                </div>
                <p className="text-foreground font-medium">
                  Your Anchor Phrase updates that template.
                </p>
                <p>It does not erase the memory.</p>
                <p>It widens the meaning.</p>
              </div>

              <div className="pt-2">
                <Label className="block mb-2">
                  In that moment, I was ______ — but I ______.
                </Label>
                <div className="space-y-2 text-xs text-muted-foreground mb-4">
                  <p>
                    I believed I was forgotten — but I was not as alone as I
                    thought.
                  </p>
                  <p>I felt afraid — yet I endured.</p>
                  <p>I felt abandoned — but I was still held.</p>
                </div>
                <Textarea
                  placeholder="Write your anchor phrase…"
                  value={anchorPhrase}
                  onChange={(e) => setAnchorPhrase(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          )}

          {/* Step 3: Optional fields */}
          {createStep === 3 && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold tracking-tight">
                Optional reflection
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These fields are not required. Skip if you prefer.
              </p>

              <div className="space-y-2">
                <Label>Where was God in this scene?</Label>
                <Textarea
                  placeholder="Optional…"
                  value={whereIsGod}
                  onChange={(e) => setWhereIsGod(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Communion awareness (1–10)</Label>
                <p className="text-xs text-muted-foreground">
                  How present did you feel God's nearness while recalling this
                  scene?
                </p>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  placeholder="1–10"
                  value={communionAwareness}
                  onChange={(e) => setCommunionAwareness(e.target.value)}
                />
              </div>
            </div>
          )}
        </main>

        <div className="px-6 pb-4 pt-2 space-y-2">
          <Button
            className="w-full"
            size="lg"
            variant="secondary"
            onClick={() => setCreateStep(createStep - 1)}
          >
            Back
          </Button>
          <Button
            className="w-full"
            size="lg"
            disabled={!canProceed() || saving}
            onClick={handleNext}
          >
            {saving
              ? "Saving…"
              : createStep === totalSteps - 1
              ? "Save Anchor"
              : "Continue"}
          </Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  // ── COMPLETION REINFORCEMENT ──
  if (screen === "completion") {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col justify-center px-6 py-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-8">
            Formation accumulates.
          </h1>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>Today you:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>practiced perception governance</li>
              <li>reopened memory</li>
              <li>strengthened steadiness</li>
            </ul>
            <p className="text-foreground font-medium pt-2">
              Each return trains your nervous system to expect stability.
            </p>
            <p>Small returns create lasting formation.</p>
          </div>

          <Button
            className="mt-10 w-full"
            size="lg"
            onClick={() => navigate("/")}
          >
            Return Home
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return null;
};

export default DailyFormation;
