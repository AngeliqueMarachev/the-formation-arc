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
            The Daily Formation is for anchoring    
          </h1>
          <p className="leading-relaxed mb-8 text-primary">
            Build and strengthen the memories that anchor you. Train your nervous system to expect steadiness.
          </p>

          <div className="space-y-5 leading-relaxed text-text-body mb-12">
            <div className="space-y-1">
              <p>Every believer experiences the challenge at some point: </p>
              <p>We know the Truth. Personally, even.      </p>
              <p>But then we enter a season where we feel overwhelmed, guarded, lost.</p>
            </div>

            <div className="space-y-1">
              <p>We wonder if God has abandoned us.          </p>
              <p>We scrutinize ourselves. We must have done something wrong.             </p>
              <p>We fall into self-pity, depression, addiction, spiralling into hopelessness.              </p>
            </div>

            <p>
              But this is not a question of displaced faith. This is how your nervous system learned to operate. At some point in the past, your body learned that life requires vigilance: stay alert, brace for difficulty, anticipate danger. And those patterns can continue long after the original circumstances ended.   
            </p>

            <p>
              ​When the nervous system stays oriented toward threat, it becomes difficult to experience flow, as the brain constantly scans for signs of danger. Over time this expectation quietly shapes how the body responds to life.  
            
            
            </p>

            <p>
              ​But these expectations are not permanent.  
            </p>

            <p className="text-primary">
              ​The brain can update what it predicts.
            </p>

            <p className="text-secondary-foreground">​The Anchor Layer facilitates you in this process.</p>

            <p>
              ​
            </p>

            <div className="h-6" />
            <div className="h-6" />
            <div className="h-6" />
          </div>
        </main>

        <div className="fixed bottom-16 left-0 right-0 px-6 pb-4 pt-2 bg-background/95 backdrop-blur-sm">
          <div className="content-container space-y-2">
            <Button className="w-full" size="lg" onClick={() => setStep(1)}>
              Continue
            </Button>
            <Button className="w-full" size="lg"
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
              <p>Those conclusions became prediction templates. This conditioned your nervous system to prepare for life according to this negativity bias.​ Memory plays an important role in how those expectations are maintained. </p>
              <p className="text-primary">​</p>
            </div>

            <p className="text-secondary-foreground">When a memory is recalled with attention, the neural network connected to it briefly becomes flexible.  </p>

            <p>
              As new meanings attach to memories over time, the brain gradually updates what it expects from life. Experiences that once trained the body to expect threat lose their influence as steadier pathways are repeated. 
            </p>

            <p>
              When a memory widens in meaning, your body releases chemistry associated with safety and connection, which helps strengthen new emotional associations.  
            </p>

            <p className="text-primary">
              This process anchors the nervous system, as it learns to anticipate steadiness rather than contraction over time.
            </p>

            <p className="text-secondary-foreground">
              This does not rewrite the past. But it allows the memory to hold more than the conclusion it formed at the time.
            </p>

            <div className="h-6" />
            <div className="h-6" />
            <div className="h-6" />
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
          The nervous system learns safety through moments               
        </h1>

        <div className="space-y-5 leading-relaxed text-text-body">
          <p className="text-primary">You are looking for access to one small moment from your life that brought you joy. </p>

          <p className="text-secondary-foreground">
            You are not searching for the perfect memory. You do not need the whole story. Just a glimpse
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

          <p>​If nothing comes to mind right away, that is normal. When the nervous system has been under pressure, access to memory can narrow. </p>
          <p className="text-text-heading font-medium">​If nothing comes to mind right away, that is normal. When the nervous system has been under pressure, access to memory can narrow. </p>

          <p>We will  help you access memories along the way. And your memory will widen with practice.</p>

          <p>
            For now, simply allow one moment to appear.​ 
          </p>

          <p>
            ​
          </p>

          <p className="text-text-heading font-medium">
            ​
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