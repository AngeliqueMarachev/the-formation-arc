

## Plan: Add label above textarea in AnchorRecall

**What changes:**

Wrap the `Textarea` (lines 243-247) in a `div` with the same structure as the "Give this memory a short title" field above it (lines 226-241):
- Add a `<label>` with classes `text-sm font-medium text-text-heading text-primary` containing "Describe the scene"
- Update the textarea placeholder to remove "Describe the scene…" and keep only the example text as placeholder

**File:** `src/components/AnchorRecall.tsx` (lines 243-247)

**Before:**
```tsx
<Textarea
  placeholder={`Describe the scene…\n\ne.g. I'm standing in my grandmother's garden.\nThe sun is warm and the air smells like soil and roses.`}
  ...
/>
```

**After:**
```tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-text-heading text-primary">
    Describe the scene
  </label>
  <Textarea
    placeholder={`e.g. I'm standing in my grandmother's garden.\nThe sun is warm and the air smells like soil and roses.`}
    ...
  />
</div>
```

Single file, minimal edit.

