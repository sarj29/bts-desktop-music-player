# BTS Music Player - Codebase Audit Report

**Analysis Date:** May 31, 2026  
**Project:** BTS Retro Pixel Music Player  
**Status:** Complete codebase audit (non-destructive)

---

## Executive Summary

This project has undergone successful customization from the Cupidity Music Player codebase. However, significant legacy code and unused functionality remain from the original architecture.

**Key Metrics:**
- **Files Analyzed:** 20+ source files (components, hooks, utilities, Electron)
- **Dead Code Items Found:** 6 major items
- **Unused IPC Handlers:** 4 handlers
- **Legacy Infrastructure:** ~300 lines of Cupidity/multi-source code
- **Unused Assets:** 1 image file
- **Unused HTML:** 1 section with remnant UI

**Estimated Cleanup Effort:** 2-3 hours (low risk, high impact)

---

## REFACTOR OPPORTUNITIES

Code that works but can be simplified or improved.

### 4.1 YouTube Module Exports

#### `src/youtube/index.js` - Re-export Strategy
- **Current Status:** Re-exports unused functions
- **Current Code:**
  ```javascript
  export { 
    parsePlaylistUrl, 
    fetchPlaylistByUrl, 
    fetchMyPlaylists,           // ← unused
    fetchPlaylistTracks 
  } from './api.js';            // ← unused
  ```
- **Improvement:** Only re-export used functions
- **Benefit:** Clearer API surface; makes it obvious what's actually used
- **Effort:** 1 minute
- **Risk:** Low (only affects exports, not behavior)

### 4.2 useTheme Hook - Redundant Theme Registry

#### `src/themes/default.js::THEMES` Object
- **Current:** Single `defaultTheme` defined but `THEMES` registry created
  ```javascript
  export const THEMES = {
    default: defaultTheme,
  };
  ```
- **Purpose:** Extensible for future themes
- **Refactor Opportunity:** 
  - If single theme forever: Simplify to single export
  - If themes planned: Keep as-is (good design)
- **Recommendation:** Keep (enables future theme system)
- **Risk:** None

### 4.3 Auth Expiry Check - Logic Simplification

#### `src/youtube/auth.js::getAccessToken()` 
- **Location:** Lines 110-122
- **Issue:** 60-second buffer before expiry may be overly conservative
  ```javascript
  if (token && Date.now() < expiry - 60_000) return token;
  ```
- **Refactor Opportunity:** Reduce to 10 second buffer or require fresh token
- **Risk:** Low (affects token refresh timing, not core logic)
- **Benefit:** Fewer refresh calls
- **Effort:** 1 minute

### 4.4 CSS Unused Selectors (Minor)

The CSS file has one defined but perhaps unused selector:

#### `.volume-rail` CSS Class
- **Location:** Lines 453-462 in `src/App.css`
- **Status:** Actually used (found in VolumeSlider.jsx line 86)
- **Note:** CSS defines a very visible gray box (background: grey) but it's not visible in the UI
- **Current HTML:** 
  ```jsx
  <div className="volume-rail" ...>
  ```
- **Issue:** The CSS rule shows `background: grey; border-style:inset;` which would make a visible box
- **Refactor Opportunity:** Either remove styling (make transparent) or remove element
- **Recommendation:** Remove the div entirely; the hit detection works via `volume-thumb-hit` alone
- **Effort:** 2 minutes to test after removal

---

## 5. ARCHITECTURE IMPROVEMENTS

Structural improvements that could benefit maintainability.

### 5.1 Electron Cleanup - Protocol Handlers

**Current State:**
- Two custom protocols: `cupid-audio://` (YouTube) and `cupid-local://` (local files)
- Both run similar streaming/range-request logic

**Improvement:**
- Keep only `cupid-audio://` (used for YouTube)
- Remove `cupid-local://` protocol handler (~45 lines)
- This is covered in section 1.5

### 5.2 Electron - IPC Handler Organization

**Current:** Mixed into main.cjs window creation and global handlers

**Improvement:** Group IPC handlers by feature:
- Window control handlers (already grouped)
- Playback handlers (getStreamUrl, getStreamUrlById)
- Authentication handlers (youtube-oauth-start/cancel)
- _Unused handlers (getAppleMusicToken, etc.) → remove_

**Benefit:** Easier to maintain; clearer what each handler does

### 5.3 Hook Consolidation

**Current:** 
- `useYouTubePlayer.js` - Playback logic (used)
- `useAudioPlayer.js` - Unused local playback hook
- `useTheme.js` - Theme management (used)

**Improvement:** Remove `useAudioPlayer.js` (see section 1.1)

**Additional Thought:** `useYouTubePlayer` could be renamed to just `usePlayer` to be more generic, but this is low priority
