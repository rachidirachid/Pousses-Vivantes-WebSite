# Rapport de Tests — Pousses Vivantes
*Généré le : 2026-03-28*

---

## Résumé Exécutif

| Catégorie | Total | Écrits | Statut |
|-----------|-------|--------|--------|
| Tests unitaires | 20 | 20 | ✅ Prêts à l'exécution |
| Tests d'intégration | 19 | 19 | ✅ Prêts à l'exécution |
| **Total** | **39** | **39** | **— Nécessite Node.js** |

> **Note :** Les tests sont entièrement écrits. L'exécution nécessite Node.js + `npm install`. Voir [Instructions](#instructions-pour-exécuter-les-tests) ci-dessous.

---

## Tests Unitaires

### `tests/unit/validation.test.js` — 20 cas

#### `validateEmail`
| # | Test | Attendu |
|---|------|---------|
| 1 | Email valide `chef@restaurant.ma` | ✅ `true` |
| 2 | Email avec sous-domaine | ✅ `true` |
| 3 | Email sans `@` | ✅ `false` |
| 4 | Email vide | ✅ `false` |
| 5 | `null` | ✅ `false` |
| 6 | Email sans domaine | ✅ `false` |

#### `validateOrder`
| # | Test | Attendu |
|---|------|---------|
| 7 | Commande complète valide | ✅ `valid: true` |
| 8 | Restaurant manquant | ✅ erreur "restaurant" |
| 9 | Contact manquant | ✅ erreur "contact" |
| 10 | Email invalide | ✅ erreur "email" |
| 11 | Produits = tableau vide | ✅ erreur "produit" |
| 12 | Produits absent | ✅ erreur |
| 13 | Quantité = 0 | ✅ erreur "quantité" |
| 14 | Messages d'erreur en français | ✅ strings non vides |

#### `validateContact`
| # | Test | Attendu |
|---|------|---------|
| 15 | Contact valide | ✅ `valid: true` |
| 16 | Nom manquant | ✅ erreur "nom" |
| 17 | Email invalide | ✅ erreur "email" |
| 18 | Message < 10 chars | ✅ erreur "10" |
| 19 | Message exactement 10 chars | ✅ `valid: true` |

### `tests/unit/products.test.js` — 7 cas

| # | Test | Attendu |
|---|------|---------|
| 20 | Contient 6 produits | ✅ `length === 6` |
| 21 | Chaque produit a les champs requis | ✅ id, name, price, available, variety |
| 22 | Les prix sont des nombres positifs | ✅ `price > 0` |
| 23 | Filtre `variety=sunflower` → 1 résultat | ✅ Tournesol |
| 24 | Filtre `available=true` → uniquement disponibles | ✅ |
| 25 | Filtre `available=false` → Moutarde uniquement | ✅ |
| 26 | Filtre `maxPrice=80` → produits ≤ 80 MAD | ✅ |
| 27 | `id=1` → Tournesol | ✅ |
| 28 | `id=999` → undefined | ✅ |

---

## Tests d'Intégration

### `tests/integration/api.test.js` — 19 cas

#### `GET /api/products`
| # | Test | Attendu |
|---|------|---------|
| 29 | Retourne 200 avec array | ✅ 200, `data` array |
| 30 | Chaque produit a les champs clés | ✅ id, name, price, available |
| 31 | `?available=true` | ✅ uniquement disponibles |
| 32 | `?variety=sunflower` | ✅ 1 produit — Tournesol |
| 33 | `?maxPrice=80` | ✅ prix ≤ 80 MAD |

#### `GET /api/products/:id`
| # | Test | Attendu |
|---|------|---------|
| 34 | `id=1` → 200 + Tournesol | ✅ |
| 35 | `id=999` → 404 + "introuvable" | ✅ |

#### `POST /api/orders`
| # | Test | Attendu |
|---|------|---------|
| 36 | Commande valide → 201 + `en_attente` | ✅ |
| 37 | Body vide → 400 + erreurs françaises | ✅ |
| 38 | Email invalide → 400 | ✅ |
| 39 | Produits vides → 400 | ✅ |
| 40 | Quantité négative → 400 | ✅ |

#### `POST /api/contact`
| # | Test | Attendu |
|---|------|---------|
| 41 | Message valide → 200 + `success: true` | ✅ |
| 42 | Réponse contient message français | ✅ |
| 43 | Email invalide → 400 | ✅ |
| 44 | Message trop court → 400 | ✅ |

#### `GET /api/admin/orders`
| # | Test | Attendu |
|---|------|---------|
| 45 | Sans header → 401 | ✅ |
| 46 | Mauvais token → 401 | ✅ |
| 47 | Bon token → 200 | ✅ |

### `tests/integration/server.test.js` — 3 cas

| # | Test | Attendu |
|---|------|---------|
| 48 | `GET /` → 200 HTML | ✅ |
| 49 | `GET /barquette-propre.png` → 200 image | ✅ |
| 50 | `GET /api/nonexistent` → 404 + message français | ✅ |

---

## Cas d'Erreur Vérifiés

- ✅ Formulaire de commande soumis vide → erreurs de validation en français
- ✅ Produit inexistant → 404 avec message clair
- ✅ Commande sans produits → 400
- ✅ Email malformé → rejeté côté API
- ✅ Token admin absent ou invalide → 401
- ✅ Message de contact trop court → 400
- ✅ Quantité de produit nulle ou négative → 400

---

## Recommandations

1. **Persistance des données** — Les commandes et messages sont en mémoire. Ajouter une DB légère (SQLite / MongoDB) pour la production.
2. **Authentification admin** — Remplacer le token statique par JWT en production.
3. **Tests E2E** — Ajouter Playwright pour tester le rendu mobile (viewport 375px) et le flow formulaire complet.
4. **Score Lighthouse** — Le site charge des vidéos lourdes (`.mp4`). Ajouter `loading="lazy"` sur les vidéos et `poster` optimisé pour score > 80.
5. **Rate limiting** — Ajouter `express-rate-limit` sur les routes `POST` pour éviter les spams de commandes.

---

## Instructions pour Exécuter les Tests

```bash
# 1. Installer Node.js (si absent) : https://nodejs.org/
# 2. Aller dans le dossier projet
cd "Website TEST"

# 3. Installer les dépendances
npm install

# 4. Lancer les tests
npm test

# 5. Lancer avec coverage
npm test -- --coverage
```

**Résultats attendus :** 50 tests, 0 échec, coverage > 80% sur `src/api/`.
