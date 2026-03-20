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
import AnchorIntro from "@/components/AnchorIntro";

type Screen = "anchor-intro" | "reorientation" | "daily-loop" | "create-anchor" | "completion";

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

const DailyFormation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [screen, setScreen] = useState<Screen>("anchor-intro");
  const [loading, setLoading] = useState(true);
  const [glowingLine, setGlowingLine] = useState<number | null>(null);

  const [lines, setLines] = useState<ReorientLines | null>(null);
  const [anchors, setAnchors] = useState<AnchorEntry[]>([]);
  const [currentAnchorIndex, setCurrentAnchorIndex] = useState(0);

  const [sceneText, setSceneText] = useState("");
  const [emotionTags, setEmotionTags] = useState<string[]>([]);
  const [meaningConclusion, setMeaningConclusion] = useState("");
  const [widenedMeaning, setWidenedMeaning] = useState("");
  const [anchorPhrase, setAnchorPhrase] = useState("");
  const [communionAwareness, setCommunionAwareness] = useState("");
  const [whereIsGod, setWhereIsGod] = useState("");
  const [createStep, setCreateStep] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data: templates } = await supabase.
      from("reorient_templates").
      select("line_1, line_2, line_3, line_4, line_5, line_6").
      eq("user_id", user.id).
      order("created_at", { ascending: false }).
      limit(1);

      if (templates && templates.length > 0) {
        setLines(templates[0]);
      }

      const { data: anchorData } = await supabase.
      from("anchor_entries").
      select("id, scene_text, anchor_phrase, session_count").
      eq("user_id", user.id).
      order("session_count", { ascending: true });

      if (anchorData) setAnchors(anchorData);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleDailyLoopDone = async () => {
    if (!user || anchors.length === 0) return;
    const anchor = anchors[currentAnchorIndex];

    await supabase.
    from("anchor_entries").
    update({ session_count: anchor.session_count + 1 }).
    eq("id", anchor.id);

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
      communion_awareness: communionAwareness.trim() ? parseInt(communionAwareness) || null : null,
      where_is_god: whereIsGod.trim() || null
    });

    const { data: stats } = await supabase.
    from("usage_stats").
    select("anchors_created").
    eq("user_id", user.id).
    single();

    await supabase.
    from("usage_stats").
    update({ anchors_created: (stats?.anchors_created ?? 0) + 1 }).
    eq("user_id", user.id);

    setSaving(false);
    setScreen("completion");
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-text-supporting">Loading…</div>;
  }

  // ── ANCHOR INTRO ──
  if (screen === "anchor-intro") {
    return <AnchorIntro onComplete={() => setScreen("reorientation")} />;
  }

  // ── REORIENTATION ──
  if (screen === "reorientation") {
    const hasLines = lines && Object.values(lines).some((v) => v);

    const phases = [
    { title: "LINE IN THE SAND", lineIndex: 0 },
    { title: "EXPOSE THE MECHANISM", lineIndex: 1 },
    { title: "UNTANGLE TIME", lineIndex: 2 },
    { title: "CHOOSE YOUR AGREEMENT", lineIndex: 3 },
    { title: "SHEPHERD YOUR SOUL", lineIndex: 4 },
    { title: "OCCUPY YOUR IDENTITY", lineIndex: 5 }];


    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col px-6 pt-10 pb-12 content-container">
          <h1 className="tracking-tight mb-1">Daily Formation</h1>
          <p className="text-primary font-semibold tracking-wide mb-6 text-lg">​</p>

          <div className="space-y-4 leading-relaxed mb-10">
            <p className="text-text-body text-base text-primary">Stabilise before you build. Settle your system before training.</p>
            <p className="text-text-body text-base">
              Before entering The Anchor Layer, we first signal safety to the nervous system by returning to your Reorientation Engine.        
            </p>
            <p className="text-text-body text-base">
              This immediately signals safety, allowing your body to settle.
            
            </p>
            <p className="text-text-body text-base">
              After this sequence, you will move into The Anchor Layer, where we strengthen new expectations of steadiness.
            </p>
          </div>

          {hasLines ?
          <>
              <p className="font-semibold tracking-widest uppercase mb-1 text-sm text-primary">
                Your Reorientation Engine
              </p>
              <p className="text-text-supporting mb-6 text-sm">Tap each step. Read it slowly.</p>

              <div className="rounded-lg border border-border/50 bg-card/30 p-2 mb-12 space-y-1">
                {phases.map((phase) => {
                const line = Object.values(lines!)[phase.lineIndex];
                if (!line) return null;

                const isReturnPhase = phase.lineIndex === 5;

                return (
                  <button
                    key={phase.lineIndex}
                    onClick={() => {
                      setGlowingLine(phase.lineIndex);
                      setTimeout(() => setGlowingLine((prev) => prev === phase.lineIndex ? null : prev), 800);
                    }}
                    className={`w-full text-left rounded-lg p-4 transition-all duration-300 ${
                    glowingLine === phase.lineIndex ?
                    "bg-primary/10 text-text-heading" :
                    "text-text-body"}`
                    }>
                    
                      <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 text-primary">
                        {phase.title}
                      </p>
                      <p className="text-sm leading-relaxed text-text-heading">{line}</p>
                    </button>);

              })}
              </div>

              <div className="pt-4 space-y-6">
                <div className="text-center">
                  <p className="text-text-body mb-1 font-serif text-xl font-bold">Your system has settled.</p>
                  <p
                  className="text-sm text-text-heading font-normal font-sans"
                  style={{ fontFamily: "'Fraunces', serif" }}>
                  
                    ​
                  </p>
                  <p className="text-text-body mt-3 text-base">
                    You are steady enough to continue. Now you will begin with The Anchor Layer to expand your memories and strengthen your expectations of safety.
                  
                </p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" size="lg" onClick={() => setScreen("create-anchor")}>
                    Find a Memory
                  </Button>
                  <Button className="w-full" size="lg" variant="secondary" onClick={() => navigate("/anchors")}>
                    Browse Anchors
                  </Button>
                </div>
              </div>
            </> :

          <>
              <p className="text-supporting italic mb-10">
                No saved reorientation yet. Complete a reorientation in the Activated tab first.
              </p>
              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => setScreen("create-anchor")}>
                  Find a Memory
                </Button>
                <Button className="w-full" size="lg" variant="secondary" onClick={() => navigate("/anchors")}>
                  Browse Anchors
                </Button>
              </div>
            </>
          }
        </main>
        <BottomNav />
      </div>);

  }

  // ── DAILY ANCHOR LOOP ──
  if (screen === "daily-loop") {
    const anchor = anchors[currentAnchorIndex];
    if (!anchor) {
      setScreen("create-anchor");
      return null;
    }
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col justify-center px-6 py-12 content-container">
          <h1 className="tracking-tight mb-8">Daily Anchor Loop</h1>

          <div className="rounded-lg border bg-card p-5 mb-6 border-secondary">
            <p className="text-xs text-text-supporting uppercase tracking-wider mb-2 text-primary">Scene</p>
            <p className="text-text-heading leading-relaxed mb-4 text-base">{anchor.scene_text}</p>
            <p className="text-xs text-text-supporting uppercase tracking-wider mb-2 text-primary">Anchor Phrase</p>
            <p className="text-text-heading font-medium text-base">{anchor.anchor_phrase}</p>
          </div>

          <p className="text-supporting leading-relaxed mb-10 text-base text-muted-foreground">
            Recall the scene for 10–20 seconds.
            <br />
            Then say the Anchor Phrase once.
          </p>

          <Button className="w-full" size="lg" onClick={handleDailyLoopDone}>
            Done
          </Button>
        </main>
        <BottomNav />
      </div>);

  }

  // ── CREATE NEW ANCHOR ──
  if (screen === "create-anchor") {
    const totalSteps = 4;

    if (createStep === 0) {
      return (
        <>
          <AnchorRecall
            sceneText={sceneText}
            onSceneTextChange={setSceneText}
            emotionTags={emotionTags}
            onEmotionTagsChange={setEmotionTags}
            onContinue={() => setCreateStep(1)}
            totalSteps={totalSteps} />
          

          <BottomNav />
        </>);

    }

    const canProceed = () => {
      if (createStep === 1) return meaningConclusion.trim().length > 0 && widenedMeaning.trim().length > 0;
      if (createStep === 2) return anchorPhrase.trim().length > 0;
      return true;
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
        <header className="px-6 pt-8 pb-2 content-container">
          <p className="text-xs text-text-supporting mb-2">
            Step {createStep + 1} of {totalSteps}
          </p>
          <Progress value={(createStep + 1) / totalSteps * 100} className="h-1.5 mb-6" />
        </header>

        <main className="flex-1 px-6 pt-2 content-container">
          {/* Step 1: Meaning */}
          {createStep === 1 &&
          <div className="space-y-4">
              <h2 className="font-semibold tracking-tight">Expand your conclusion.</h2>
              <p className="text-supporting leading-relaxed">
                Widen your experience. Is there something in this scene, maybe even something about yourself, that you
                didn't notice before?
              </p>
              <Textarea
              placeholder="e.g. I thought I was a sad child, but I was full of life."
              value={meaningConclusion}
              onChange={(e) => setMeaningConclusion(e.target.value)}
              className="min-h-[80px]" />
            

              <Label className="block pt-2">Open your heart.</Label>
              <p className="text-supporting leading-relaxed">
                If God was there with you, what would He be doing? How would you feel if you sensed Him in that moment?
                Is there any kind of exchange between the two of you? Do you want to ask Him anything?
              </p>
              <Textarea
              placeholder="e.g. I saw Jesus thanking God for me!"
              value={widenedMeaning}
              onChange={(e) => setWidenedMeaning(e.target.value)}
              className="min-h-[80px]" />
            
            </div>
          }

          {/* Step 2: Anchor Phrase */}
          {createStep === 2 &&
          <div className="space-y-4">
              <h2 className="font-semibold tracking-tight">Anchor Phrase.</h2>
              <div className="space-y-3 leading-relaxed">
                <p className="text-text-body">Your brain remembers stories.</p>
                <p className="text-text-body">But it stabilizes around summaries.</p>
                <p className="text-text-body">Many memories trained your nervous system to expect something.</p>
                <div className="space-y-1 italic text-text-body">
                  <p>"I am alone."</p>
                  <p>"I am not supported."</p>
                  <p>"I am not enough."</p>
                </div>
                <p className="text-text-heading font-medium">Your Anchor Phrase updates that template.</p>
                <p className="text-text-body">It does not erase the memory.</p>
                <p className="text-text-body">It widens the meaning.</p>
              </div>

              <div className="pt-2">
                <Label className="block mb-2">In that moment, I was ______ — but I ______.</Label>
                <div className="space-y-2 text-xs text-text-supporting mb-4">
                  <p>I believed I was forgotten, but I was not as alone.</p>
                  <p>I felt afraid, yet I endured.</p>
                  <p>I felt abandoned, but I was being championed.</p>
                </div>
                <Textarea
                placeholder="Write your anchor phrase…"
                value={anchorPhrase}
                onChange={(e) => setAnchorPhrase(e.target.value)}
                className="min-h-[80px]" />
              
              </div>
            </div>
          }

          {/* Step 3: Optional fields */}
          {createStep === 3 &&
          <div className="space-y-4">
              <h2 className="font-semibold tracking-tight">Optional reflection.</h2>
              <p className="text-supporting leading-relaxed">These fields are not required. Skip if you prefer.</p>

              <div className="space-y-2">
                <Label>Where was God in this scene?</Label>
                <Textarea
                placeholder="Optional…"
                value={whereIsGod}
                onChange={(e) => setWhereIsGod(e.target.value)}
                className="min-h-[80px]" />
              
              </div>

              <div className="space-y-2">
                <Label>Communion awareness (1–10)</Label>
                <p className="text-xs text-text-supporting">
                  How present did you feel God's nearness while recalling this scene?
                </p>
                <Input
                type="number"
                min={1}
                max={10}
                placeholder="1–10"
                value={communionAwareness}
                onChange={(e) => setCommunionAwareness(e.target.value)} />
              
              </div>
            </div>
          }
        </main>

        <div className="px-6 pb-4 pt-2 space-y-2 content-container">
          <Button className="w-full" size="lg" variant="secondary" onClick={() => setCreateStep(createStep - 1)}>
            Back
          </Button>
          <Button className="w-full" size="lg" disabled={!canProceed() || saving} onClick={handleNext}>
            {saving ? "Saving…" : createStep === totalSteps - 1 ? "Save Anchor" : "Continue"}
          </Button>
        </div>

        <BottomNav />
      </div>);

  }

  // ── COMPLETION ──
  if (screen === "completion") {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col justify-center px-6 py-12 content-container">
          <h1 className="tracking-tight mb-8">Formation accumulates.</h1>
          <div className="space-y-4 leading-relaxed">
            <p className="text-text-body text-base text-secondary-foreground">Today you:</p>
            <ul className="list-disc pl-5 space-y-1 text-text-body">
              <li>Practiced perception governance</li>
              <li>Reopened memory</li>
              <li>Strengthened steadiness</li>
            </ul>
            <p className="text-text-heading font-medium pt-2">
              Each return trains your nervous system to expect stability.
            </p>
            <p className="text-text-body">Small returns create lasting formation.</p>
          </div>

          <Button className="mt-10 w-full" size="lg" onClick={() => navigate("/")}>
            Return home
          </Button>
        </main>
        <BottomNav />
      </div>);

  }

  return null;
};

export default DailyFormation;