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

## Latest Changes (December 13, 2024 - Session 2)
- Refactored ParticleAnimation to support containerMode for specific sections
- Particle animation now only appears in:
  - Hero section (with countdown timer)
  - Artistas (Origem) section behind images
  - CEO comment box in About section
- Removed global particle animation from App.tsx
- No particle animation on Imersão (Projects) page
- Moved Cristo image to be absolutely positioned at the center-bottom of About section
- Added letter-by-letter entrance animation for "IMERSÃO" title on Projects page

## Latest Changes (December 13, 2024 - Session 3)
- Improved particle animation sensitivity and coverage:
  - Particles now cover the entire hero section (title, button, countdown, etc)
  - Interaction works everywhere the mouse passes in the section
  - Slightly reduced sensitivity (30ms interval, 3 particles per movement)
- CEO comment section: black background, white text, white particles
- Created AlbumPopup component (Spotify-style):
  - Shows album cover and community invitation
  - "Participar da Comunidade" button links to WhatsApp
  - "Ir Para o Album" button navigates to home
  - Responsive design for all screen sizes
- Increased Cristo image size by 30% (w-24 to w-32)
- All changes are responsive and work across desktop/mobile
