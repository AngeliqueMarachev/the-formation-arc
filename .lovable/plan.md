

## Revised Plan: Screen Wake Lock for Guided Practice Screens

### 1. New file: `src/hooks/use-wake-lock.ts`

Custom hook exposing `{ isActive, isSupported, enable, disable }`.

- `enable()`: calls `navigator.wakeLock.request('screen')`, catches errors silently
- Listens to `visibilitychange` — reacquires if enabled and page becomes visible
- `disable()`: releases the sentinel
- Cleanup on unmount releases lock
- `isSupported = 'wakeLock' in navigator`
- Does NOT auto-activate — requires explicit `enable()` call

### 2. New file: `src/components/WakeLockToggle.tsx`

Simple inline toggle component. Returns `null` if `!isSupported`.

**Layout**: Right-aligned row with label + switch, helper text below.

```text
                        Keep screen awake [switch]
          Prevents screen from sleeping during this session
```

- Uses existing `Switch` component
- `defaultOn` prop (defaults to `true`)
- Calls `enable()`/`disable()` on toggle change
- On unmount: calls `disable()`
- No tooltip, no info icon, no hover logic
- Accepts `className` for positioning
- Style: `text-sm text-text-supporting` for label, `text-xs text-text-supporting/70` for helper

### 3. Integration — show toggle on FIRST screen only per flow

**`src/pages/Activated.tsx`**
- Show `<WakeLockToggle />` on the `"entry"` screen (the screen before phase building begins) and on the `"use-script"` screen (entry for returning users)
- Not shown on individual phase screens or completion
- Wake lock stays active through all phases once enabled

**`src/pages/DailyFormation.tsx`**
- Show on first screen after intro: `screen === "reorientation"`
- Not repeated on `daily-loop`, `create-anchor`, or `completion`

**`src/pages/Anchors.tsx`**
- Show when `view === "recall-prompt"` (this IS the first/only recall screen)

### 4. Behavior summary

- Default: ON
- Activates only after user interaction (entering the session triggers mount of the toggle, which calls `enable()` since default is ON)
- Persists for current session only — no database, no localStorage
- Released automatically on unmount (navigation away)
- Hidden entirely on unsupported devices
- No error messages ever shown

