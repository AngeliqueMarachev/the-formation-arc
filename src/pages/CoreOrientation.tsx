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
    <div className="flex min-h-screen flex-col justify-center px-6 py-16 sm:px-8">
      <div className="content-container space-y-12">
        {/* Header */}
        <h1 className="font-fraunces text-3xl font-semibold tracking-tight text-text-heading sm:text-4xl">
          The journey that reshapes the world
        </h1>

        {/* Intro text */}
        <div className="space-y-4 text-base leading-relaxed text-text-body sm:text-lg">
          <p>Your nervous system is always learning.</p>
          <p>Across your life, experiences shape how your mind interprets the world: what feels safe, what feels urgent, what feels uncertain.</p>
          <p>Over time, repeated stress can train your system to expect tension, even when danger is not present.</p>
          <p>This does not mean you are broken.</p>
          <p>It means your nervous system adapted to protect you.</p>
          <p className="text-primary">What was shaped through repetition can be reshaped through repetition. Through neuroplasticity, the brain updates its predictions based on lived experience.</p>
          <p>When prediction changes, perception changes.</p>
          <p>When perception changes, the body follows.</p>
          <p className="text-primary">This space helps you reshape your world, through repetition, clarity, and return.</p>
          <p>Over time, steadiness becomes more familiar than fear.</p>
        </div>

        {/* Path cards */}
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-text-body">There are two ways to begin:</p>
          {/* Card 1 */}
          <div className="rounded-lg border bg-card p-5 sm:p-6 border-secondary">
            <p className="mb-2 font-fraunces text-lg font-medium text-text-heading">When fear or urgency rises</p>
            <p className="text-base leading-relaxed text-text-body font-medium">
              Use <span className="text-text-heading font-normal">The Reorientation Engine</span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-text-supporting">
              A short, structured sequence that interrupts escalation and restores internal authority.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg border bg-card p-5 sm:p-6 border-secondary">
            <p className="mb-2 font-fraunces text-lg font-medium text-text-heading">
              When you feel steady enough to practice
            </p>
            <p className="text-base leading-relaxed text-text-body font-medium">
              Use <span className="text-text-heading font-normal">The Daily Formation</span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-text-supporting">
              A daily process that strengthens the pathways of safety so steadiness becomes easier to access in daily life.
            </p>
          </div>
        </div>

        {/* Closing reassurance */}
        <div className="space-y-1.5 text-base leading-relaxed text-text-body">
          <p>You do not need to do everything today.</p>
          <p>Begin where you are.<br />Return often.</p>
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
