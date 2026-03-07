import BottomNav from "@/components/BottomNav";
import { Sun } from "lucide-react";

const DailyFormation = () => (
  <div className="flex min-h-screen flex-col pb-20">
    <header className="px-6 pt-8 pb-4">
      <h1 className="text-2xl font-semibold tracking-tight">Daily Formation</h1>
    </header>
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center space-y-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <Sun className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-xl font-semibold">Training Stability</h2>
      <p className="max-w-xs text-sm text-muted-foreground">
        Daily exercises to build capacity before activation occurs. Coming soon.
      </p>
    </main>
    <BottomNav />
  </div>
);

export default DailyFormation;
