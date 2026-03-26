

## Plan: Show Core Orientation on every login

### What changes

**1. Track "orientation seen this session" in memory, not in the database** 

Use React state (via context or a simple flag) to track whether the user has seen the Core Orientation screen during this browser session. On every fresh login/page load, the flag starts as `false`, so the user always sees CoreOrientation first.

**2. File changes**

**`src/lib/auth.tsx`** — Add an `orientationSeen` boolean + setter to the auth context. Initialize to `false`. Reset to `false` whenever the session changes (new login).

**`src/pages/Index.tsx`** (line ~70) — Replace the `core_orientation_seen` profile check with the context flag:
```
if (!orientationSeen) { navigate("/onboarding", { replace: true }); return null; }
```
Remove the profile-loading dependency for this redirect.

**`src/pages/CoreOrientation.tsx`** — Replace the database update with setting the context flag to `true`, then navigating to `/`. Remove the Supabase import and update call.

### What stays the same
- The `core_orientation_seen` database column is left untouched.
- All other routing, protected routes, and navigation remain unchanged.
- No redirect loops: the context flag flips to `true` after tapping "Enter", so `/` renders the Home screen.

