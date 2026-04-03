

## Plan: Set Up Cascading Deletes for User Data

When a user is deleted from Cloud, their data currently remains orphaned. We'll add foreign key constraints with `ON DELETE CASCADE` to all four tables that reference `auth.users`.

### Database Migration

A single migration will:

1. Add FK constraint on `profiles.id` → `auth.users(id)` with `ON DELETE CASCADE`
2. Add FK constraint on `anchor_entries.user_id` → `auth.users(id)` with `ON DELETE CASCADE`
3. Add FK constraint on `reorient_templates.user_id` → `auth.users(id)` with `ON DELETE CASCADE`
4. Add FK constraint on `usage_stats.user_id` → `auth.users(id)` with `ON DELETE CASCADE`

No code changes needed — this is purely a schema change.

