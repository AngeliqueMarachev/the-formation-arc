

## Plan: Fix Core Orientation to Only Show Once Per Login Session

### Problem
Currently, `orientationSeen` is stored as React state and resets on every `onAuthStateChange` event (line 34 in auth.tsx sets it to `false`). This means orientation can re-trigger during the session unexpectedly. The redirect logic lives inside `Index.tsx` (lines 70-74), coupling the Home screen to onboarding.

### Changes

**1. `src/lib/auth.tsx` — Use `sessionStorage` instead of React state for the flag**

- Replace `useState(false)` for `orientationSeen` with a getter that reads `sessionStorage.getItem('orientation_seen_this_session')`
- `setOrientationSeen(true)` writes to sessionStorage
- On `signOut`, clear the sessionStorage flag
- In `onAuthStateChange`, only reset the flag on `SIGNED_OUT` events (not on every auth change), so token refreshes don't re-trigger orientation

**2. `src/pages/Index.tsx` — Remove the orientation redirect**

- Delete lines 70-74 (the `if (!orientationSeen)` redirect block)
- Home screen always renders normally for authenticated users

**3. `src/App.tsx` — Move orientation gate to route level**

- Create an `OrientationGate` wrapper component that checks `orientationSeen`:
  - If false → redirect to `/onboarding`
  - If true → render children
- Wrap only the `"/"` route with this gate (so completing flows that navigate to `/` triggers the check once)
- Other protected routes (`/activated`, `/daily-formation`, `/anchors`) do NOT use this gate, so completing those flows never triggers orientation

This ensures:
- Orientation shows exactly once per login session
- Completing any flow (formation, reorientation, anchors) navigates to `/` and lands on Home
- Logging out and back in resets the flag via sessionStorage clearing

### Technical Detail

```text
Login → / → OrientationGate (sessionStorage check)
                ↓ not seen          ↓ seen
           /onboarding           Home screen
                ↓ "Begin"
          sessionStorage set → navigate("/") → Home screen

All other routes → no orientation gate
Sign out → clear sessionStorage
```

