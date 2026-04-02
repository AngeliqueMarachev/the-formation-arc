import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const skipIntro = searchParams.get("skip_intro") === "true";
  const screenParam = searchParams.get("screen");
  const [screen, setScreen] = useState<Screen>(
    screenParam === "create-anchor" ? "create-anchor" : skipIntro ? "reorientation" : "anchor-intro",
  );
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
  const [anchorTitle, setAnchorTitle] = useState("");
  const [communionAwareness, setCommunionAwareness] = useState("");
  const [whereIsGod, setWhereIsGod] = useState("");
  const [flowText, setFlowText] = useState("");
  const [createStep, setCreateStep] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [createStep]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data: templates } = await supabase
        .from("reorient_templates")
        .select("line_1, line_2, line_3, line_4, line_5, line_6")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (templates && templates.length > 0) {
        setLines(templates[0]);
      }

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
      anchor_title: anchorTitle.trim() || null,
      scene_text: sceneText.trim(),
      emotion_tags: emotionTags,
      meaning_conclusion: meaningConclusion.trim() || null,
      widened_meaning: widenedMeaning.trim() || null,
      anchor_phrase: anchorPhrase.trim(),
      communion_awareness: communionAwareness.trim() ? parseInt(communionAwareness) || null : null,
      where_is_god: whereIsGod.trim() || null,
    });

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
      { title: "OCCUPY YOUR IDENTITY", lineIndex: 5 },
    ];

    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col px-6 pt-10 pb-12 content-container">
          <h1 className="tracking-tight mb-1">Daily Formation begins with stability </h1>
          <div className="mb-6" />

          {hasLines ? (
            <div className="space-y-4 leading-relaxed mb-10">
              <p className="text-text-body text-lg">
                Your body responds to signals of safety before conscious thoughts fully form.
              </p>
              <p>
                Much of what determines whether you feel fear or peace happens below conscious awareness, in systems
                designed to keep you safe.
              </p>
              <p>The nervous system responds strongly to perceived:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>safety</li>
                <li>connection</li>
                <li>support</li>
                <li>protection</li>
                <li>meaning</li>
              </ul>
              <p className="text-primary">
                The act of prayer is a powerful signal to your system that you are seen, held and supported.
              </p>
              <p>
                When the system senses support, internal pressure often decreases.
              </p>
              <p>Reduced pressure allows the system to soften.</p>
              <p>A softened system becomes more receptive to change.</p>
              <p>You do not need the right words.
              <br />You do not need the right feeling.</p>
              <p className="text-primary font-medium">Pause and entrust God with the outcomes of this moment.</p>

              <div className="pt-6">
                <Button className="w-full" size="lg" onClick={() => navigate("/reorientation-rehearsal")}>
                  I've given this to God
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    sessionStorage.setItem("flow_source", "daily_formation");
                    navigate("/activated");
                  }}
                >
                  Create Reorientation
                </Button>
              </div>
            </>
          )}
        </main>
        <BottomNav />
      </div>
    );
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
      </div>
    );
  }

  // ── CREATE NEW ANCHOR ──
  if (screen === "create-anchor") {
    const totalSteps = 4;

    if (createStep === 0) {
      return (
        <>
          <AnchorRecall
            anchorTitle={anchorTitle}
            onAnchorTitleChange={setAnchorTitle}
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
          <Progress value={((createStep + 1) / totalSteps) * 100} className="h-1.5 mb-6" />
        </header>

        <main className="flex-1 px-6 pt-2 content-container">
          {/* Step 1: Meaning */}
          {createStep === 1 && (
            <div className="space-y-4">
              <h1 className="tracking-tight">Expand your conclusion</h1>
              <p className="text-supporting leading-relaxed">
                Widen this moment gently. Notice what changes as you reflect, consider God's presence, and tangibly experience the moment.
              </p>

              {/* Vertical pathway container */}
              <div className="relative">
                {/* Section 1: EXPANSION */}
                <div className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 shrink-0 rounded-full border border-primary/30 bg-primary/10" />
                    <div className="w-px flex-1 bg-border/40 my-1" />
                  </div>
                  <div className="pb-8 flex-1">
                    <h2 className="font-medium text-primary font-sans text-base">EXPANSION</h2>
                    <p className="text-supporting leading-relaxed mt-2">
                      Widen your experience. Is there something in this scene, maybe even something about yourself, that you
                      didn't notice before?
                    </p>
                    <Textarea
                      placeholder="e.g. I thought I was a sad child, but I was full of life."
                      value={meaningConclusion}
                      onChange={(e) => setMeaningConclusion(e.target.value)}
                      className="min-h-[80px] text-sm text-muted-foreground mt-2"
                    />
                  </div>
                </div>

                {/* Section 2: PRESENCE */}
                <div className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 shrink-0 rounded-full border border-primary/30 bg-primary/10" />
                    <div className="w-px flex-1 bg-border/40 my-1" />
                  </div>
                  <div className="pb-8 flex-1">
                    <h2 className="font-medium text-primary font-sans text-base">PRESENCE</h2>
                    <p className="text-supporting leading-relaxed mt-2">
                      If God felt near in this moment, what might that have been like? How would you feel if you sensed Him? Is there any kind of exchange? Do you want to ask Him anything?
                    </p>
                    <Textarea
                      placeholder="e.g. I saw Jesus thanking God for me!"
                      value={widenedMeaning}
                      onChange={(e) => setWidenedMeaning(e.target.value)}
                      className="min-h-[80px] text-sm mt-2"
                    />
                  </div>
                </div>

                {/* Section 3: NEARNESS */}
                <div className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 shrink-0 rounded-full border border-primary/30 bg-primary/10" />
                    <div className="w-px flex-1 bg-border/40 my-1" />
                  </div>
                  <div className="pb-8 flex-1">
                    <h2 className="font-medium text-primary font-sans text-base">NEARNESS</h2>
                    <p className="text-supporting leading-relaxed mt-2">
                      How present did you feel God's nearness while recalling this scene?
                    </p>
                    <div className="mt-2">
                      <div className="relative flex items-center justify-between px-4 w-full">
                        <div
                          className="absolute top-1/2 -translate-y-1/2"
                          style={{
                            height: "2px",
                            backgroundColor: "rgba(248,247,242,0.25)",
                            left: "calc(1rem + 16px)",
                            right: "calc(1rem + 16px)",
                          }}
                        />
                        {communionAwareness && Number(communionAwareness) >= 1 && (
                          <div
                            className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                            style={{
                              height: "2px",
                              backgroundColor: "hsl(var(--primary) / 0.9)",
                              left: "calc(1rem + 16px)",
                              width: `calc((100% - 2rem - 32px) * ${(Number(communionAwareness) - 1) / 9})`,
                            }}
                          />
                        )}
                        {Array.from({ length: 10 }, (_, i) => {
                          const value = i + 1;
                          const isFilled = communionAwareness !== "" && value <= Number(communionAwareness);
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setCommunionAwareness(String(value))}
                              className="relative flex items-center justify-center w-8 h-8
                            >
                              <span
                                className={`block rounded-full transition-all duration-200 ${
                                  isFilled ? "bg-primary border-2 border-primary" : "bg-background border-2"
                                }`}
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  ...(!isFilled ? { borderColor: "rgba(248,247,242,0.45)" } : {}),
                                }}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex justify-between px-4 mt-2">
                        <span className="text-sm text-text-supporting">Distant</span>
                        <span className="text-sm text-text-supporting">Deeply present</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: INTEGRATION */}
                <div className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 shrink-0 rounded-full border border-primary/30 bg-primary/10" />
                    <div className="w-px flex-1 bg-border/40 my-1" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-medium text-primary font-sans text-base">INTEGRATION</h2>
                    <p className="text-supporting leading-relaxed mt-2">
                      Stay with the feeling of this moment.
                      <br />
                      Imagine this experience as a texture, color, or form.
                    </p>
                    <Textarea
                      placeholder="e.g. Warm gold light, cool water, soft air, gentle warmth"
                      value={flowText}
                      onChange={(e) => setFlowText(e.target.value)}
                      className="min-h-[80px] text-sm mt-2"
                    />
                    <p className="text-supporting leading-relaxed mt-2">
                      Imagine this sense of steadiness slowly moving through your body from head to toe.
                    </p>
                    <p className="text-supporting leading-relaxed mt-1">
                      Allow the body to recognise this experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Anchor Phrase */}
          {createStep === 2 && (
            <div className="space-y-4">
              <h2 className="font-semibold tracking-tight text-3xl">Create an Anchor Phrase</h2>
              <div className="space-y-3 leading-relaxed">
                <p className="text-text-body text-primary">
                  Your brain remembers stories. But it stabilizes around summaries.{" "}
                </p>
                <p className="text-text-body">​Many memories trained your nervous system to expect something.</p>
                <p className="text-text-body"></p>
                <div className="space-y-1 text-text-body">
                  <p className="text-text-body">I am alone.</p>
                  <p className="text-text-body">I am not supported.</p>
                  <p className="text-text-body">I am not enough.</p>
                </div>
                <p className="font-normal text-primary">Your Anchor Phrase updates that template.</p>
                <p className="text-text-body">It does not erase the memory. It widens the meaning. </p>
                <p className="text-text-body">Examples of Anchor Phrases: </p>
              </div>

              <div className="pt-2">
                <div className="space-y-2 text-xs text-text-supporting mb-4">
                  <p className="text-text-body">I believed I was forgotten, but I was not as alone.</p>
                  <p className="text-text-body">I felt afraid, yet I endured.</p>
                  <p className="text-text-body">I felt abandoned, but I was being championed.</p>
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

          {/* Step 3: Use your Anchor Phrase */}
          {createStep === 3 && (
            <div>
              <h2 className="font-semibold tracking-tight text-3xl mb-6">Use your Anchor Phrase</h2>

              {/* WHAT THIS IS FOR */}
              <div className="mb-10">
                <p className="text-text-body leading-relaxed mb-4">
                  This phrase helps your nervous system remember what this moment meant.
                </p>
                <p className="text-text-body leading-relaxed">
                  It isn't something you repeat all day. It has three specific uses.
                </p>
              </div>

              {/* WHEN TO USE IT */}
              <div className="mb-10">
                <div className="mb-8">
                  <p className="text-primary font-semibold text-base uppercase mt-8 mb-3">DAILY MOMENT</p>
                  <p className="text-text-body leading-relaxed mb-4">
                    Attach it to one daily moment that already happens, for example:
                  </p>
                  <div className="text-text-body text-sm space-y-1 pl-1">
                    <p>– Before you brush your teeth</p>
                    <p>– When you close your laptop</p>
                    <p>– After you get into bed</p>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-primary font-semibold text-base uppercase mt-8 mb-3">
                    DURING MOMENTS OF CONTRACTION
                  </p>
                  <p className="text-text-body leading-relaxed mb-4">
                    Use your phrase when your system begins to tighten, for example:
                  </p>
                  <div className="text-text-body text-sm space-y-1 pl-1">
                    <p>– Tension</p>
                    <p>– Shame</p>
                    <p>– Fear</p>
                  </div>
                </div>

                <div>
                  <p className="text-primary font-semibold text-base uppercase mt-8 mb-3">WHEN OLD THOUGHTS RETURN</p>
                  <p className="text-text-body leading-relaxed mb-4">
                    Use your phrase when old thinking patterns arise, for example:
                  </p>
                  <div className="text-text-body text-sm space-y-1 pl-1">
                    <p>– I am alone.</p>
                    <p>– I am not enough.</p>
                    <p>– This will end badly.</p>
                  </div>
                </div>
              </div>

              {/* HOW TO USE IT */}
              <div className="mt-10 rounded-2xl p-6 border border-solid bg-muted border-secondary">
                <p className="text-muted-foreground font-semibold text-base mb-5">IN THAT MOMENT</p>
                <div className="text-text-body space-y-4" style={{ lineHeight: "1.7" }}>
                  <p className="font-medium">Pause for 10 seconds.</p>
                  <p>Recall the memory briefly.</p>
                  <p>Say your phrase once.</p>
                </div>
                <div className="mt-8">
                  <p className="text-text-body leading-relaxed">A wider meaning sits inside a narrow moment.</p>
                </div>
              </div>

              <p className="text-text-heading font-medium mt-8 py-0 my-[33px]">
                Over time, the nervous system begins to expect steadiness.
              </p>
            </div>
          )}
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
      </div>
    );
  }

  // ── COMPLETION ──
  if (screen === "completion") {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col justify-center px-6 py-12 content-container">
          <h1 className="tracking-tight mb-8 text-lg">Such as fear, tension, shame, or sudden loneliness.</h1>
          <div className="space-y-4 leading-relaxed">
            <p className="text-text-body text-base text-secondary-foreground">Today you:</p>
            <ul className="list-disc pl-5 space-y-1 text-text-body">
              <li>Interrupted automatic threat prediction</li>
              <li>Stabilized a meaningful memory</li>
              <li>Strengthened steadiness</li>
            </ul>
            <p className="text-primary font-medium pt-2">Each return trains your nervous system to expect stability.</p>
            <p className="text-text-body">Small returns create lasting formation.</p>
          </div>

          <Button
            className="mt-10 w-full"
            size="lg"
            onClick={() => {
              sessionStorage.removeItem("flow_source");
              navigate("/");
            }}
          >
            Carry this forward
          </Button>
        </main>
        <BottomNav />
      </div>
    );
  }

  return null;
};

export default DailyFormation;
