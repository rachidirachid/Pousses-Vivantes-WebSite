'use strict';

const request = require('supertest');
const app     = require('../../server');

describe('GET /api/products', () => {
  test('retourne 200 avec un array de produits', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  test('chaque produit a id, name, price, available', async () => {
    const res = await request(app).get('/api/products');
    res.body.data.forEach(p => {
      expect(p).toHaveProperty('id');
      expect(p).toHaveProperty('name');
      expect(p).toHaveProperty('price');
      expect(p).toHaveProperty('available');
    });
  });

  test('filtre ?available=true retourne uniquement les disponibles', async () => {
    const res = await request(app).get('/api/products?available=true');
    expect(res.status).toBe(200);
    res.body.data.forEach(p => expect(p.available).toBe(true));
  });

  test('filtre ?variety=sunflower retourne le Tournesol', async () => {
    const res = await request(app).get('/api/products?variety=sunflower');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe('Tournesol');
  });

  test('filtre ?maxPrice=80 retourne uniquement les produits <= 80 MAD', async () => {
    const res = await request(app).get('/api/products?maxPrice=80');
    expect(res.status).toBe(200);
    res.body.data.forEach(p => expect(p.price).toBeLessThanOrEqual(80));
  });
});

describe('GET /api/products/:id', () => {
  test('retourne 200 avec le produit correct pour id=1', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
    expect(res.body.data.name).toBe('Tournesol');
  });

  test('retourne 404 pour un id inexistant', async () => {
    const res = await request(app).get('/api/products/999');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toMatch(/introuvable/i);
  });
});

describe('POST /api/orders', () => {
  const validOrder = {
    restaurant:   'Al Fassia',
    contact:      'Chef Karim Benali',
    email:        'karim@alfassia.ma',
    ville:        'Casablanca',
    produits:     [{ id: 1, quantite: 2 }],
    dateLivraison:'2026-04-01',
    frequence:    'hebdomadaire'
  };

  test('commande valide retourne 201 avec id et statut', async () => {
    const res = await request(app).post('/api/orders').send(validOrder);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.statut).toBe('en_attente');
  });

  test('body vide retourne 400 avec erreurs en français', async () => {
    const res = await request(app).post('/api/orders').send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  test('email invalide retourne 400', async () => {
    const res = await request(app).post('/api/orders').send({ ...validOrder, email: 'pas-valide' });
    expect(res.status).toBe(400);
    expect(res.body.errors.some(e => e.includes('email'))).toBe(true);
  });

  test('produits vides retourne 400', async () => {
    const res = await request(app).post('/api/orders').send({ ...validOrder, produits: [] });
    expect(res.status).toBe(400);
  });

  test('quantité négative retourne 400', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ ...validOrder, produits: [{ id: 1, quantite: -1 }] });
    expect(res.status).toBe(400);
  });
});

describe('POST /api/contact', () => {
  const validMsg = {
    nom:     'Chef Hassan Tazi',
    email:   'hassan@riad.ma',
    message: 'Bonjour, je souhaite un devis pour des livraisons hebdomadaires.'
  };

  test('message valide retourne 200 avec success:true', async () => {
    const res = await request(app).post('/api/contact').send(validMsg);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(typeof res.body.message).toBe('string');
    expect(res.body.message.length).toBeGreaterThan(0);
  });

  test('la réponse contient un message en français', async () => {
    const res = await request(app).post('/api/contact').send(validMsg);
    expect(res.body.message).toMatch(/envoyé|répondrons/i);
  });

  test('email invalide retourne 400', async () => {
    const res = await request(app).post('/api/contact').send({ ...validMsg, email: 'invalide' });
    expect(res.status).toBe(400);
  });

  test('message trop court retourne 400', async () => {
    const res = await request(app).post('/api/contact').send({ ...validMsg, message: 'Court' });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/admin/orders', () => {
  test('retourne 401 sans header d\'authentification', async () => {
    const res = await request(app).get('/api/admin/orders');
    expect(res.status).toBe(401);
  });

  test('retourne 401 avec un mauvais token', async () => {
    const res = await request(app)
      .get('/api/admin/orders')
      .set('X-Admin-Token', 'mauvais-token');
    expect(res.status).toBe(401);
  });

  test('retourne 200 avec le bon token', async () => {
    const res = await request(app)
      .get('/api/admin/orders')
      .set('X-Admin-Token', 'pousses-admin-2024');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
