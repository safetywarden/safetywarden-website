# SafetyWarden Video Optimization Workflow

Use this workflow to turn raw field execution recordings into premium enterprise SaaS demo videos for the homepage, pitch decks, LinkedIn, and sales demos.

## Folder Structure

```text
public/assets/videos/
  raw/       Original screen recordings. Keep untouched.
  edited/    Trimmed, sped-up, compressed product demos.
  hero/      Lightweight autoplay homepage loops.
  archive/   Old exports and alternate versions.
```

Recommended naming:

```text
public/assets/videos/raw/field_execution_raw.mp4
public/assets/videos/edited/field_execution_demo.mp4
public/assets/videos/hero/field_execution_hero.mp4
```

## Install Requirement

Install `ffmpeg` first:

```bash
ffmpeg -version
```

If that command fails, install ffmpeg from https://ffmpeg.org/download.html and reopen your terminal.

## Founder-Friendly NPM Commands

Create a homepage hero loop:

```bash
npm run video:hero -- --input public/assets/videos/raw/field_execution_raw.mp4 --start 00:00:02 --duration 00:00:16 --speed 1.5
```

Create a 30-60 second product story demo:

```bash
npm run video:demo -- --input public/assets/videos/raw/field_execution_raw.mp4 --start 00:00:00 --duration 00:00:50 --speed 1.25
```

Trim a clean clip:

```bash
npm run video:trim -- --input public/assets/videos/raw/field_execution_raw.mp4 --start 00:00:04 --duration 00:00:22 --output public/assets/videos/edited/inspection_clip.mp4
```

Compress an edited demo for the website:

```bash
npm run video:compress -- --input public/assets/videos/edited/field_execution_demo.mp4 --output public/assets/videos/edited/field_execution_demo_web.mp4
```

Speed up a clip:

```bash
npm run video:speed -- --input public/assets/videos/raw/field_execution_raw.mp4 --speed 1.5 --output public/assets/videos/edited/field_execution_1_5x.mp4
```

## Raw FFMPEG Recipes

### Speed Optimization

Use these when the recording has slow navigation, scrolling, loading, or repeated taps.

1.25x speed, good for product demos:

```bash
ffmpeg -y -i public/assets/videos/raw/field_execution_raw.mp4 -an -vf "setpts=0.8000*PTS,fps=30" -c:v libx264 -preset slow -crf 23 -movflags +faststart -pix_fmt yuv420p public/assets/videos/edited/field_execution_1_25x.mp4
```

1.5x speed, good for homepage loops:

```bash
ffmpeg -y -i public/assets/videos/raw/field_execution_raw.mp4 -an -vf "setpts=0.6667*PTS,fps=30" -c:v libx264 -preset slow -crf 24 -movflags +faststart -pix_fmt yuv420p public/assets/videos/edited/field_execution_1_5x.mp4
```

2x speed, useful only for idle scrolling or repetitive menu navigation:

```bash
ffmpeg -y -i public/assets/videos/raw/field_execution_raw.mp4 -an -vf "setpts=0.5000*PTS,fps=30" -c:v libx264 -preset slow -crf 24 -movflags +faststart -pix_fmt yuv420p public/assets/videos/edited/field_execution_2x.mp4
```

### Trim And Export

Trim intro/outro and remove audio:

```bash
ffmpeg -y -ss 00:00:02 -t 00:00:16 -i public/assets/videos/raw/field_execution_raw.mp4 -an -c:v libx264 -preset slow -crf 23 -movflags +faststart -pix_fmt yuv420p public/assets/videos/edited/field_execution_trimmed.mp4
```

Create a clean clip from an important moment:

```bash
ffmpeg -y -ss 00:00:18 -t 00:00:08 -i public/assets/videos/raw/field_execution_raw.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 22 -movflags +faststart -pix_fmt yuv420p public/assets/videos/edited/evidence_capture_clip.mp4
```

### Homepage Hero Loop

Target: 10-18 seconds, muted, under 8 MB preferred.

```bash
ffmpeg -y -ss 00:00:02 -t 00:00:16 -i public/assets/videos/raw/field_execution_raw.mp4 -an -vf "setpts=0.6667*PTS,scale=1080:-2,fps=30" -c:v libx264 -preset slow -crf 24 -maxrate 1800k -bufsize 3600k -movflags +faststart -pix_fmt yuv420p public/assets/videos/hero/field_execution_hero.mp4
```

If the output is still too large, increase CRF:

```bash
ffmpeg -y -i public/assets/videos/hero/field_execution_hero.mp4 -an -vf "scale=960:-2,fps=30" -c:v libx264 -preset slow -crf 27 -maxrate 1200k -bufsize 2400k -movflags +faststart -pix_fmt yuv420p public/assets/videos/hero/field_execution_hero_small.mp4
```

### Product Story Demo

Target: 30-60 seconds, clear enough for investor and sales demos.

```bash
ffmpeg -y -ss 00:00:00 -t 00:00:50 -i public/assets/videos/raw/field_execution_raw.mp4 -an -vf "setpts=0.8000*PTS,scale=1920:-2,fps=30" -c:v libx264 -preset slow -crf 23 -maxrate 4500k -bufsize 9000k -movflags +faststart -pix_fmt yuv420p public/assets/videos/edited/field_execution_demo.mp4
```

## Editing Rules

Preserve readability during:

- Evidence upload
- Inspection answer selection
- CAPA assignment
- Sync confirmation

Speed up:

- Scrolling
- Loading waits
- Menu navigation
- Repeated taps
- Repetitive transitions

Delete:

- Accidental pauses
- Dead time
- Browser UI clutter
- Debug/admin wandering
- Long setup steps

## Recommended Export Settings

Homepage hero:

- Format: MP4 H.264
- Length: 10-18 seconds
- Audio: removed
- CRF: 24-28
- Width: 960-1080px for mobile-oriented videos
- Target size: under 8 MB
- Browser attributes: `autoPlay muted loop playsInline preload="metadata"`

Product demo:

- Format: MP4 H.264
- Length: 30-60 seconds
- Audio: optional, usually removed for website sections
- CRF: 22-24
- Width: 1280-1920px
- Target size: small enough for web, but clarity matters more than hero loops

## Website Integration

Use files from `public/assets/videos/hero/` for homepage autoplay loops.

```tsx
<video autoPlay muted loop playsInline preload="metadata">
  <source src="/assets/videos/hero/field_execution_hero.mp4" type="video/mp4" />
</video>
```

Use files from `public/assets/videos/edited/` for product demo sections.

## Enterprise SaaS Pacing Checklist

Before publishing, confirm the video feels like:

- Mobile inspection execution
- Evidence-based audits
- CAPA governance
- Offline field readiness
- Real-time compliance visibility

It should not feel like:

- Raw screen recording
- Slow scrolling capture
- Technical debugging walkthrough
- Dashboard-only reporting demo
