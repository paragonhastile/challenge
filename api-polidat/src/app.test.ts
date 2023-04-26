

import supertest from 'supertest';

import { app } from './app';



beforeAll(async () => {

});

afterAll(async () => {
});

describe('App API', () => {

  describe('Routing', () => {

    test('should ping', async () => {
      const response = await supertest(app).get('/ping');
      expect(response.statusCode).toEqual(200);
    });

  });

});
