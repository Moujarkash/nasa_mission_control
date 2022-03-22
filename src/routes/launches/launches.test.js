const request = require('supertest');

const app = require("../../app");
const { loadPlanetsData } = require('../../models/planets.model');
const {mongoConnect, mongoDisconnect} = require('../../services/mongo');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
        await loadPlanetsData();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe('Test Get Launches', () => {
        test('It should respond with 200 success', async () => {
            await request(app)
                .get('/v1/launches')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test Add new Launch', () => {
        const completeLaunchData = {
            mission: "fuck mission",
            rocket: "fuck rocket",
            target: "Kepler-1652 b",
            launchDate: "January 17, 2030"
        };

        const launchDataWithoutDate = {
            mission: "fuck mission",
            rocket: "fuck rocket",
            target: "Kepler-1652 b",
        };

        const launchDataWithInvalidDate = {
            mission: "fuck mission",
            rocket: "fuck rocket",
            target: "Kepler-1652 b",
            launchDate: "mod"
        };

        test('It should respond with 201 success', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);

            expect(response.body).toMatchObject(launchDataWithoutDate);
        });

        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Missing required launch property'
            });
        });

        test('It should catch invalid dates', async() => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: 'Invalid Date'
            });
        });
    });
});
