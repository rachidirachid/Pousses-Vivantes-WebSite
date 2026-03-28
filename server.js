'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');

const { router: productsRouter } = require('./src/api/routes/products');
const { router: ordersRouter }   = require('./src/api/routes/orders');
const { router: contactRouter }  = require('./src/api/routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (serves index.html, images, videos)
app.use(express.static(path.join(__dirname, '.')));

// API routes
app.use('/api/products', productsRouter);
app.use('/api/orders',   ordersRouter);
app.use('/api/contact',  contactRouter);

// Admin orders route is handled inside ordersRouter at /admin

// 404 handler
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: `Route API introuvable : ${req.method} ${req.path}`
    });
  }
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur.'
  });
});

app.listen(PORT, () => {
  console.log(`🌱 Pousses Vivantes — Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;
