import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

interface AnchorIntroProps {
  onComplete: () => void;
}

const AnchorIntro = ({ onComplete }: AnchorIntroProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (step === 0) {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col px-6 pt-10 pb-12 content-container">
          <h1 className="tracking-tight mb-1">Daily Formation is for anchoring</h1>
          <p className="leading-relaxed text-primary my-[9px] mx-0 mb-0 mt-[15px]">
            Build and strengthen the memories that anchor you.
          </p>
          <p className="leading-relaxed text-primary mb-[20px]">Train your nervous system to expect steadiness.</p>

          <div className="space-y-5 leading-relaxed text-text-body mb-12">
            <div className="space-y-1">
              <p>Many people experience seasons where life feels heavier than it should.</p>
              <p>​We know the Truth. Personally, even. </p>
            </div>

            <div className="space-y-1">
              <p>
                But then we enter a season where we feel overwhelmed, guarded, or distant from the sense of clarity we
                once had.
              </p>
              <p>We may question ourselves, or feel as though something has gone wrong. </p>
            </div>

            <p>Often this is not a failure of faith or effort.</p>
            <p>It is the result of patterns the nervous system learned during times when life required vigilance.</p>

            <p>
              When the body expects difficulty, it becomes harder to experience ease, even when circumstances change.
            </p>
            <p>Over time this expectation quietly shapes how the body responds to life.</p>

            <p>​But these expectations are not permanent.​The brain can update what it predicts.</p>

            <p className="text-primary">
              Daily Formation gently trains the nervous system to become familiar with steadiness again.
            </p>

            <p className="text-secondary-foreground mb-12">The Anchor Layer guides you through this process.</p>
            <p>​</p>
          </div>
        </main>

        <div className="fixed bottom-16 left-0 right-0 px-6 pb-4 pt-2 bg-background/95 backdrop-blur-sm">
          <div className="content-container space-y-2">
            <Button className="w-full" size="lg" onClick={() => setStep(1)}>
              Continue
            </Button>
            <Button className="w-full" size="lg" variant="secondary" onClick={onComplete}>
              Skip
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="flex min-h-screen flex-col pb-20">
        <main className="flex flex-1 flex-col px-6 pt-10 pb-32 content-container">
          <h1 className="tracking-tight mb-8">Anchors retrain the nervous system</h1>

          <div className="space-y-5 leading-relaxed text-text-body">
            <p className="text-primary">Your brain stores experiences as networks of meaning.</p>

            <div>
              <p className="mb-2">Moments in life quietly taught your body things like:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>I am alone.</li>
                <li>I must hold everything together.</li>
                <li>Something bad is going to happen.</li>
              </ul>
            </div>

            <div className="space-y-1">
              <p>Over time, these conclusions shaped what your nervous system expects from life.</p>
            </div>

            <p className="text-secondary-foreground">
              Memory plays an important role in how those expectations are maintained.
            </p>

            <p>
              When a memory is recalled with attention, the neural network connected to it becomes open to new
              association.
            </p>

            <p>
              As meaning expands, the brain begins to register signals of safety and connection, coupled by a release of
              chemicals that help strengthen new emotional associations.
            </p>

            <p className="text-primary">
              Repeated exposure to these signals helps the nervous system become less oriented toward threat and more
              able to recognise steadiness.
            </p>

            <div className="text-secondary-foreground">
              <p>We are not trying to change the past.</p>

              <p>We are allowing the brain to experience something more supportive in the present.</p>
            </div>
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
      </div>
    );
  }

  // Step 2 — Screen 3
  return (
    <div className="flex min-h-screen flex-col pb-20">
      <main className="flex flex-1 flex-col px-6 pt-10 pb-32 content-container">
        <h1 className="tracking-tight mb-8">The nervous system responds to experience, real or remembered</h1>

        <div className="space-y-5 leading-relaxed text-text-body">
          <p>
            When a moment becomes vivid in your mind, the body begins to respond as if the experience is happening now.
          </p>

          <p>
            Heart rate, muscle tone, emotional chemistry, and expectation all shift according to what the brain
            perceives.
          </p>

          <p className="text-primary">This means imagined moments can also train the nervous system.</p>

          <p>Look for access to one small moment that carries even a trace of ease, enjoyment, connection or aliveness.</p>

          <div>
            <p className="mb-2">It might be:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>a place you once enjoyed</li>
              <li>a quiet moment from childhood</li>
              <li>an activity that once felt natural</li>
              <li>a time where your body felt more like itself</li>
            </ul>
          </div>

          <p>
            If nothing comes immediately, that is normal. When the nervous system has been under strain, access to
            memory can narrow. With practice, access widens.
          </p>

          <p className="text-secondary-foreground">
            We are not trying to escape reality or recreate the past. We are allowing the brain to experience something
            steady, so it can update what it predicts.
          </p>

          <p>For now, simply allow one moment to appear.</p>
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
    </div>
  );
};

export default AnchorIntro;
