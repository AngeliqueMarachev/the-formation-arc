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
    <div className="flex min-h-screen flex-col justify-center px-8 py-16">
      <div className="content-container space-y-10">
        <h1 className="tracking-tight">Formation is cumulative.</h1>

        <div className="space-y-1.5 leading-relaxed text-text-body">
          <p>This space is for building capacity over time.</p>
          <p>Every return strengthens steadiness.</p>
          <p>Return builds the arc.</p>
        </div>

        <p className="leading-relaxed text-text-heading font-medium">Where to begin:</p>

        <p className="leading-relaxed text-text-body">There are two ways people usually use this space.</p>

        <div className="space-y-1 border-l-2 border-primary/40 pl-5 leading-relaxed text-text-heading">
          <p>When fear or anxiety rises, use The Reorientation Engine.</p>
          <p>It will guide you step by step to interrupt the spiral and regain steadiness.</p>
          <p>Chemistry reinforces expectation.</p>
        </div>

        <div className="space-y-1 border-l-2 border-primary/40 pl-5 leading-relaxed text-text-heading">
          <p>When you feel calm enough to train your system, use The Daily Formation.</p>
          <p>This practice strengthens the pathways that help your nervous system expect steadiness..</p>
        </div>

        <div className="space-y-1.5 leading-relaxed text-text-body">
          <p>You don’t need to do everything today.</p>
        </div>

        <p className="leading-relaxed text-text-body">Just begin where you are.</p>

        <Button onClick={handleEnter} disabled={loading} className="w-full h-12 text-base" size="lg">
          {loading ? "Loading…" : "Enter"}
        </Button>
      </div>
    </div>
  );
};

export default CoreOrientation;
