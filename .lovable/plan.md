

## The Formation Arc™ — MVP Implementation Plan

### 1. Visual Design System
Set up a dark, grounded color palette with muted earth tones — think charcoal backgrounds, warm ivory text, subtle gold accents. Typography will be clean and authoritative (serif for headers, sans-serif for body). No pastels, no playfulness.

### 2. Database Setup (Lovable Cloud)
Create four tables with Row Level Security:
- **profiles** — auto-created on signup, stores display name
- **reorient_templates** — user's saved reorientation lines (6 lines)
- **anchor_entries** — scene, emotion tags, meaning, anchor phrase, communion awareness
- **usage_stats** — reorient return count + anchors created

### 3. Authentication
Email-based sign up/login with Supabase Auth. Auto-create a profile and usage_stats row on signup via database trigger. Simple, dignified login/signup screens with the core thesis language displayed.

### 4. Onboarding / Auth Screen
Display the formation thesis prominently:
> *Fear conditions perception. Perception shapes chemistry. Chemistry reinforces expectation. Return reshapes expectation.*

### 5. Home Screen
Three large, structured cards:
- **"I'm Activated"** — Fear rising. Begin reorientation.
- **"Daily Formation"** — Train stability before fear rises.
- **"Anchors"** — View your anchor library.

Minimal stats at the bottom: Reorientations completed / Anchors created (pulled from usage_stats).

### 6. Bottom Navigation
Three tabs: **Home** | **Activated** | **Daily Formation**

### 7. Placeholder Pages
- `/activated` — placeholder with title and description
- `/daily-formation` — placeholder with title and description
- `/anchors` — placeholder (accessible from Home card)

All styled consistently with the grounded, minimal aesthetic.

