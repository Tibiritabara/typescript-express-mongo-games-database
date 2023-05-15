import request from 'supertest';
import { createServer } from '../../src/server';
import { HttpCode } from '../../src/exceptions/AppError';
import AppConfig from '../../src/config/AppConfig';

describe('Stats Tests', () => {
    test('PUT /stats', async () => {
        const server = createServer();
        const response = await request(server).put(`/${AppConfig.app.apiVersion}/stats/day`);
        expect(response.status).toEqual(HttpCode.CREATED);
        expect(response.body).toEqual({
            meta: {
                status: "Job triggered successfully"
            }
        });
    });

    test('PUT /stats/invalid_period', async () => {
        const server = createServer();
        const response = await request(server).put(`/${AppConfig.app.apiVersion}/stats/what`);
        expect(response.status).toEqual(HttpCode.BAD_REQUEST);
        expect(response.body).toEqual({
            errors: [
                {
                    title: "INVALID_FIELD",
                    message: "Invalid value",
                    source: {
                        pointer: "/period"
                    },
                    status: 400
                }
            ]
        });
    });
});
