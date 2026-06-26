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
- Literature search and appraisal activities
- Modal-based viewing of clinical figures and article images
- Final summary screen with case completion score
- Restart flow for repeated use in teaching or self-study

## Project Structure

```text
src/
  components/   Reusable UI building blocks
  context/      Shared quiz and navigation state
  scenes/       Interactive case scenes
  styles/       Global design tokens and base styles
assets/         Clinical images and article figures
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

## Tech Stack

- React 18
- Vite 5
- Plain CSS

## Notes

- macOS metadata files are excluded from version control through `.gitignore`.
- Build output is generated into `dist/` and should not be committed.

## Repository

GitHub repository:
`bayloremily/dpt-6421-clinical-decision-interactive`
