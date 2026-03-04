# Parth Patil · Portfolio

A personal portfolio website with an organic, editorial aesthetic — built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step.

## Features

- Organic Three.js particle field with mouse parallax and ambient light bloom
- Custom amber cursor with lagging ring follow effect
- Scroll-triggered reveal animations via IntersectionObserver
- 3D CSS tilt on skill and project cards
- Cormorant Garamond + JetBrains Mono typography pairing
- Deep forest green + amber + cream color palette
- Grain texture overlay for depth
- Fully self-contained — single HTML file with inline CSS and JS

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- [Three.js r128](https://threejs.org/) — 3D particle background
- [GSAP 3](https://gsap.com/) — smooth scroll and animation utilities
- [Font Awesome 6](https://fontawesome.com/) — icons
- [Google Fonts](https://fonts.google.com/) — Cormorant Garamond, JetBrains Mono

## Project Structure

```
portfolio/
├── index.html       ← entire site (HTML + CSS + JS in one file)
└── assets/
    ├── resume.pdf
    ├── logo.ico
    ├── microsoft-certified-fundamentals-badge.svg
    └── *.jpg        ← project screenshots
```

## Setup

1. Clone the repository
2. Place your files in the `assets/` folder
3. Open `index.html` in any browser — no build process required

## License

MIT
