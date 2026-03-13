import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AnchorRecallProps {
  sceneText: string;
  onSceneTextChange: (val: string) => void;
  emotionTags: string[];
  onEmotionTagsChange: (tags: string[]) => void;
  onContinue: () => void;
  totalSteps: number;
}

type MemoryCategory =
  | "before-life-changed"
  | "places-you-loved"
  | "activities-that-felt-free"
  | null;

const CATEGORIES: { id: MemoryCategory; label: string; description: string }[] = [
  {
    id: "before-life-changed",
    label: "Things you remember before life changed",
    description: "Early memories that carry warmth or weight",
  },
  {
    id: "places-you-loved",
    label: "Places you used to love",
    description: "Spaces where you once felt at home",
  },
  {
    id: "activities-that-felt-free",
    label: "Activities that once felt free",
    description: "Moments of play, ease, or unselfconsciousness",
  },
];

const SCENE_SUGGESTIONS: Record<string, string[]> = {
  "before-life-changed": [
    "A birthday party you enjoyed",
    "A holiday you fondly celebrated",
    "A park you used to play at",
    "Your childhood backyard",
    "The smell of breakfast on a Saturday morning",
    "Something else",
  ],
  "places-you-loved": [
    "The beach on vacation with your family",
    "Your grandmother's garden",
    "A forest you used to wander",
    "A home where you felt welcome",
    "Something else",
  ],
  "activities-that-felt-free": [
    "Climbing a tree",
    "Swinging without a concern in the world",
    "Building an imaginary world",
    "Making mud pies with your sister",
    "Building a sand castle",
    "Lying on the floor listening to your favorite band",
    "Dancing for an audience of one",
    "Playing with your pet",
    "Gardening",
    "Basking quietly in the sun",
    "Something else",
  ],
};

const EMOTION_OPTIONS = [
  "Relaxed", "Free", "Curious", "Safe", "Excited",
  "Peaceful", "Small", "Strong", "Seen",
];

const AnchorRecall = ({
  sceneText,
  onSceneTextChange,
  emotionTags,
  onEmotionTagsChange,
  onContinue,
  totalSteps,
}: AnchorRecallProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MemoryCategory>(null);
  const [selectedScene, setSelectedScene] = useState<string | null>(null);

  const toggleEmotion = (tag: string) => {
    onEmotionTagsChange(
      emotionTags.includes(tag)
        ? emotionTags.filter((t) => t !== tag)
        : [...emotionTags, tag]
    );
  };

  const handleSceneSelect = (scene: string) => {
    if (scene === "Something else") {
      setSelectedScene("Something else");
    } else {
      setSelectedScene(scene);
    }
  };

  const canContinue = sceneText.trim().length > 0 && emotionTags.length > 0;

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="px-6 pt-8 pb-2 content-container">
        <p className="text-xs text-text-supporting mb-2">Step 1 of {totalSteps}</p>
        <Progress value={(1 / totalSteps) * 100} className="h-1.5 mb-6" />
      </header>

      <main className="flex-1 px-6 pt-2 space-y-8 pb-4 content-container">
        {/* Header */}
        <div>
          <h1 className="tracking-tight">
            Recall a Scene.
            {selectedScene && selectedScene !== "Something else" && (
              <span className="block text-lg font-normal text-text-supporting mt-1">
                {selectedScene}
              </span>
            )}
          </h1>
          <p className="text-supporting leading-relaxed mt-3">
            Describe a memory that still carries weight.
            <br />
            It does not need to be dramatic, just sincere.
          </p>
        </div>

        {/* Memory Gateway — category cards */}
        {!selectedScene && !selectedCategory && (
          <div className="space-y-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="w-full rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40 active:bg-accent/10"
              >
                <p className="text-sm font-medium text-text-heading leading-snug">
                  {cat.label}
                </p>
                <p className="text-xs text-text-supporting mt-1">
                  {cat.description}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Scene suggestions */}
        {!selectedScene && selectedCategory && (
          <div className="space-y-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs text-text-supporting hover:text-text-heading transition-colors"
            >
              ← Back to categories
            </button>
            <div className="flex flex-wrap gap-2">
              {SCENE_SUGGESTIONS[selectedCategory]!.map((scene) => (
                <button
                  key={scene}
                  onClick={() => handleSceneSelect(scene)}
                  className="rounded-full border border-border px-4 py-2 text-xs text-text-supporting transition-colors hover:border-primary/40 hover:text-text-heading"
                >
                  {scene}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Visualization guidance + writing field */}
        {selectedScene && (
          <>
            <div className="space-y-4 leading-relaxed">
              <p className="text-text-heading font-medium">Slow this moment down.</p>
              <p className="text-text-body">
                You are not remembering an entire season of life.
                <br />
                Just one scene.
              </p>
              <p className="text-text-body">Where are you?</p>
              <p className="text-text-body">What time of day is it?</p>
              <p className="text-text-body">Notice the light.</p>
              <p className="text-text-body">What sounds are around you?</p>
              <p className="text-text-body">What does the air feel like on your skin?</p>
              <p className="text-text-body">What is your body doing in this moment?</p>
              <p className="text-text-body pt-2">You do not need to force detail.</p>
              <p className="text-text-body">
                Memory is stored in sensation.
                <br />
                Let sensation guide the memory.
              </p>
            </div>

            <Textarea
              placeholder={`Describe the scene…\n\ne.g. I'm standing in my grandmother's garden.\nThe sun is warm and the air smells like soil and roses.`}
              value={sceneText}
              onChange={(e) => onSceneTextChange(e.target.value)}
              className="min-h-[140px]"
            />

            {/* Emotional layer */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-text-heading">
                How did you feel in this moment?
              </p>
              <div className="flex flex-wrap gap-2">
                {EMOTION_OPTIONS.map((tag) => {
                  const selected = emotionTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleEmotion(tag)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        selected
                          ? "border-primary bg-primary/10 text-text-heading"
                          : "border-border text-text-supporting hover:border-primary/40"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Continue */}
      {selectedScene && (
        <div className="px-6 pb-4 pt-2 content-container">
          <Button
            className="w-full"
            size="lg"
            disabled={!canContinue}
            onClick={onContinue}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnchorRecall;
