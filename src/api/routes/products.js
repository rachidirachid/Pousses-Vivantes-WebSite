'use strict';

const express = require('express');
const router = express.Router();

const products = [
  {
    id: 1, name: 'Tournesol', variety: 'sunflower', price: 85,
    unit: 'barquette 100g', stock: 50,
    description: 'Goût de noisette, texture croquante. Riche en vitamine E et protéines.',
    nutrition: { proteines: '26g', vitE: '35mg', fer: '5mg' },
    origin: 'Casablanca, Maroc', harvestDay: 'J+7',
    image: '/barquette-propre.png', available: true, tags: ['bestseller', 'protéiné']
  },
  {
    id: 2, name: 'Radis Daikon', variety: 'radish', price: 75,
    unit: 'barquette 80g', stock: 30,
    description: 'Piquant et poivré, apporte une touche d\'intensité. Idéal pour sashimis et tartares.',
    nutrition: { proteines: '3.8g', vitC: '29mg', calcium: '51mg' },
    origin: 'Casablanca, Maroc', harvestDay: 'J+6',
    image: '/barquette-propre.png', available: true, tags: ['épicé', 'japonais']
  },
  {
    id: 3, name: 'Petit Pois', variety: 'pea', price: 90,
    unit: 'barquette 120g', stock: 25,
    description: 'Saveur douce et sucrée, rappelle le petit pois frais. Parfait pour les desserts salés.',
    nutrition: { proteines: '5.4g', vitC: '40mg', fibres: '8g' },
    origin: 'Rabat, Maroc', harvestDay: 'J+10',
    image: '/barquette-propre.png', available: true, tags: ['sucré', 'premium']
  },
  {
    id: 4, name: 'Basilic', variety: 'basil', price: 95,
    unit: 'barquette 60g', stock: 15,
    description: 'Arôme intense et floral. Pour sublimer les plats méditerranéens et les desserts.',
    nutrition: { proteines: '3.2g', vitK: '415µg', betacarotene: '3.1mg' },
    origin: 'Casablanca, Maroc', harvestDay: 'J+12',
    image: '/barquette-propre.png', available: true, tags: ['aromatique', 'méditerranéen']
  },
  {
    id: 5, name: 'Moutarde', variety: 'mustard', price: 70,
    unit: 'barquette 80g', stock: 40,
    description: 'Chaleur douce et piquante. Parfait pour relever les vinaigrettes et carpaccios.',
    nutrition: { proteines: '4.7g', vitC: '70mg', selenium: '85µg' },
    origin: 'Casablanca, Maroc', harvestDay: 'J+5',
    image: '/barquette-propre.png', available: false, tags: ['épicé', 'vinaigrette']
  },
  {
    id: 6, name: 'Chou Rouge', variety: 'cabbage', price: 80,
    unit: 'barquette 90g', stock: 20,
    description: 'Couleur violette spectaculaire, goût délicat. Fort en anthocyanes et vitamine C.',
    nutrition: { proteines: '3.0g', vitC: '95mg', anthocyanes: '50mg' },
    origin: 'Rabat, Maroc', harvestDay: 'J+8',
    image: '/barquette-propre.png', available: true, tags: ['coloré', 'antioxydant']
  }
];

// GET /api/products
router.get('/', (req, res) => {
  let result = [...products];

  if (req.query.variety) {
    result = result.filter(p => p.variety === req.query.variety);
  }
  if (req.query.available !== undefined) {
    const avail = req.query.available === 'true';
    result = result.filter(p => p.available === avail);
  }
  if (req.query.minPrice) {
    const min = parseFloat(req.query.minPrice);
    result = result.filter(p => p.price >= min);
  }
  if (req.query.maxPrice) {
    const max = parseFloat(req.query.maxPrice);
    result = result.filter(p => p.price <= max);
  }

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Produit #${req.params.id} introuvable.`
    });
  }
  res.json({ success: true, data: product });
});

module.exports = { router, products };
