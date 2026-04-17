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
          <p>Your nervous system learns from experience.</p>
          <p>Prolonged or extreme stress can train the body to expect difficulty, even when circumstances change.</p>
          <p>
            This can shape how you experience yourself, others, the world, and even God, resulting in coping mechanisms,
            unseen emotional walls, and physical symptoms that keep you stuck.
          </p>
          <p>
            But learned patterns are not permanent.
            <br />
            With gentle repetition, steadiness can become more familiar again.
          </p>
          <p>This space helps you grow in steadiness through awareness, alignment, and supportive reinforecment.</p>
        </div>

        {/* Path cards */}
        <div className="space-y-4">
          <p className="text-base leading-relaxed text-text-body">There are two ways to use this space:</p>

          {/* Card 2 */}
          <div className="rounded-lg border bg-card p-5 sm:p-6 border-secondary">
            <p className="mb-2 text-lg font-medium text-text-heading text-primary">
              When you feel steady enough to strengthen
            </p>
            <p className="text-base leading-relaxed text-text-body font-medium">Use the Daily Formation</p>
            <p className="mt-1.5 leading-relaxed text-text-supporting text-base">
              A daily practice that helps steadiness become easier to access.
            </p>
          </div>

          {/* Card 1 */}
          <div className="rounded-lg border bg-card p-5 sm:p-6 border-secondary">
            <p className="mb-2 text-lg font-medium text-text-heading text-primary">When you feel unsettled</p>
            <p className="text-base leading-relaxed text-text-body font-medium">Use The Reorientation Flow</p>
            <p className="mt-1.5 leading-relaxed text-text-supporting text-base">
              A short sequence that quickly interrupts escalation and restores internal authority.
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
