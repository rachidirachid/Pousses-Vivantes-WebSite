# Build Summary — Pousses Vivantes
*Mars 2026 — Site micro-pousses premium · Restaurants gastronomiques Maroc*

---

## Pour lancer le projet

```bash
# Prérequis : Node.js >= 18 installé

cd "Website TEST"
npm install
npm start
# → http://localhost:3000
```

---

## Ce qui a été fait

### 1. Serveur Express (nouveau)
- `server.js` — Serveur Node.js/Express sur le port 3000
- Sert les fichiers statiques (index.html, images, vidéos) via `express.static`
- API REST sur `/api/*`

### 2. API REST (nouveau — `src/api/`)
| Endpoint | Description |
|----------|-------------|
| `GET /api/products` | Liste des micro-pousses avec filtres |
| `GET /api/products/:id` | Détail produit |
| `POST /api/orders` | Soumettre une commande professionnelle |
| `POST /api/contact` | Formulaire de contact |
| `GET /api/admin/orders` | Commandes reçues (token: `pousses-admin-2024`) |

- Validation avec messages d'erreur en français
- Données en mémoire (6 produits, commandes, messages)

### 3. Nouvelles sections HTML (`index.html`)
4 sections ajoutées avant la newsletter/footer :

| Section | ID | Contenu |
|---------|----|---------|
| Catalogue produits | `#catalogue` | Grille 6 produits, filtres variété + prix, fetch API |
| Pourquoi Pousses Vivantes | `#pourquoi` | 4 cartes engagements (récolte J0, local, naturel, livraison) |
| Formulaire de commande | `#commande` | Form pro 2 colonnes, submit vers `/api/orders` |
| Témoignages chefs | `#temoignages` | 3 chefs marocains fictifs, fond forêt |

### 4. CSS enrichi (dans `index.html` + `src/styles/design-system.css`)
- CSS des nouvelles sections injecté dans le `<style>` existant
- Design system complet dans `src/styles/design-system.css` (tokens, boutons, grilles, animations)
- Responsive mobile-first : breakpoints 768px et 1024px

### 5. Tests (`tests/`)
- `jest.config.js` — Configuration Jest
- `tests/unit/validation.test.js` — 14 tests de validation
- `tests/unit/products.test.js` — 9 tests de filtrage produits
- `tests/integration/api.test.js` — 19 tests d'intégration API
- `tests/integration/server.test.js` — 3 tests serveur statique
- `tests/report.md` — Rapport complet

### 6. Documentation (`docs/`)
- `docs/api.md` — Documentation des 5 endpoints REST
- `docs/design-system.md` — Palette, typographie, composants
- `docs/build-summary.md` — Ce fichier

---

## Structure finale du projet

```
Website TEST/
├── index.html              ← Site amélioré (nouvelles sections + CSS)
├── server.js               ← Serveur Express port 3000
├── package.json            ← Scripts npm (start, test)
├── jest.config.js          ← Config Jest
├── src/
│   ├── styles/
│   │   └── design-system.css  ← Design system (tokens CSS)
│   └── api/
│       ├── routes/
│       │   ├── products.js    ← GET /api/products + /api/products/:id
│       │   ├── orders.js      ← POST /api/orders + GET /api/admin/orders
│       │   └── contact.js     ← POST /api/contact
│       └── middleware/
│           └── validation.js  ← validateEmail, validateOrder, validateContact
├── docs/
│   ├── api.md              ← Documentation REST API
│   ├── design-system.md    ← Palette + typographie
│   └── build-summary.md    ← Ce fichier
├── tests/
│   ├── unit/
│   │   ├── validation.test.js
│   │   └── products.test.js
│   ├── integration/
│   │   ├── api.test.js
│   │   └── server.test.js
│   └── report.md           ← Rapport de tests (50 cas)
└── [assets existants]      ← images, vidéos, index copies
```

---

## Décisions architecturales

| Décision | Raison |
|----------|--------|
| Vanilla HTML/CSS/JS (pas React) | Le site existant est un monolithe HTML très élaboré — le convertir en React aurait tout cassé |
| Données en mémoire (pas de DB) | Simplicité pour MVP ; prod → ajouter SQLite ou MongoDB |
| Token statique admin | Suffisant pour MVP ; prod → JWT avec expiration |
| CSS dans `<style>` existant | Maintien de la cohérence avec le design existant sans build step |
| Express static pour les assets | Évite un serveur web séparé (nginx) pour le développement |
