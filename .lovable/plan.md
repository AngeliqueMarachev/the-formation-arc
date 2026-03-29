

## Plan: Single CTA for new users on Daily Formation "requires flow" screen

**What changes**: In the `else` branch (lines 223-236 of `DailyFormation.tsx`) where `hasLines` is false (new users with no reorientation), replace the two buttons ("Find a Memory" and "Browse Anchors") with a single CTA that navigates to `/activated` to start the Reorientation Engine.

**File**: `src/pages/DailyFormation.tsx`

### Changes (lines 223-236):
- Update the message text to guide users toward building their Reorientation Engine first
- Replace the two buttons with one: **"Begin Reorientation Engine"** that calls `navigate("/activated")`
- Keep the same `w-full` + `size="lg"` button styling for consistency

