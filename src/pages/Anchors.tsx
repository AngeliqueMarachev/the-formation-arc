import BottomNav from "@/components/BottomNav";
import { Anchor } from "lucide-react";

const Anchors = () => (
  <div className="flex min-h-screen flex-col pb-20">
    <header className="px-6 pt-8 pb-4">
      <h1 className="text-2xl font-semibold tracking-tight">Anchor Library</h1>
    </header>
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Anchor className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-xl font-semibold">Your Anchors</h2>
      <p className="max-w-xs text-sm text-muted-foreground">
        Stored scenes and phrases that stabilize perception. Coming soon.
      </p>
    </main>
    <BottomNav />
  </div>
);

export default Anchors;
