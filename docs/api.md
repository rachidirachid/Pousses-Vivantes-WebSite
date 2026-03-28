# Documentation API — Pousses Vivantes

Base URL : `http://localhost:3000/api`

---

## Produits

### `GET /api/products`
Liste tous les produits. Supporte les filtres query.

**Paramètres query (optionnels)**
| Paramètre   | Type    | Description |
|-------------|---------|-------------|
| `variety`   | string  | Filtrer par variété : `sunflower`, `radish`, `pea`, `basil`, `mustard`, `cabbage` |
| `available` | boolean | `true` ou `false` |
| `minPrice`  | number  | Prix minimum en MAD |
| `maxPrice`  | number  | Prix maximum en MAD |

**Exemple de requête**
```
GET /api/products?available=true&maxPrice=90
```

**Réponse 200**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": 1,
      "name": "Tournesol",
      "variety": "sunflower",
      "price": 85,
      "unit": "barquette 100g",
      "stock": 50,
      "description": "Goût de noisette, texture croquante.",
      "nutrition": { "proteines": "26g", "vitE": "35mg", "fer": "5mg" },
      "origin": "Casablanca, Maroc",
      "harvestDay": "J+7",
      "image": "/barquette-propre.png",
      "available": true,
      "tags": ["bestseller", "protéiné"]
    }
  ]
}
```

---

### `GET /api/products/:id`
Retourne le détail d'un produit par son ID.

**Exemple**
```
GET /api/products/1
```

**Réponse 200**
```json
{
  "success": true,
  "data": { ... }
}
```

**Réponse 404**
```json
{
  "success": false,
  "message": "Produit #999 introuvable."
}
```

---

## Commandes

### `POST /api/orders`
Soumet une nouvelle commande professionnelle.

**Headers**
```
Content-Type: application/json
```

**Body requis**
```json
{
  "restaurant":    "Al Fassia",
  "contact":       "Chef Karim Benali",
  "email":         "karim@alfassia.ma",
  "telephone":     "+212 6 61 00 00 00",
  "ville":         "Casablanca",
  "produits": [
    { "id": 1, "quantite": 3 },
    { "id": 3, "quantite": 2 }
  ],
  "dateLivraison": "2026-04-05",
  "frequence":     "hebdomadaire",
  "message":       "Livraison avant 9h si possible."
}
```

**Champs obligatoires :** `restaurant`, `contact`, `email`, `produits` (array non vide avec `id` et `quantite >= 1`)

**Réponse 201**
```json
{
  "success": true,
  "message": "Votre commande a bien été enregistrée. Nous vous confirmons sous 24h.",
  "data": {
    "id": 1,
    "statut": "en_attente",
    "createdAt": "2026-03-28T10:00:00.000Z"
  }
}
```

**Réponse 400 (erreur de validation)**
```json
{
  "success": false,
  "errors": [
    "Le nom du restaurant est obligatoire.",
    "Veuillez sélectionner au moins un produit."
  ]
}
```

---

### `GET /api/admin/orders` *(protégé)*
Liste toutes les commandes reçues.

**Headers requis**
```
X-Admin-Token: pousses-admin-2024
```

**Réponse 200**
```json
{
  "success": true,
  "count": 5,
  "data": [ { ... }, { ... } ]
}
```

**Réponse 401**
```json
{
  "success": false,
  "message": "Accès non autorisé. Token invalide ou manquant."
}
```

---

## Contact

### `POST /api/contact`
Envoie un message de contact.

**Body requis**
```json
{
  "nom":     "Chef Hassan Tazi",
  "email":   "hassan@riad.ma",
  "message": "Bonjour, je souhaite un devis pour des livraisons hebdomadaires de micro-pousses."
}
```

**Validation :** `nom` requis, `email` valide, `message` minimum 10 caractères.

**Réponse 200**
```json
{
  "success": true,
  "message": "Votre message a bien été envoyé. Nous vous répondrons dans les 24h."
}
```

**Réponse 400**
```json
{
  "success": false,
  "errors": ["Le message doit contenir au moins 10 caractères."]
}
```

---

## Codes d'erreur

| Code | Signification |
|------|---------------|
| 200  | Succès |
| 201  | Ressource créée |
| 400  | Erreur de validation (body invalide) |
| 401  | Non autorisé (token manquant/invalide) |
| 404  | Ressource introuvable |
| 500  | Erreur interne serveur |
