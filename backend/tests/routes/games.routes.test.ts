import request from 'supertest';
import { createServer } from '../../src/server';
import { HttpCode } from '../../src/exceptions/AppError';
import AppConfig from '../../src/config/AppConfig';

describe('Games Tests', () => {
    test('POST /games', async () => {
        const server = createServer();
        const response = await request(server).post(`/${AppConfig.app.apiVersion}/games`)
            .send({
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time"
                }
            });
        expect(response.status).toEqual(HttpCode.CREATED);
        let body = response.body;
        delete body.data.id;
        delete body.data.attributes.createdAt;
        delete body.data.attributes.updatedAt;
        expect(response.body).toEqual({
            data: {
                type: "games",
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time",
                    numberOfLikes: 0,
                    numberOfPlayers: 0,
                    rank: -1,
                }
            }
        });
    });
    test('POST /games - invalid body', async () => {
        const server = createServer();
        const response = await request(server).post(`/${AppConfig.app.apiVersion}/games`)
            .send({
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time",
                    numberOfPlayers: "Hola mundo",
                }
            });
        expect(response.status).toEqual(HttpCode.BAD_REQUEST);
        expect(response.body).toEqual({
            errors: [
                {
                    title: "INVALID_FIELD",
                    message: "Invalid value",
                    source: {
                        pointer: "/attributes/numberOfPlayers"
                    },
                    status: 400
                }
            ]
        });
    });
    test('GET /games/id', async () => {
        const server = createServer();
        const response = await request(server).post(`/${AppConfig.app.apiVersion}/games`)
            .send({
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time",
                }
            });
        expect(response.status).toEqual(HttpCode.CREATED);
        const id = response.body.data.id;
        const get_response = await request(server).get(`/${AppConfig.app.apiVersion}/games/${id}`);
        let body = get_response.body;
        delete body.data.attributes.createdAt;
        delete body.data.attributes.updatedAt;
        expect(get_response.status).toEqual(HttpCode.OK);
        expect(get_response.body).toEqual({
            data: {
                type: "games",
                id: id,
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time",
                    numberOfLikes: 0,
                    numberOfPlayers: 0,
                    rank: -1,
                }
            }
        });
    });
    test('GET /games/invalid_mongo_id', async () => {
        const server = createServer();
        const response = await request(server).get(`/${AppConfig.app.apiVersion}/games/123`);
        expect(response.status).toEqual(HttpCode.BAD_REQUEST);
        expect(response.body).toEqual({
            errors: [
                {
                    title: "INVALID_FIELD",
                    message: "Invalid value",
                    source: {
                        pointer: "/id"
                    },
                    status: 400
                }
            ]
        });
    });
    test('GET /games/record_not_found', async () => {
        const server = createServer();
        const response = await request(server).get(`/${AppConfig.app.apiVersion}/games/646254d2c759d2458be3a01a`);
        expect(response.status).toEqual(HttpCode.NOT_FOUND);
        expect(response.body).toEqual({
            errors: [
                {
                    status: 404,
                    title: "GAME_NOT_FOUND",
                    detail: "Game with id 646254d2c759d2458be3a01a not found"
                }
            ]
        });
    });
    test('PUT /games/', async () => {
        const server = createServer();
        const post_response = await request(server).post(`/${AppConfig.app.apiVersion}/games`)
            .send({
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time",
                }
            });
        expect(post_response.status).toEqual(HttpCode.CREATED);
        const id = post_response.body.data.id;
        const response = await request(server).put(`/${AppConfig.app.apiVersion}/games/${id}`)
        .send({
            attributes: {
                title: "The Legend of Zelda: Tears Of The Kingdom",
                numberOfLikes: 10,
                numberOfPlayers: 5,
            }
        });
        expect(response.status).toEqual(HttpCode.OK);
        let body = response.body;
        delete body.data.attributes.createdAt;
        delete body.data.attributes.updatedAt;
        expect(response.body).toEqual({
            data: {
                type: "games",
                id: id,
                attributes: {
                    title: "The Legend of Zelda: Tears Of The Kingdom",
                    numberOfLikes: 10,
                    numberOfPlayers: 5,
                    rank: -1,
                }
            }
        });
    });

    test('PUT /games/invalid_id', async () => {
        const server = createServer();
        const response = await request(server).put(`/${AppConfig.app.apiVersion}/games/123`)
        .send({
            attributes: {
                title: "The Legend of Zelda: Tears Of The Kingdom",
                numberOfLikes: 10,
                numberOfPlayers: 5,
            }
        });
        expect(response.status).toEqual(HttpCode.BAD_REQUEST);
        expect(response.body).toEqual({
            errors: [
                {
                    title: "INVALID_FIELD",
                    message: "Invalid value",
                    source: {
                        pointer: "/id"
                    },
                    status: 400
                }
            ]
        });
    });

    test('PUT /games/not_existing_game', async () => {
        const server = createServer();
        const response = await request(server).put(`/${AppConfig.app.apiVersion}/games/646254d2c759d2458be3a01a`)
        .send({
            attributes: {
                title: "The Legend of Zelda: Tears Of The Kingdom",
                numberOfLikes: 10,
                numberOfPlayers: 5,
            }
        });
        expect(response.status).toEqual(HttpCode.NOT_FOUND);
        expect(response.body).toEqual({
            errors: [
                {
                    status: 404,
                    title: "GAME_NOT_FOUND",
                    detail: "Game with id 646254d2c759d2458be3a01a not found"
                }
            ]
        });
    });

    test('PUT /games/ - invalid_body', async () => {
        const server = createServer();
        const post_response = await request(server).post(`/${AppConfig.app.apiVersion}/games`)
            .send({
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time",
                }
            });
        expect(post_response.status).toEqual(HttpCode.CREATED);
        const id = post_response.body.data.id;
        const response = await request(server).put(`/${AppConfig.app.apiVersion}/games/${id}`)
        .send({
            attributes: {
                title: "The Legend of Zelda: Tears Of The Kingdom",
                numberOfLikes: "Hola mundo",
                numberOfPlayers: 5,
            }
        });
        expect(response.status).toEqual(HttpCode.BAD_REQUEST);
        expect(response.body).toEqual({
            errors: [
                {
                    title: "INVALID_FIELD",
                    message: "Invalid value",
                    source: {
                        pointer: "/attributes/numberOfLikes"
                    },
                    status: 400
                }
            ]
        });
    });

    test('GET /games', async () => {
        const server = createServer();
        const response = await request(server).get(`/${AppConfig.app.apiVersion}/games`);
        expect(response.status).toEqual(HttpCode.OK);
        expect(response.body.data).toBeDefined();
    });

    test('GET /games?page[number]=1&page[size]=10', async () => {
        const server = createServer();
        const response = await request(server).get(`/${AppConfig.app.apiVersion}/games?page[number]=1&page[size]=10`);
        expect(response.status).toEqual(HttpCode.OK);
        expect(response.body.data).toBeDefined();
    });

    test('GET /games - invalid pagination, use defaults', async () => {
        const server = createServer();
        const response = await request(server).get(`/${AppConfig.app.apiVersion}/games?page[number]=hola&page[size]=mundo`);
        expect(response.status).toEqual(HttpCode.OK);
        expect(response.body.data).toBeDefined();
    });

    test('DELETE /games', async () => {
        const server = createServer();
        const post_response = await request(server).post(`/${AppConfig.app.apiVersion}/games`)
            .send({
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time",
                }
            });
        expect(post_response.status).toEqual(HttpCode.CREATED);
        const id = post_response.body.data.id;
        const response = await request(server).delete(`/${AppConfig.app.apiVersion}/games/${id}`)
        expect(response.status).toEqual(HttpCode.NO_CONTENT);
    });

    test('PATCH /games', async () => {
        const server = createServer();
        const post_response = await request(server).post(`/${AppConfig.app.apiVersion}/games`)
            .send({
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time",
                }
            });
        expect(post_response.status).toEqual(HttpCode.CREATED);
        const id = post_response.body.data.id;
        const response = await request(server).patch(`/${AppConfig.app.apiVersion}/games/${id}`)
            .send([
                {
                    op: "replace",
                    path: "/title",
                    value: "The Legend Of Zelda: Tears Of The Kingdom"
                },
                {
                    op: "inc",
                    path: "/numberOfLikes",
                    inc: 50
                },
                {
                    op: "inc",
                    path: "/numberOfPlayers",
                    inc: 700
                }
            ])
        expect(response.status).toEqual(HttpCode.OK);
        let body = response.body;
        delete body.data.attributes.createdAt;
        delete body.data.attributes.updatedAt;
        expect(response.body).toEqual({
            data: {
                type: "games",
                id: id,
                attributes: {
                    title: "The Legend Of Zelda: Tears Of The Kingdom",
                    numberOfLikes: 50,
                    numberOfPlayers: 700,
                    rank: -1,
                }
            }
        });
    });

    test('PATCH /games - invalid operations', async () => {
        const server = createServer();
        const post_response = await request(server).post(`/${AppConfig.app.apiVersion}/games`)
            .send({
                attributes: {
                    title: "The Legend of Zelda: Ocarina of Time",
                }
            });
        expect(post_response.status).toEqual(HttpCode.CREATED);
        const id = post_response.body.data.id;
        const response = await request(server).patch(`/${AppConfig.app.apiVersion}/games/${id}`)
            .send([
                {
                    op: "what",
                    path: "/title",
                    value: "The Legend Of Zelda: Tears Of The Kingdom"
                },
                {
                    op: "omg",
                    path: "/numberOfLikes",
                    inc: 50
                },
                {
                    op: "inc",
                    path: "/numberOfPlayers",
                    inc: 700
                }
            ])
        expect(response.status).toEqual(HttpCode.BAD_REQUEST);
        expect(response.body).toEqual({
            errors: [
                {
                    title: "INVALID_FIELD",
                    message: "Invalid value",
                    source: {
                        "pointer": "/[0]/op"
                    },
                    status: 400
                },
                {
                    title: "INVALID_FIELD",
                    message: "Invalid value",
                    source: {
                        pointer: "/[1]/op"
                    },
                    status: 400
                }
            ]
        });
    });
});
