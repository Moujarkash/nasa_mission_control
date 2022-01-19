const request = require('supertest');

const app = require("../../app");

describe('Test Get Launches', () => {
    test('It should respond with 200 success', async () => {
        await request(app)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});

describe('Test Add new Launch', () => {
    const completeLaunchData = {
        mission: "fuck mission",
        rocket: "fuck rocket",
        target: "Kepler-186 f",
        launchDate: "January 17, 2030"
    };

    const launchDataWithoutDate = {
        mission: "fuck mission",
        rocket: "fuck rocket",
        target: "Kepler-186 f",
    };

    const launchDataWithInvalidDate = {
        mission: "fuck mission",
        rocket: "fuck rocket",
        target: "Kepler-186 f",
        launchDate: "mod"
    };

    test('It should respond with 201 success', async () => {
        const response = await request(app)
            .post('/launches')
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
            .post('/launches')
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
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid Date'
        });
    });
});