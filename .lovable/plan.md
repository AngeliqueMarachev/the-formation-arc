

## Plan: Visually Group the Three Rhythm Steps on New-User Screen

### What Changes

Replace the flat list of paragraphs (lines 196-228) with a structured layout that groups each rhythm item (Pray, Reorient, Anchor) into visually distinct blocks.

### Implementation (single file: `src/pages/DailyFormation.tsx`)

Replace lines 196-228 with:

```tsx
<div className="leading-relaxed mb-10">
  {/* Intro */}
  <p className="text-primary text-base">Stabilise before you build. Settle your system before training.</p>
  <p className="text-text-body text-base mt-4">Daily Formation follows a simple rhythm:</p>

  {/* Three grouped steps */}
  <div className="mt-6 space-y-6">
    <div>
      <p className="font-medium text-primary font-sans text-base uppercase tracking-wide">Pray</p>
      <p className="mt-1">Give God the outcomes of this process. Entrust what happens next.</p>
    </div>
    <div>
      <p className="font-medium text-primary font-sans text-base uppercase tracking-wide">Reorient</p>
      <p className="mt-1">Rehearse a short Reorientation to communicate safety to your nervous system.</p>
    </div>
    <div>
      <p className="font-medium text-primary font-sans text-base uppercase tracking-wide">Anchor</p>
      <p className="mt-1">Recall and gently expand a memory that strengthens your expectation of steadiness.</p>
    </div>
  </div>

  {/* Closing */}
  <p className="mt-6">Nothing needs to be forced. Simply remain open and begin.</p>

  {/* CTA (unchanged behavior) */}
  <div className="pt-6">
    <Button ...>Create Reorientation</Button>
  </div>
</div>
```

### Key design decisions

- **Section titles** use `text-primary font-sans uppercase tracking-wide` matching the project's established section-title pattern from the style memory
- **`mt-1`** between title and description keeps them tightly coupled
- **`space-y-6`** between blocks creates clear visual separation between steps
- **`mt-6`** separates the intro from the steps, and the steps from the closing
- No wording, routing, or button behavior changes

