# BTS Pixel Player

A retro-inspired BTS desktop music player built with Electron, React, and pixel-art aesthetics.

## Preview

Layered pixel-art interface with:

* animated BTS chibis
* spinning vinyl
* draggable retro volume slider
* animated playback UI
* YouTube playlist support

[Preview image goes here]

---

## Before Anything Else

This project would not exist without the original work by @cupidbity.

It is heavily based on: https://github.com/cupidbity/cupid-music-player

The original Cupid Music Player provided the foundation, architecture, Electron setup, playback system, and general inspiration that made this project possible.

Pretty please go check out the original project.

---

## Disclaimer

The BTS chibis used in this project are based on artwork by @mo45_54om.

I do not currently have permission from the artist to use these illustrations. They were included because I thought they perfectly matched the silly little vision I had for this player.

If the artist would like them removed, please let me know.

---

## Tech Stack

```txt
Electron
React
Vite
CSS
```

---

## Run Locally

```bash
npm install
npm run dev
```

---

## Build

```bash
npm run build
npm run package
```

---

# Behind The Project

( ._.)ﾉ

One day, I saw @cupidbity's music player reel on insta and I thought a BTS-themed version would look sooo cool.

A tiny retro pixel-art gadget that looked like something I'd keep permanently sitting on my desktop.

Specifically in Arirang theme because Arirang is PEAK, duh.

---

## The "VERY" Professional Development Process

1. Saw the Cupid Music Player.
2. Thought "wait this is adorable."
3. Opens ChatGPT.
4. Generates approximately a million images trying to get the exact vibe I wanted.
5. Finally got one image that looked wow.
6. Threw it into Canva.
7. Spend an unreasonable amount of time dissecting(erasing the bg) every single layer.
8. Exported everything as transparent PNGs.
9. Wondered if this was a good idea.
10. Continued anyway...

---

## Cursor enters the scene (clap, clap, clap!)

I basically described every movement and interaction I wanted.

Things like the:

* vinyl spinning
* chibis moving
* buttons glowing
* charms floating etc etc

Cursor enthusiastically attempted to create all of it. (a very intelligent attempt tho)

The result was...

chaos.

Things worked.

Mostly.

But the buttons were everywhere, layering was everywhere and the window controls had their own life plans.

At one point I think half the UI was playing hide and seek in the z-index.

---

## The Great CSS

After spending hours wondering, why is literally everything in the wrong place!?

I discovered the answer was:

CSS.

The entire time.

Not Electron.

Not React.

Not some dark magic.

Just CSS.

Turns out if you stare at:

```css
position: absolute;
z-index: ???;
```

for long enough, eventually enlightenment arrives.

Just when I thought the layering problems were over, responsiveness entered the chat.

The original design was basically a pile of carefully positioned pixel-art PNGs that looked great at exactly one size. The moment the window became too large, everything became FYAAAA. The moment it became too small, text began fighting for survival.

"Looks perfect."

resizes window

"Never mind."

It's one of those things nobody notices when it works, but everyone notices when it doesn't.

So if the player still looks like a functioning retro gadget whether it's tiny in a corner or taking up the entire screen, just know there was probably an unnecessary amount of CSS tweaking involved.

---

## What I Actually Did

Honestly?

Not that much.

The original Cupid Music Player already handled the difficult parts.

Most of my contribution was:

* having the BTS theme idea
* separating the assets in canva
* repeatedly moving things 3 pixels left and then 2 pixels right

The real MVPs were:

* Cupid Music Player
* ChatGPT
* Cursor
* Canva Pro
* stubbornness

---

## Music Sources

I removed most of the original music source functionality and kept things much simpler.

Current version focuses on:

* YouTube public playlist links (I think unlisted works too)
* preset playlists

(None of the current preset playlists are my own, got them from youtube.)

Mental note:

I should probably make my own playlists eventually.

---

## Future Ideas

(づ｡◕‿‿◕｡)づ

Maybe someday:

* different themes like Love Yourself or Map of the Soul.
* having the lyrics displayedd
* more chaotic chibi interactions

---

## Things This Project Taught Me

* CSS is stronger than me.
* Cursor is surprisingly fun (until you exhaust your credits half way through...).
* Frameless custom Electron apps are so damn cute.
* "This will only take one evening, I have AI" is a fools thought(mine).

---

## Final Thoughts

This wasn't meant to be some huge polished software project.

I just wanted a cute BTS music player sitting on my desktop as quickly as possible.

Somewhere along the way it became a surprisingly fun little side project and an excuse to experiment with Cursor.

If you're reading this, thanks for checking it out.

And if something is off by two or three pixels...

I probably noticed.

I'm just pretending I didn't.

(￣▽￣)
