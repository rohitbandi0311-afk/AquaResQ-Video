# AquaResQ — 150 s hackathon demo video (Remotion)

Composition id **AquaResQ** · 1920×1080 · 30 fps · **4,500 frames** · 11 scenes · bright aqua/white identity (no dark backgrounds).

Everything lives in two NEW folders, so nothing in your project is overwritten:
`src\aquaresq\` and `public\aquaresq\`.

## Honest status
- Code was written in a cloud workspace without Remotion installed. It passes a TypeScript strict check against stubbed typings and an esbuild syntax pass, but **it has NOT been rendered or previewed yet**. Do the preview first (step 4) and tell me anything that looks off.
- Focus-box / camera coordinates were measured by eye from your screenshots. If an outline sits slightly off a field, nudge the numbers in the scene file (they are plain source-pixel values).
- Voice-over, music, SFX and real aerial footage were **not supplied**, so those layers are OFF (flags in `src\aquaresq\data\timeline.ts`). Nothing is faked: pond scenes use a clearly tagged vector placeholder until you add real footage.

## Do this
**1. Extract** the zip anywhere (e.g. Downloads).

**2. Install into your project** (PowerShell, from the extracted folder):
```
cd <extracted folder>
powershell -ExecutionPolicy Bypass -File scripts\install.ps1
```
(or just copy `src\aquaresq` → `C:\my-video\src\aquaresq` and `public\aquaresq` → `C:\my-video\public\aquaresq`)

**3. Register the composition** — open `C:\my-video\src\Root.tsx`, add the import at the top and the tag inside your existing fragment, next to MyComp:
```tsx
import {AquaResQComposition} from './aquaresq/AquaResQRoot';
// ...inside RemotionRoot's return:
<AquaResQComposition />
```

**4. Preview**
```
cd C:\my-video
npm run dev
```
Open http://localhost:3000 → pick **AquaResQ**. Scrub through all 11 scenes. Quick still check:
```
npx remotion still AquaResQ out\check.png --frame=1500
```

**5. Render**
```
cd C:\my-video
npx remotion render AquaResQ out\aquaresq.mp4 --codec=h264
```
Verify length/size/audio (needs ffprobe): `ffprobe -v error -show_entries stream=width,height,r_frame_rate,duration -of default=nw=1 out\aquaresq.mp4` → expect 1920, 1080, 30/1, 150.

## Scene map (exact frames)
| # | Scene | Frames | Time | Visual |
|---|---|---|---|---|
| 1 | The Aquaculture World | 0–239 | 0:00–0:08 | Pond aerial + 3 phrases at 2.5 / 4.5 / 6.5 s |
| 2 | The Emergency | 240–539 | 0:08–0:18 | Aerator slows, supply green→coral, 3 pond cards switch off |
| 3 | Introducing AquaResQ | 540–899 | 0:18–0:30 | Your real logo on water ripples → floating browser with real app |
| 4 | Multi-Pond Management | 900–1319 | 0:30–0:44 | Real Overview → click Ponds → focus outlines on pond fields |
| 5 | Outage Simulation | 1320–1859 | 0:44–1:02 | Real Power & backup → run button → real oxygen chart, 4 mg/L line |
| 6 | The Resource Challenge | 1860–2399 | 1:02–1:20 | 2+2+2 = 6 kW vs 4 kW, 2 kW short, 4 kW × 12 h = 48 kWh |
| 7 | The Optimization Engine | 2400–2999 | 1:20–1:40 | Real Plan generator power → 8 combos checked → P1 2 kW / P2 0 / P3 2 kW |
| 8 | Results and Comparison | 3000–3539 | 1:40–1:58 | Bars 89.28 / 36.24 / 23.60, 73.6 % + honest trade-off note |
| 9 | Explainable Decisions | 3540–4049 | 1:58–2:15 | Real Explainable panel → INPUTS → CONSTRAINTS → DECISION |
| 10 | Honest Limitations | 4050–4289 | 2:15–2:23 | Dashboard + 3 limitation statements |
| 11 | Final Brand Reveal | 4290–4499 | 2:23–2:30 | Logo, tagline, TEAM SKAY, HACKWITHADITYA 2026, fade to light |

Transitions at every boundary (24 frames, aqua, all different in sequence: fade / ripple-circle / light sweep / wipe / push).

## Numbers (checked against your screenshots)
Integrated oxygen deficit: no generator 89.278 · highest initial risk first 36.240 · AquaResQ 23.595 mg/L·h → (89.278−23.595)/89.278 = **73.6 %** ✔. Plan P1 2 kW / P2 0 kW / P3 2 kW, 4 kW, 48 kWh, 7 of 8 allocations feasible ✔.
Scene 8 also shows that "Highest initial risk first" has fewer pond-hours at/below threshold (12.99 h vs 19.29 h) — so the video never claims AquaResQ wins every metric. Edit values in `src\aquaresq\data\demoMetrics.ts`.

## Asset manifest
| Asset | Format / size | Scene | Status |
|---|---|---|---|
| `public/aquaresq/aquaresq-logo.png` | PNG transparent, 1774×887 | 3, 11 | ✅ supplied |
| `public/aquaresq/screens/*.png` (13 screenshots) | PNG ~1535×775 | 3, 4, 5, 7, 9, 10 | ✅ supplied (used as stills with camera moves) |
| `public/aquaresq/pond-aerial.mp4` | MP4, 1920×1080+, daylight aerial ponds | 1, 2 | ❌ missing → vector placeholder |
| Real screen recordings (overview / ponds / power / simulation / explainable) | MP4 1920×1080 | 4, 5, 7, 9 | ❌ not supplied → screenshots used. Optional upgrade, tell me and I'll swap them in |
| Generator / power-outage footage | MP4 | 2 | ❌ not needed — scene 2 is built from graphics |
| `public/aquaresq/audio/background-music.mp3` | MP3, bright/uplifting, licence known | all | ❌ missing (flag `music`) |
| `public/aquaresq/audio/vo/scene01.mp3 … scene11.mp3` | one MP3 per scene | all | ❌ missing (flag `voiceover`) |
| `public/aquaresq/audio/sfx/` whoosh, power-down, rise, logo-reveal, click, pop, data-pulse, impact, resolve (.mp3) | short MP3s | see `SFX` in timeline.ts | ❌ missing (flag `sfx`) |

Screenshots used: overview (3,4,9,10), pond-management (4), power-backup (5), oxygen-chart (5), plan-generator (7). The others are included for later use.

## Voice-over (bro, voice-over already undha?)
Not uploaded, so: script = `narration\narration.txt` (exact text, per scene in `narration\scenes\`). Two ways:
- **Your own voice / any studio voice:** save as `scene01.mp3 … scene11.mp3` in `public\aquaresq\audio\vo\`.
- **AI voice:** `scripts\make-voiceover.ps1` (uses edge-tts, Indian English, slightly slow). I could not generate audio here, and I haven't checked that service's licensing for your use.

Then set `voiceover: true` in `timeline.ts`. Each clip starts 0.5 s into its scene, so sync is automatic. **Each clip must be shorter than its scene.** Estimated spoken length @ ~2.3 words/s (194 words, ~84 s total):
scene01 5.2/8 s · 02 6.1/10 · 03 4.8/12 · 04 7.4/14 · 05 10.9/18 · 06 10.9/18 · 07 10.0/20 · 08 11.3/18 · 09 9.6/17 · 10 6.1/8 · 11 2.2/7.
Subtitle timing is estimated from the same rate (`narration\subtitles.estimated.srt`, `src\aquaresq\data\cues.ts`). After real audio, if timing drifts, tell me the clip lengths and I'll re-time the cues. Subtitles are ON because your brief asks for them; set `SHOW_SUBTITLES = false` to hide.

## Music & SFX
Music auto-ducks under every spoken cue and fades in/out (`AudioLayer.tsx`). I can't confirm the licence of any track, so use one you have rights to. SFX are placed at the frames listed in `timeline.ts` (`SFX`).

## Before the final render
- Set `SHOW_PLACEHOLDER_TAGS = false` in `timeline.ts`.
- Drop in aerial footage + flip `pondAerial: true` if you have it.
- Check no subtitle covers a chart value, and every result slide still shows its "SIMULATED / NOT LIVE" label.

## Files
```
src/aquaresq/AquaResQRoot.tsx     composition registration (id AquaResQ)
src/aquaresq/AquaResQVideo.tsx    timeline, transitions, subtitles, audio
src/aquaresq/scenes/              Opening, Outage, ProductReveal, PondManagement, Simulation,
                                  Constraint, Optimization, Results, Explainability, Limitations, Closing
src/aquaresq/components/          AnimatedTitle, MetricCard, BrowserFrame, ScreenshotShot, AnimatedChart,
                                  SubtitleTrack, Disclaimer, WaterBackground, PondAerial, Aerator,
                                  SceneTransition, AudioLayer
src/aquaresq/data/                timeline.ts, demoMetrics.ts, cues.ts
narration/                        narration.txt, scenes/*.txt, subtitles.estimated.srt
scripts/                          install.ps1, make-voiceover.ps1
```
