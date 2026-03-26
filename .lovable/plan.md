

## Plan: Update Anchor Library Empty State

### Changes in `src/pages/Anchors.tsx` (lines 181–192)

**1. Update heading** from "No anchors yet" to "Create an Anchor"

**2. Replace body copy** with four paragraphs:
- "Anchors are memories and phrases that help your nervous system learn steadiness."
- "Anchors are created during The Daily Formation."
- "Your library will grow over time as you create new anchors."
- "Each time you return to an anchor, the pathway becomes easier to access and safety is reinforced."

**3. Update CTA button** text to "Create an Anchor"

**4. Match button styling** to the "Create new anchor" button in the list view (line 218–223): `variant="outline"` with `className="w-full border-primary text-primary hover:bg-primary/10"`

All changes are within the empty-state block only. No layout or spacing changes outside the icon container and text area.

