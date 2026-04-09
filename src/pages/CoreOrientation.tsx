import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const CoreOrientation = () => {
  const navigate = useNavigate();
  const { setOrientationSeen } = useAuth();

  const handleEnter = () => {
    setOrientationSeen(true);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-5 py-16">
      <div className="content-container space-y-12">
        {/* Header */}
        <h1 className="font-fraunces text-3xl font-semibold tracking-tight text-text-heading sm:text-4xl">
          The journey that reshapes the world
        </h1>

        {/* Intro text */}
        <div className="space-y-4 text-base leading-relaxed text-text-body sm:text-lg">
          <p>Your nervous system is always learning.</p>
          <p>
            Across the span of your life, your experiences shape how your mind interprets the world: what feels safe,
            what feels urgent, what feels uncertain.
          </p>
          <p>
            Over time, repeated stress can train your system to expect danger, resulting in coping mechanisms and unseen
            emotional walls that keep you stuck.
          </p>
          <p>
            This does not mean you are broken.
            <br />
            It means your nervous system adapted to protect you.
          </p>
          <p>
            Since the brain has an innate capacity for change, what was once established through repetition, can be
            reshaped through repetition.
          </p>
          <p className="text-primary">The brain updates its predictions based on lived experience, real or imagined.</p>
          <p>When prediction changes, perception changes.</p>
          <p className="mt-0">When perception changes, the body follows.</p>
          <p className="text-primary">
            This space helps you reshape your inner world through awareness, alignment, and steady reinforcement.
          </p>
          <p>Over time, steadiness becomes more familiar than fear.</p>
        </div>

        {/* Path cards */}
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-text-body">There are two ways to use this space:</p>
          {/* Card 1 */}
          <div className="rounded-lg border bg-card p-5 sm:p-6 border-secondary">
            <p className="mb-2 text-lg font-medium text-text-heading text-primary">When you feel unsettled</p>
            <p className="text-base leading-relaxed text-text-body font-medium">Use The Reorientation Flow</p>
            <p className="mt-1.5 leading-relaxed text-text-supporting text-base">
              A short, structured sequence that quickly interrupts escalation and restores internal authority.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg border bg-card p-5 sm:p-6 border-secondary">
            <p className="mb-2 text-lg font-medium text-text-heading text-primary">
              When you feel steady enough to strengthen
            </p>
            <p className="text-base leading-relaxed text-text-body font-medium">Use The Daily Formation</p>
            <p className="mt-1.5 leading-relaxed text-text-supporting text-base">
              A daily process that strengthens the pathways of safety so steadiness becomes easier to access in daily
              life.
            </p>
          </div>
        </div>

        {/* Closing reassurance */}
        <div className="space-y-1.5 text-base leading-relaxed text-text-body">
          <p>You do not need to do everything today.</p>
          <p>Begin where you are.</p>
          <p>Return often.</p>
          <p>Formation is cumulative.</p>
        </div>

        {/* CTA */}
        <Button onClick={handleEnter} className="w-full" size="lg">
          Begin
        </Button>
      </div>
    </div>
  );
};

export default CoreOrientation;
