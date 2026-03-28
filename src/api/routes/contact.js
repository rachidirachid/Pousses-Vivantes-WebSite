'use strict';

const express = require('express');
const router = express.Router();
const { validateContact } = require('../middleware/validation');

const messages = [];

// POST /api/contact
router.post('/', (req, res) => {
  const { valid, errors } = validateContact(req.body);
  if (!valid) {
    return res.status(400).json({ success: false, errors });
  }

  messages.push({
    id: messages.length + 1,
    nom: req.body.nom.trim(),
    email: req.body.email.trim(),
    message: req.body.message.trim(),
    createdAt: new Date().toISOString()
  });

  res.json({
    success: true,
    message: 'Votre message a bien été envoyé. Nous vous répondrons dans les 24h.'
  });
});

module.exports = { router, messages };
