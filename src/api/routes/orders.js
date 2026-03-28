'use strict';

const express = require('express');
const router = express.Router();
const { validateOrder } = require('../middleware/validation');

const ADMIN_TOKEN = 'pousses-admin-2024';
const orders = [];
let nextId = 1;

// POST /api/orders
router.post('/', (req, res) => {
  const { valid, errors } = validateOrder(req.body);
  if (!valid) {
    return res.status(400).json({ success: false, errors });
  }

  const order = {
    id: nextId++,
    restaurant: req.body.restaurant.trim(),
    contact: req.body.contact.trim(),
    email: req.body.email.trim(),
    telephone: req.body.telephone || '',
    ville: req.body.ville || '',
    produits: req.body.produits,
    dateLivraison: req.body.dateLivraison || null,
    frequence: req.body.frequence || 'ponctuelle',
    message: req.body.message || '',
    statut: 'en_attente',
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  res.status(201).json({
    success: true,
    message: 'Votre commande a bien été enregistrée. Nous vous confirmons sous 24h.',
    data: { id: order.id, statut: order.statut, createdAt: order.createdAt }
  });
});

// GET /api/admin/orders
router.get('/admin', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({
      success: false,
      message: 'Accès non autorisé. Token invalide ou manquant.'
    });
  }
  res.json({ success: true, count: orders.length, data: orders });
});

module.exports = { router, orders };
