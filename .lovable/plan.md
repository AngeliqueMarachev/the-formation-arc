

## Revised Plan: Screen Wake Lock for Guided Practice Screens

### 1. New file: `src/hooks/use-wake-lock.ts`

Custom hook exposing `{ isActive, isSupported, enable, disable }`.

- `enable()`: calls `navigator.wakeLock.request('screen')`, catches errors silently
- Listens to `visibilitychange` — reacquires if enabled and page becomes visible
- `disable()`: releases the sentinel, clears enabled state
- Cleanup on unmount releases lock
- `isSupported = 'wakeLock' in navigator`
- Does NOT auto-activate — requires explicit `enable()` call

### 2. New file: `src/components/WakeLockToggle.tsx`

Presentational toggle. Returns `null` if `!isSupported`.

- Uses existing `Switch` component
- Props: `enabled` (controlled boolean), `onToggle` callback, optional `className`
- **Does NOT own the hook** — parent manages the hook and passes state down
- **Does NOT call disable() on unmount** — wake lock lifecycle is managed by the parent page
- Label: "Keep screen awake" — `text-sm text-text-heading` (readable, not muted)
- Helper: "Prevents screen from sleeping during this session" — `text-xs text-text-supporting` (muted)
- Layout: right-aligned row with label + switch, helper text below

### 3. Integration

The hook (`useWakeLock`) is called at the **page component level** so the lock persists across all screens within a flow. The toggle is rendered only on the first guided screen. The session-start CTA calls `enable()` alongside the screen transition.

**`src/pages/Activated.tsx`**
- Call `useWakeLock()` at the top of the component
- Track toggle state with `useState(true)` (default ON)
- On the `"entry"` screen: render `<WakeLockToggle />` below the header. The "Begin Reorientation" button calls `enable()` (if toggle is ON) then `setScreen("phase")`
- On the `"use-script"` screen: render `<WakeLockToggle />` below the header. The first tap-to-reveal interaction calls `enable()` (if toggle is ON)
- Toggle not shown on `"phase"` or `"complete"` screens
- Call `disable()` inside `handleUseComplete` (Return home) and when navigating away from completion

**`src/pages/DailyFormation.tsx`**
- Call `useWakeLock()` at the top of the component
- Track toggle state with `useState(true)` (default ON)
- The trigger: inside `AnchorIntro`'s `onComplete` callback (the "Continue" button on the last intro screen), call `enable()` (if toggle is ON) then transition to `"reorientation"`
- Render `<WakeLockToggle />` on the `"reorientation"` screen only, below the header
- Call `disable()` on completion or navigation away

**`src/pages/Anchors.tsx`**
- Call `useWakeLock()` at the top of the component
- Track toggle state with `useState(true)` (default ON)
- Render `<WakeLockToggle />` on `view === "recall-prompt"`
- The "Recall This Anchor" button (on the detail view) calls `enable()` (if toggle is ON) then transitions to `"recall-prompt"`
- Call `disable()` inside `handleRecallDone`

### 4. Key behavioral notes

- **No auto-enable on mount**: The switch appears ON but `enable()` is only called on explicit user action (Begin, Continue, Recall)
- **No disable on toggle unmount**: The toggle only renders on the first screen; the lock persists across subsequent screens because the hook lives at the page level
- **Toggle OFF mid-session**: Calls `disable()` immediately
- **Toggle ON mid-session**: Calls `enable()` immediately
- **Unsupported browsers**: Toggle hidden entirely, no messages
- **Session-only**: State resets on page unmount (navigating away from the route)

