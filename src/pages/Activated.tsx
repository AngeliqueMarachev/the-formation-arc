import BottomNav from "@/components/BottomNav";
import { Shield } from "lucide-react";

const Activated = () => (
  <div className="flex min-h-screen flex-col pb-20">
    <header className="px-6 pt-8 pb-4">
      <h1 className="text-2xl font-semibold tracking-tight">Activated</h1>
    </header>
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Shield className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-xl font-semibold">Reorientation Flow</h2>
      <p className="max-w-xs text-sm text-muted-foreground">
        When fear rises, this guided flow will walk you through your reorientation template. Coming soon.
      </p>
    </main>
    <BottomNav />
  </div>
);

export default Activated;
