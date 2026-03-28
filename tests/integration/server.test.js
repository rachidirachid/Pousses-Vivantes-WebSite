'use strict';

const request = require('supertest');
const app     = require('../../server');

describe('Serveur statique', () => {
  test('GET / retourne 200 (sert index.html)', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/html/);
  });

  test('GET /barquette-propre.png retourne 200', async () => {
    const res = await request(app).get('/barquette-propre.png');
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/image/);
  });
});

describe('Routes 404', () => {
  test('GET /api/nonexistent retourne 404 avec message français', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(typeof res.body.message).toBe('string');
    expect(res.body.message.length).toBeGreaterThan(0);
  });
});
