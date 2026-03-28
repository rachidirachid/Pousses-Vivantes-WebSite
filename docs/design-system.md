# Design System — Pousses Vivantes

Palette végétale premium · Typographie Cormorant Garamond + DM Sans

---

## Palette de couleurs

| Variable       | Hex       | Usage |
|----------------|-----------|-------|
| `--forest`     | `#1a2e1a` | Backgrounds sombres, titres principaux, footer |
| `--moss`       | `#2d4a2d` | Hover sur boutons, accents foncés |
| `--sage`       | `#5a7a4e` | Textes secondaires, eyebrows, labels |
| `--fern`       | `#7aab62` | CTA primaire, badges disponibilité, accents vifs |
| `--mist`       | `#c8dab8` | Borders, séparateurs, backgrounds subtils |
| `--cream`      | `#f5f0e8` | Sections alternées (pourquoi, intro) |
| `--ivory`      | `#fdfaf4` | Background principal du site |
| `--gold`       | `#c9a84c` | Bestseller, highlights luxe, accents or |
| `--amber`      | `#e8c96a` | Hover or, gradients chauds |
| `--charcoal`   | `#1c1c1c` | Footer, textes très foncés |
| `--text-body`  | `#3a3a3a` | Corps de texte principal |

---

## Typographie

### Fontes
- **Display** : `Cormorant Garamond` (serif élégant) — Titres, citations, nombres stats
- **Body** : `DM Sans` (sans-serif épuré) — Corps de texte, labels, boutons

### Tailles
| Variable       | Valeur     | Usage |
|----------------|------------|-------|
| `--text-xs`    | 0.72rem    | Labels, badges, eyebrows |
| `--text-sm`    | 0.82rem    | Captions, descriptions |
| `--text-base`  | 0.95rem    | Corps de texte |
| `--text-md`    | 1.05rem    | Intro, texte agrandi |
| `--text-xl`    | 1.5rem     | Petits titres |
| `--text-2xl`   | 2rem       | Titres de section |
| `--text-hero`  | clamp(3rem, 6vw, 5.5rem) | Titre hero |

---

## Espacements

| Variable       | Valeur  |
|----------------|---------|
| `--space-xs`   | 0.25rem (4px) |
| `--space-sm`   | 0.5rem  (8px) |
| `--space-md`   | 1rem    (16px) |
| `--space-lg`   | 1.5rem  (24px) |
| `--space-xl`   | 2rem    (32px) |
| `--space-2xl`  | 3rem    (48px) |
| `--space-3xl`  | 5rem    (80px) |
| `--space-4xl`  | 8rem    (128px) |

---

## Composants UI

### Boutons
- `.btn-primary` — Vert fougère, effet slide au hover
- `.btn-secondary` — Vert forêt, hover moss
- `.btn-outline` — Transparent + border forêt
- `.btn-ghost` — Texte seul avec underline
- `.btn-gold` — Or, hover ambre
- Modificateurs : `.btn-sm`, `.btn-lg`, `.btn-pill`

### Cards
- `.card-hover` — Lift au hover (translateY -6px + shadow)
- `.cat-card` — Card catalogue produit (radius 14px, shadow douce)
- `.pourquoi-card` — Card engagement (border + hover border sage)
- `.temoignage-card` — Card témoignage (fond transparent sur forêt)

### Badges
- `.badge-green` — Disponible (fern)
- `.badge-gold` — Bestseller (gold)
- `.badge-red` — Rupture / erreur
- `.badge-muted` — Tag neutre (cream + sage)

---

## Animations disponibles

| Classe | Effet |
|--------|-------|
| `.animate-fadeIn` | Apparition opacité |
| `.animate-fadeUp` | Montée + opacité |
| `.animate-slideInLeft` | Entrée par la gauche |
| `.animate-slideInRight` | Entrée par la droite |
| `.animate-scaleIn` | Zoom d'entrée |
| `.animate-float` | Flottement continu |

Délais : `.delay-100` à `.delay-500` (100ms — 500ms)

---

## Breakpoints

| Nom | Valeur |
|-----|--------|
| sm  | 640px  |
| md  | 768px  |
| lg  | 1024px |
| xl  | 1280px |

---

## Courbes d'animation

| Variable | Valeur |
|----------|--------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out`   | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--ease-spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--transition-fast` | 0.15s |
| `--transition-base` | 0.3s  |
| `--transition-slow` | 0.6s  |
