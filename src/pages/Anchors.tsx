import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import BottomNav from "@/components/BottomNav";
import { formatDistanceToNow } from "date-fns";

interface AnchorEntry {
  id: string;
  scene_text: string;
  emotion_tags: string[] | null;
  meaning_conclusion: string | null;
  widened_meaning: string | null;
  anchor_phrase: string;
  communion_awareness: number | null;
  where_is_god: string | null;
  session_count: number;
  created_at: string;
}

type View = "list" | "detail" | "recall-prompt";

const Anchors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [anchors, setAnchors] = useState<AnchorEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("list");
  const [selected, setSelected] = useState<AnchorEntry | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.
    from("anchor_entries").
    select("*").
    eq("user_id", user.id).
    order("created_at", { ascending: false }).
    then(({ data }) => {
      setAnchors(data as AnchorEntry[] ?? []);
      setLoading(false);
    });
  }, [user]);

  const handleRecallDone = async () => {
    if (!selected || !user) return;
    await supabase.
    from("anchor_entries").
    update({ session_count: selected.session_count + 1 }).
    eq("id", selected.id);
    setAnchors((prev) => prev.map((a) => a.id === selected.id ? { ...a, session_count: a.session_count + 1 } : a));
    setSelected(null);
    setView("list");
  };

  // ── Recall Prompt ──
  if (view === "recall-prompt" && selected) {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col items-center justify-center px-6 text-center space-y-8 content-container">
          <p className="text-supporting leading-relaxed max-w-xs">
            Recall the scene for 10–20 seconds.{"\n"}Then say your Anchor Phrase once.
          </p>
          <p className="font-serif text-lg italic text-text-heading max-w-sm">"{selected.anchor_phrase}"</p>
          <Button onClick={handleRecallDone} className="w-full max-w-xs">
            Done
          </Button>
        </main>
        <BottomNav />
      </div>);

  }

  // ── Detail View ──
  if (view === "detail" && selected) {
    const tags: string[] = Array.isArray(selected.emotion_tags) ? selected.emotion_tags : [];

    return (
      <div className="flex min-h-screen flex-col pb-20">
        <header className="px-6 pt-8 pb-2 content-container">
          <button
            onClick={() => {
              setView("list");
              setSelected(null);
            }}
            className="text-sm text-text-supporting mb-4 hover:text-text-heading transition-colors">
            
            ← Back
          </button>
          <h1 className="tracking-tight font-serif">Anchor.</h1>
        </header>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-8 pb-8 content-container">
            <section className="space-y-2">
              <h2 className="text-xs font-medium uppercase tracking-widest text-text-supporting text-primary font-sans">
                Scene
              </h2>
              <p className="text-sm leading-relaxed text-text-heading whitespace-pre-line">{selected.scene_text}</p>
            </section>

            {tags.length > 0 &&
            <section className="space-y-2">
                <h2 className="text-xs font-medium uppercase tracking-widest text-text-supporting text-primary font-sans">
                  Emotional Layer
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) =>
                <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                )}
                </div>
              </section>
            }

            {selected.meaning_conclusion &&
            <section className="space-y-2">
                <h2 className="text-xs font-medium uppercase tracking-widest text-text-supporting font-sans text-primary">
                  Original Meaning
                </h2>
                <p className="text-sm leading-relaxed text-text-heading">{selected.meaning_conclusion}</p>
              </section>
            }

            {selected.widened_meaning &&
            <section className="space-y-2">
                <h2 className="text-xs font-medium uppercase tracking-widest text-text-supporting text-primary font-sans">
                  Widened Meaning
                </h2>
                <p className="text-sm leading-relaxed text-text-heading">{selected.widened_meaning}</p>
              </section>
            }

            <section className="space-y-2">
              <h2 className="text-xs font-medium uppercase tracking-widest text-text-supporting text-primary font-sans">
                Anchor Phrase
              </h2>
              <p className="font-serif text-lg italic text-text-heading">"{selected.anchor_phrase}"</p>
            </section>

            {selected.communion_awareness !== null && selected.communion_awareness !== undefined &&
            <section className="space-y-2">
                <h2 className="text-xs font-medium uppercase tracking-widest text-text-supporting">
                  Communion Awareness
                </h2>
                <p className="text-sm text-text-heading">{selected.communion_awareness} / 10</p>
              </section>
            }

            {selected.where_is_god &&
            <section className="space-y-2">
                <h2 className="text-xs font-medium uppercase tracking-widest text-text-supporting">Where Is God</h2>
                <p className="text-sm leading-relaxed text-text-heading">{selected.where_is_god}</p>
              </section>
            }

            <Button onClick={() => setView("recall-prompt")} className="w-full">
              Recall This Anchor
            </Button>
          </div>
        </ScrollArea>
        <BottomNav />
      </div>);

  }

  // ── List View ──
  const isEmpty = !loading && anchors.length === 0;

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="px-6 pt-8 pb-2 content-container">
        <h1 className="tracking-tight font-serif">The Anchor Library</h1>
        <p className="text-supporting mt-1 text-primary">
          Moments that remind your nervous system what is safe and true.
        </p>
        <p className="text-supporting mt-1">Anchors deepen with repetition. Tap an anchor to revisit the memory. </p>
        <p className="text-supporting mt-1 text-xs">​</p>
      </header>

      {isEmpty ?
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center space-y-4 content-container">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Anchor className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-semibold">You have no Anchors yet</h2>
          <p className="max-w-xs text-supporting">
            Anchors are memories and phrases that help your nervous system remember steadiness. You can create your
            first Anchor in Daily Formation.
          </p>
          <Button onClick={() => navigate("/daily-formation")}>Create your first Anchor</Button>
        </main> :

      <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 pb-4 content-container">
            {anchors.map((anchor) =>
          <Card
            key={anchor.id}
            className="cursor-pointer transition-colors hover:bg-card/80"
            onClick={() => {
              setSelected(anchor);
              setView("detail");
            }}>
            
                <CardContent className="p-5 space-y-3">
                  <p className="text-base leading-relaxed text-primary">
                    {anchor.scene_text.length > 120 ? anchor.scene_text.slice(0, 120) + "…" : anchor.scene_text}
                  </p>
                  <p className="font-serif text-base italic text-text-body">"{anchor.anchor_phrase}"</p>
                  <p className="text-xs text-text-supporting">
                    Created {formatDistanceToNow(new Date(anchor.created_at), { addSuffix: true })}
                  </p>
                </CardContent>
              </Card>
          )}
          </div>
        </ScrollArea>
      }

      <BottomNav />
    </div>);

};

export default Anchors;