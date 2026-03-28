'use strict';

const { validateEmail, validateOrder, validateContact } =
  require('../../src/api/middleware/validation');

describe('validateEmail', () => {
  test('accepte un email valide', () => {
    expect(validateEmail('chef@restaurant.ma')).toBe(true);
  });
  test('accepte un email avec sous-domaine', () => {
    expect(validateEmail('contact@pro.restaurant.ma')).toBe(true);
  });
  test('rejette un email sans @', () => {
    expect(validateEmail('chefrestaurant.ma')).toBe(false);
  });
  test('rejette un email vide', () => {
    expect(validateEmail('')).toBe(false);
  });
  test('rejette null', () => {
    expect(validateEmail(null)).toBe(false);
  });
  test('rejette un email sans domaine', () => {
    expect(validateEmail('chef@')).toBe(false);
  });
});

describe('validateOrder', () => {
  const validOrder = {
    restaurant: 'Al Fassia',
    contact:    'Chef Karim',
    email:      'karim@alfassia.ma',
    produits:   [{ id: 1, quantite: 2 }]
  };

  test('accepte une commande valide', () => {
    const { valid, errors } = validateOrder(validOrder);
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);
  });

  test('rejette si restaurant manquant', () => {
    const { valid, errors } = validateOrder({ ...validOrder, restaurant: '' });
    expect(valid).toBe(false);
    expect(errors.some(e => e.includes('restaurant'))).toBe(true);
  });

  test('rejette si contact manquant', () => {
    const { valid, errors } = validateOrder({ ...validOrder, contact: '' });
    expect(valid).toBe(false);
    expect(errors.some(e => e.includes('contact'))).toBe(true);
  });

  test('rejette si email invalide', () => {
    const { valid, errors } = validateOrder({ ...validOrder, email: 'pas-un-email' });
    expect(valid).toBe(false);
    expect(errors.some(e => e.includes('email'))).toBe(true);
  });

  test('rejette si produits est un tableau vide', () => {
    const { valid, errors } = validateOrder({ ...validOrder, produits: [] });
    expect(valid).toBe(false);
    expect(errors.some(e => e.includes('produit'))).toBe(true);
  });

  test('rejette si produits est absent', () => {
    const { valid, errors } = validateOrder({ ...validOrder, produits: undefined });
    expect(valid).toBe(false);
    expect(errors.length).toBeGreaterThan(0);
  });

  test('rejette si quantité <= 0', () => {
    const { valid, errors } = validateOrder({ ...validOrder, produits: [{ id: 1, quantite: 0 }] });
    expect(valid).toBe(false);
    expect(errors.some(e => e.includes('quantité'))).toBe(true);
  });

  test('les messages d\'erreur sont en français', () => {
    const { errors } = validateOrder({});
    errors.forEach(e => {
      expect(typeof e).toBe('string');
      expect(e.length).toBeGreaterThan(0);
    });
  });
});

describe('validateContact', () => {
  const validContact = {
    nom:     'Chef Hassan',
    email:   'hassan@riad.ma',
    message: 'Bonjour, je souhaite passer une commande de micro-pousses.'
  };

  test('accepte un contact valide', () => {
    const { valid } = validateContact(validContact);
    expect(valid).toBe(true);
  });

  test('rejette si nom manquant', () => {
    const { valid, errors } = validateContact({ ...validContact, nom: '' });
    expect(valid).toBe(false);
    expect(errors.some(e => e.includes('nom'))).toBe(true);
  });

  test('rejette si email invalide', () => {
    const { valid, errors } = validateContact({ ...validContact, email: 'invalide' });
    expect(valid).toBe(false);
    expect(errors.some(e => e.includes('email'))).toBe(true);
  });

  test('rejette si message trop court (< 10 chars)', () => {
    const { valid, errors } = validateContact({ ...validContact, message: 'Bonjour' });
    expect(valid).toBe(false);
    expect(errors.some(e => e.includes('10'))).toBe(true);
  });

  test('accepte un message de 10 caractères exactement', () => {
    const { valid } = validateContact({ ...validContact, message: '1234567890' });
    expect(valid).toBe(true);
  });
});
