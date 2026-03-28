'use strict';

const { products } = require('../../src/api/routes/products');

describe('Données produits', () => {
  test('contient 6 produits', () => {
    expect(products).toHaveLength(6);
  });

  test('chaque produit a les champs requis', () => {
    products.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('price');
      expect(p).toHaveProperty('available');
      expect(p).toHaveProperty('variety');
    });
  });

  test('les prix sont des nombres positifs', () => {
    products.forEach(p => {
      expect(typeof p.price).toBe('number');
      expect(p.price).toBeGreaterThan(0);
    });
  });
});

describe('Logique de filtrage produits', () => {
  test('filtre par variety=sunflower retourne 1 produit', () => {
    const result = products.filter(p => p.variety === 'sunflower');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Tournesol');
  });

  test('filtre available=true retourne uniquement les produits disponibles', () => {
    const result = products.filter(p => p.available === true);
    result.forEach(p => expect(p.available).toBe(true));
    expect(result.length).toBeGreaterThan(0);
  });

  test('filtre available=false retourne la Moutarde (rupture)', () => {
    const result = products.filter(p => p.available === false);
    expect(result).toHaveLength(1);
    expect(result[0].variety).toBe('mustard');
  });

  test('filtre maxPrice=80 retourne les produits <= 80 MAD', () => {
    const result = products.filter(p => p.price <= 80);
    result.forEach(p => expect(p.price).toBeLessThanOrEqual(80));
  });

  test('filtre minPrice=90 retourne les produits >= 90 MAD', () => {
    const result = products.filter(p => p.price >= 90);
    result.forEach(p => expect(p.price).toBeGreaterThanOrEqual(90));
  });

  test('trouver un produit par id retourne le bon produit', () => {
    const found = products.find(p => p.id === 1);
    expect(found).toBeDefined();
    expect(found.name).toBe('Tournesol');
  });

  test('chercher id inexistant retourne undefined', () => {
    const found = products.find(p => p.id === 999);
    expect(found).toBeUndefined();
  });
});
