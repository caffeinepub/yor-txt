# Specification

## Summary
**Goal:** Show story authors’ public display names to all viewers (including anonymous users) instead of “Anonymous”, while requiring a saved display name to create new stories.

**Planned changes:**
- Update the backend user profile read API to allow any caller (including anonymous) to fetch another user’s public profile by principal, returning at least the stored display name only.
- Enforce in the backend addStory flow that the caller has an existing profile with a non-empty display name; otherwise reject with a clear English error message.
- Update the Stories UI to display the author’s saved display name via the public profile API, and when missing, show a deterministic principal-based fallback instead of the literal “Anonymous”.

**User-visible outcome:** Everyone can see story authors’ display names on the Stories page; story creation is blocked until the author has saved a display name, and legacy/missing profiles show a stable principal-based label rather than “Anonymous”.
