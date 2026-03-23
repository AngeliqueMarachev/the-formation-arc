

## Plan: Temporarily Force Empty State in Anchor Library

**Goal**: Temporarily modify `src/pages/Anchors.tsx` to force the empty state to display, so you can review the design in the preview.

### Steps

1. **Force empty state** — In `src/pages/Anchors.tsx`, temporarily override the `isEmpty` condition to always be `true` (e.g., `const isEmpty = true;`).

2. **Review in preview** — You'll be able to see the empty state live.

3. **Revert** — Once you've reviewed it, revert the change back to the original logic (`const isEmpty = !loading && anchors.length === 0;`).

