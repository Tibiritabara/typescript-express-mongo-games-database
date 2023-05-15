import request from 'supertest';
import { createServer } from '../src/server';
import { HttpCode } from '../src/exceptions/AppError';

describe('Server.ts tests', () => {
    test('GET /', async () => {
        const server = createServer();
        const response = await request(server).get('/');
        expect(response.status).toEqual(HttpCode.OK);
        expect(response.body).toEqual({ message: 'Hello World!' });
    });

    test('GET /health', async () => {
        const server = createServer();
        const response = await request(server).get('/health');
        expect(response.status).toEqual(HttpCode.OK);
        expect(response.body).toEqual({ message: 'OK' });
    });

    test('GET /non_existing_endpoint', async () => {
        const server = createServer();
        const response = await request(server).get('/non_existing_endpoint');
        expect(response.status).toEqual(HttpCode.NOT_FOUND);
        expect(response.body).toEqual({
            errors: [
                {
                    title: "NOT_FOUND",
                    detail: "API endpoint not found",
                    status: 404
                }
            ]
        });
    });
});
