

## Plan: Add introductory text lines to Reorientation Rehearsal page

### What changes
In `src/pages/ReorientationRehearsal.tsx`, insert three `text-text-body` paragraphs between the title (line 65) and the existing spacer `<div className="mb-6" />` (line 66).

### Lines to add (after line 65):
```tsx
<p className="text-text-body text-sm mt-4">Before the brain can update expectations, it must first register safety.</p>
<p className="text-text-body text-sm mt-3">Rehearsing your Reorientation signals stability to the nervous system, allowing the mind to become receptive.</p>
<p className="text-text-body text-sm mt-3">A receptive system forms steadier expectations more easily.</p>
```

Single file change, no other modifications needed.

