# DPT 6421 Clinical Decision Interactive

An interactive case-based learning experience for `DPT 6421` focused on evidence-based clinical decision making in physical therapy.

## Overview

This project guides learners through a staged outpatient physical therapy case involving a patient with lumbar radiculopathy. The interactive experience walks students through:

- reviewing the patient chart
- selecting a priority examination focus
- searching the literature
- appraising diagnostic evidence
- discussing treatment options with a clinical instructor
- interpreting treatment efficacy findings
- applying research to a final clinical recommendation
- making a final treatment-threshold decision before patient arrival

The application is built as a lightweight React + Vite single-page interactive with scene-based progression.

## Course Context

`DPT 6421` is represented here as a clinical decision-making learning experience emphasizing:

- evidence-based practice
- diagnostic reasoning
- appraisal of research quality
- interpretation of treatment literature
- transfer of evidence into patient-centered care

## Features

- Scene-by-scene guided case progression
- Quiz-style knowledge checks with immediate feedback
- Retry behavior on incorrect quiz answers where applicable
- Development TOC for jumping between scenes during build-out
- Literature search and appraisal activities
- Dialogue scenes with full-screen clinical backdrops
- Voiceover, CI dialogue, ambient, and cue sound effects across major scenes
- Global sound on/off control for accessibility
- Modal-based viewing of clinical figures and article images
- Enlarged lightbox viewing for key research figures
- Screen-reader-friendly long descriptions for complex charts and tables
- Final summary screen with case completion score
- Restart flow for repeated use in teaching or self-study

## Current Interactive Flow

The current build includes:

- Start screen and rotation welcome scene
- Patient chart review and Question 1
- Diagnostic research sequence through Questions 2-6
- Diagnostic summary slide
- Lunch/break room dialogue sequence
- Treatment literature search and Question 7
- Pre-Question 9 dialogue scene
- Meta-analysis interpretation through Questions 8-9
- Article appraisal and Question 10
- Study dialogue follow-up scene
- Results interpretation and Question 11
- Functional disability interpretation and Question 12
- Final lunchroom check-in with Question 13
- Final wrap-up and score summary

## Accessibility and Media Notes

The current build includes several accessibility-focused enhancements:

- Keyboard-accessible development TOC and scene controls
- Sound toggle to pause or resume audio playback
- Audio handoff logic so advancing quickly stops the prior clip cleanly
- Low-volume environmental SFX mixed underneath narration and CI dialogue
- Text alternatives for complex charts, tables, and figures
- Portal-based enlarged graph views for Questions 11 and 12 with long descriptions

These updates improve accessibility significantly, but they do not replace a full WCAG audit across every interaction pattern and assistive technology workflow.

## Project Structure

```text
src/
  components/   Reusable UI building blocks
  context/      Shared quiz and navigation state
  hooks/        Shared behavior such as dialogue audio
  scenes/       Interactive case scenes
  styles/       Global design tokens and base styles
assets/         Clinical images, article figures, and sound effects
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages Deployment

This project is deployed to GitHub Pages from GitHub Actions.

- Vite is configured with `base: "/dpt-6421-clinical-decision-interactive/"`
- Production assets are imported through Vite so they resolve correctly under the repository subpath
- The deployment workflow lives at `.github/workflows/deploy.yml`
- GitHub Pages should be configured under:
  `Repository Settings -> Pages -> Build and deployment -> Source: GitHub Actions`

The standard deployment flow is:

```bash
npm ci
npm run build
```

The workflow then uploads `dist/` and deploys it with `actions/deploy-pages`.

## Tech Stack

- React 18
- Vite 5
- Plain CSS

## Notes

- macOS metadata files are excluded from version control through `.gitignore`.
- Existing macOS resource-fork files such as `._*`, `.DS_Store`, and `~$*` should be cleaned before commits if they appear locally.
- This repository currently tracks `dist/` because the GitHub Pages fallback deployment path depends on built output being present in the repository.
- Dialogue scene sound effects are intentionally mixed at low volume for development.

## Repository

GitHub repository:
`bayloremily/dpt-6421-clinical-decision-interactive`
