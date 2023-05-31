const request = require('supertest');
const app = require('./app');

describe('GET /urls', () => {
    it('should respond with "Hello, World!"', async () => {
        const response = await request(app).get('/urls');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, World!' });
    });
});
