# Lopper Home — Landing Page

Responsive landing page built with SCSS, Gulp, and vanilla JavaScript.

## Tech Stack

- **SCSS** — preprocessor with modular architecture
- **Gulp 5** — task runner (SCSS compilation, CSS/JS minification, image optimization)
- **Swiper.js** — touch slider for features section
- **BrowserSync** — live reload dev server

## Project Structure

```
src/
├── scss/
│   ├── base/           # Variables, reset, base styles
│   ├── components/     # Reusable components (btn, label, mobile-menu)
│   ├── layout/         # Container, responsive breakpoints
│   ├── sections/       # Page sections (header, hero, intro, features, newsletter, footer)
│   └── main.scss       # Entry point — imports all partials
├── js/
│   └── main.js         # Menu toggle, sticky header, Swiper init
├── img/                # Source images and SVGs
├── fonts/              # Local font files (if any)
└── index.html          # HTML template
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Install

```bash
npm install
```

### Development (with live reload)

```bash
npm run dev
```

Opens a local server at `http://localhost:3000` with hot CSS injection and auto-reload.

### Production Build

```bash
npm run build
```

Outputs optimized files to `dist/`:
- Compiled & minified CSS
- Minified JS
- Minified HTML
- Optimized images

## SCSS Architecture

Styles follow a modular structure inspired by ITCSS/7-1 pattern:

| Layer | Purpose | Files |
|-------|---------|-------|
| `base/` | CSS variables, reset, typography defaults | `_variables`, `_reset`, `_base` |
| `layout/` | Container grid, responsive overrides | `_container`, `_responsive` |
| `components/` | Reusable UI elements | `_btn`, `_label`, `_mobile-menu` |
| `sections/` | Page-specific section styles | `_header`, `_hero`, `_intro`, `_features`, `_newsletter`, `_footer` |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
