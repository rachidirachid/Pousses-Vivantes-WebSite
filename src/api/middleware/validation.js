'use strict';

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function validateOrder(body) {
  const errors = [];

  if (!body.restaurant || body.restaurant.trim() === '') {
    errors.push('Le nom du restaurant est obligatoire.');
  }
  if (!body.contact || body.contact.trim() === '') {
    errors.push('Le nom du contact est obligatoire.');
  }
  if (!body.email || !validateEmail(body.email)) {
    errors.push('Adresse email invalide ou manquante.');
  }
  if (!body.produits || !Array.isArray(body.produits) || body.produits.length === 0) {
    errors.push('Veuillez sélectionner au moins un produit.');
  } else {
    body.produits.forEach((p, i) => {
      if (!p.id) {
        errors.push(`Produit #${i + 1} : identifiant manquant.`);
      }
      if (!p.quantite || typeof p.quantite !== 'number' || p.quantite < 1) {
        errors.push(`Produit #${i + 1} : la quantité doit être supérieure ou égale à 1.`);
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

function validateContact(body) {
  const errors = [];

  if (!body.nom || body.nom.trim() === '') {
    errors.push('Le nom est obligatoire.');
  }
  if (!body.email || !validateEmail(body.email)) {
    errors.push('Adresse email invalide ou manquante.');
  }
  if (!body.message || body.message.trim().length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères.');
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validateEmail, validateOrder, validateContact };
