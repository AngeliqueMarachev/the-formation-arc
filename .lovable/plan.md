

## Plan: Update Reorientation Engine Step Text Content

### What changes

**1. Expand the PHASES data structure** (lines 11–71) to include per-step `introduction` lines and a `customLabel` field:

- **Step 1 (Line In The Sand)**: Keep existing purpose as introduction. `customLabel`: "Write your own interruption" (no change).
- **Step 2 (Expose The Mechanism)**: Introduction: "What you feel is real. / This step names what your nervous system is doing behind the reaction. / Choose the explanation that fits best." `customLabel`: "Write your own explanation"
- **Step 3 (Untangle Time)**: Introduction: "Separate past learning from present reality. / Choose the statement that reminds your system that then is not now." `customLabel`: "Write your own statement"
- **Step 4 (Choose Your Agreement)**: Introduction: "Fear offers an interpretation of this moment. / Choose the statement that reflects what you want your mind to agree with." `customLabel`: "Write your own statement"
- **Step 5 (Shepherd Your Soul)**: Introduction: "Speak to yourself with steadiness and kindness. / Choose the words that will guide you right now." `customLabel`: "Write your own encouragement"
- **Step 6 (Occupy Your Identity)**: Introduction: "Your current state does not define who you are. / Choose the identity that aligns with the truth of who God says you are." `customLabel`: "Write your true identity"

**2. Update the phase screen header** (lines 443–445) to render the new `introduction` array as multiple `<p>` lines, replacing the old single `purpose` line and the generic "Choose a phrase…" line.

**3. Update the "Write your own" button label** (line 480) to use `phase.customLabel` instead of the hardcoded "Write your own interruption" text.

**4. Update the Textarea placeholder** (line 469) to use `phase.customLabel` + "…" instead of hardcoded "Write your own…".

### No changes to
- Layout, styling, buttons, progress bar, card structure
- Step order or option text

