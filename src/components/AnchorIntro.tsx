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
        <main className="flex flex-1 flex-col px-5 pt-10 pb-40 content-container">
          <h1 className="tracking-tight mb-1">The science behind daily formation</h1>

          <div className="space-y-4 text-base leading-relaxed text-text-body sm:text-lg">
            <p>
              Every time you have a feeling, good or bad, a chemical is released into your system. This creates an
              emotional signature, a measurable frequency, that changes the body over time.
            </p>

            <p>
              Cortisol, adrenaline, and norepinephrine (CAN chemistry) are the stress hormones released into the body
              when we experience disorder. They create low frequency emotional signatures, which deplete our resources,
              often leading to a weakened immune system and eventually, chronic symptoms.
            </p>
            <p>
              Dopamine, oxytocin, serotonin, and endorphins (DOSE chemistry) are the feel-good hormones released into
              the body when we experience alignment. They create high frequency emotional signatures, which support and
              heal the body, and help us feel safe.
            </p>
            <p>
              The Daily Formation practice is designed to provide the nervous system with new, positive information to
              produce life-giving DOSE chemistry, which counteracts the effects of CAN chemistry stored in the body.
            </p>
          </div>
        </main>

        <div className="fixed bottom-16 left-0 right-0 px-5 pb-4 pt-2 bg-background/95 backdrop-blur-sm">
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
        <main className="flex flex-1 flex-col px-5 pt-10 pb-32 content-container">
          <h1 className="tracking-tight mb-8">Formations retrain the nervous system</h1>

          <div className="space-y-5 leading-relaxed text-text-body">
            <p className="text-primary">Your brain stores experiences as networks of meaning.</p>

            <div>
              <p className="mb-2">Complicated moments in life quietly taught your body things like:</p>
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
              As meaning expands, the brain begins to register signals of safety and connection. The body is flooded
              with chemicals that promote positive emotions and reduce anxiety.
            </p>

            <p className="text-primary">
              Repeated exposure to these signals helps the nervous system become less oriented toward threat and more
              able to recognise steadiness.
            </p>
          </div>
        </main>

        <div className="fixed bottom-16 left-0 right-0 px-5 pb-4 pt-2 bg-background/95 backdrop-blur-sm">
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
      <main className="flex flex-1 flex-col px-5 pt-10 pb-32 content-container">
        <h1 className="tracking-tight mb-8">Practicing formation daily</h1>

        <div className="space-y-5 leading-relaxed text-text-body">
          <p>There are three principles to neuroplasticity:</p>

          <div className="space-y-4">
            <div>
              <h2 className="mb-2 font-sans text-base uppercase tracking-widest text-primary">FOCUS</h2>
              <p className="text-base text-text-body">
                Focus on God and His promises. You are healed, accepted, whole, anointed, and precious in His sight.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-sans text-base uppercase tracking-widest text-primary">ASSOCIATION</h2>
              <p className="text-base text-text-body">
                Replace old, unhealthy associations with Kingdom reality, by making an intentional choice to see
                yourself as a new creation, alive in victory.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-sans text-base uppercase tracking-widest text-primary">REPETITION</h2>
              <p className="text-base text-text-body">
                Change requires repetition to strengthen new neural pathways. Each repetition builds on the last.
              </p>
            </div>
          </div>

          <p>
            When we apply this framework together with God by aligning with Truth, we break our agreements with the lies
            we’ve accepted. Repeated DOSE chemistry released into the body drives changes in the brain long term, and we
            begin to experience true transformation.
          </p>
          <p>
            When the nervous system has been under strain, access to memory can narrow. With practice, access widens.
          </p>
          <p className="text-secondary-foreground">
            This process doesn't attempt to escape reality or recreate the past.
          </p>
          <p className="text-primary">
            Rather, we are providing the brain with a more supportive experience in the present, so it can update
            expectations.
          </p>
          <p>For now, simply allow one moment to appear.</p>
        </div>
      </main>

      <div className="fixed bottom-16 left-0 right-0 px-5 pb-4 pt-2 bg-background/95 backdrop-blur-sm">
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
