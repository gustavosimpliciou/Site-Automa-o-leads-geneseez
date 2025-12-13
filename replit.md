# Geneseez - Creative Studio Website

## Overview
Geneseez is a creative studio website focused on music, art, design, video, and photography. The name "Geneseez" comes from "genesis" - representing the beginning of creation.

## Current State
The website is fully functional with the following sections:
- **Hero**: "Onde tudo comeca" / "Criamos o que ainda nao existe"
- **About**: Description of the creative studio and services
- **Projects**: Spotify-style album player featuring "EXTASE 999" album (9 tracks by DIIVINU and LOPZ)
- **Origem**: Maintained from original design (displays cristo.png image)

## Tech Stack
- React + TypeScript
- Vite
- TailwindCSS
- Lucide React (icons)

## Project Structure
```
src/
  components/
    Header.tsx      - Navigation (Inicio, Sobre, Projetos, Origem)
    Hero.tsx        - Landing section with creative messaging
    About.tsx       - Company description and services
    Projects.tsx    - Spotify-style album player for EXTASE 999
    Origem.tsx      - Original section with cristo.png
    Footer.tsx      - Footer with social links
    ParticleAnimation.tsx - Background animation
  App.tsx           - Main app with view routing
  main.tsx          - Entry point
  index.css         - Global styles

public/
  logo2.png         - White logo (for dark backgrounds)
  logo3.png         - Dark logo (for light backgrounds)
  cristo.png        - Image for Origem section
```

## Running the Project
```bash
npm run dev     # Development server on port 5000
npm run build   # Production build
npm run start   # Preview production build
```

## Recent Changes (December 2024)
- Transformed from automation company to creative studio
- Added Spotify-style album player for EXTASE 999
- Updated menu to: Inicio, Sobre, Projetos, Origem
- New creative copy focused on music, art, design

## Recent Changes (December 13, 2024)
- Added cristo.png image below CEO quote in About section (50% smaller, centered)
- Made ParticleAnimation fixed/global (doesn't scroll with page)
- Restored mouse interactivity for particles (follows cursor globally)
- Added entrance animations for images in Artists (Origem) section
- Added phrase carousel in Hero (9 second intervals): "FREQUÊNCIA UNICA", "ÊXTASE 999", "ARTE É O CAMINHO"
- Fixed Footer navigation - all links now work correctly
- "Ouvir Album" button redirects to home page with countdown
