import { useState } from "react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

interface AnchorIntroProps {
  onComplete: () => void;
}

const AnchorIntro = ({ onComplete }: AnchorIntroProps) => {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col px-6 pt-10 pb-12 content-container">
          <h1 className="tracking-tight mb-3">
            Why the Anchor Layer exists
          </h1>
          <p className="text-text-body leading-relaxed mb-8">
            This is where you build and strengthen your Anchors: Memories that train your nervous system to expect steadiness.
          </p>

          <div className="space-y-5 leading-relaxed text-text-body mb-12">
            <div className="space-y-1">
              <p>Many thoughtful believers experience something confusing.</p>
              <p>They still believe Truth.</p>
              <p>But they feel tense, guarded, or distant.</p>
            </div>

            <div className="space-y-1">
              <p>Connection can trigger anxiety.</p>
              <p>Prayer can become elusive.</p>
              <p>Quiet moments seeking God can feel lonely.</p>
            </div>

            <p>
              This often has less to do with belief and more to do with how the nervous system learned to operate.
            </p>

            <p>
              At some point your body learned that life requires vigilance: Staying alert, bracing, anticipating what might go wrong.
            </p>

            <p>
              Those patterns can continue running long after the original circumstances ended.
            </p>

            <p>
              When the nervous system stays oriented toward threat, it becomes difficult to experience flow.
            </p>

            <p>The brain begins scanning the present for signs of danger.</p>

            <p>
              Over time this expectation quietly shapes how the body responds to life.
            </p>

            <p className="text-text-heading font-medium">
              But these expectations are not permanent.
            </p>

            <p className="text-text-heading font-medium">
              The brain can update what it predicts.
            </p>

            <p>The Anchor Layer facilitates you in this process.</p>
          </div>
        </main>

        <div className="fixed bottom-16 left-0 right-0 px-6 pb-4 pt-2 bg-background/95 backdrop-blur-sm">
          <div className="content-container space-y-2">
            <Button className="w-full" size="lg" onClick={() => setStep(1)}>
              Continue
            </Button>
            <Button
              className="w-full"
              size="lg"
              variant="secondary"
              onClick={onComplete}>
              
              Skip
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>);

  }

  if (step === 1) {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col px-6 pt-10 pb-32 content-container">
          <h1 className="tracking-tight mb-8">
            Anchors retrain the nervous system
          </h1>

          <div className="space-y-5 leading-relaxed text-text-body">
            <p>Your brain stores experiences as networks of meaning.</p>

            <div>
              <p className="mb-2">Moments in life quietly taught your body things like:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>I am alone.</li>
                <li>I must hold everything together.</li>
                <li>Something bad is going to happen.</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>Those conclusions became prediction templates.</p>
              <p>Your nervous system begins preparing for life according to a negativity bias.</p>
            </div>

            <p>Memory plays an important role in how those expectations are maintained.</p>

            <p>
              When a memory is recalled with attention, the neural network connected to it briefly becomes flexible.
            </p>

            <p>
              It also releases chemistry associated with safety and connection, which helps strengthen new emotional associations.
            </p>

            <p>
              As new meanings attach to memories over time, the brain gradually updates what it expects from life.
            </p>

            <p>
              Experiences that once trained the body to expect threat lose their influence as steadier pathways are repeated.
            </p>

            <div className="space-y-1">
              <p>This does not rewrite the past.</p>
              <p>But it allows the memory to hold more than the conclusion it formed at the time.</p>
            </div>

            <p className="text-text-heading font-medium">
              Over time this process helps the nervous system anticipate steadiness rather than contraction.
            </p>
          </div>
        </main>

        <div className="fixed bottom-16 left-0 right-0 px-6 pb-4 pt-2 bg-background/95 backdrop-blur-sm">
          <div className="content-container">
            <Button className="w-full" size="lg" onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>);

  }

  // Step 2 — Screen 3
  return (
    <div className="flex min-h-screen flex-col pb-20">
      <main className="flex flex-1 flex-col px-6 pt-10 pb-32 content-container">
        <h1 className="tracking-tight mb-8">
          Choose one moment
        </h1>

        <div className="space-y-5 leading-relaxed text-text-body">
          <p>You are not searching for the perfect memory.</p>

          <p>
            You are simply looking for access to one small moment from your life that brought you joy.
          </p>

          <div>
            <p className="mb-2">It might be:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>a place you once enjoyed</li>
              <li>a quiet moment from childhood</li>
              <li>an activity that once felt easy</li>
              <li>a place where your body felt relaxed</li>
            </ul>
          </div>

          <p>You do not need the whole story.</p>
          <p className="text-text-heading font-medium">Just a glimpse.</p>

          <p>If nothing comes to mind right away, that is normal.</p>

          <p>
            When the nervous system has been under pressure, access to memory can narrow.
          </p>

          <p>
            We will give you help to access memories along the way. And your memory will widen with practice.
          </p>

          <p className="text-text-heading font-medium">
            For now, simply allow one moment to appear.
          </p>
        </div>
      </main>

      <div className="fixed bottom-16 left-0 right-0 px-6 pb-4 pt-2 bg-background/95 backdrop-blur-sm">
        <div className="content-container">
          <Button className="w-full" size="lg" onClick={onComplete}>
            Continue
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>);

};

export default AnchorIntro;