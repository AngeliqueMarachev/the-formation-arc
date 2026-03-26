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
          When fear becomes a pattern
        </h1>

        {/* Intro text */}
        <div className="space-y-4 text-base leading-relaxed text-text-body sm:text-lg">
          <p>Your nervous system can learn fear, tension, and urgency.</p>
          <p>That does not mean you are broken.</p>
          <p className="text-primary">This app was developed to help you interrupt those patterns and build steadiness over time.</p>
          <p>There are 2 ways to use this space:</p>
        </div>

        {/* Path cards */}
        <div className="space-y-4">
          {/* Card 1 */}
          <div className="rounded-lg border bg-card p-5 sm:p-6 border-secondary">
            <p className="mb-2 font-fraunces text-lg font-medium text-text-heading">When you feel activated</p>
            <p className="text-base leading-relaxed text-text-body">
              Use <span className="text-text-heading font-normal">The Reorientation Engine</span>.
...
              Use <span className="text-text-heading font-normal">The Daily Formation</span>.
...
          <p>Just begin with where the you are.</p>
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
