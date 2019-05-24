const app = require('../app');
const request = require("supertest");
const mongoDB = require('../Database/mongoDB');

beforeAll(async () => {
    mongoDB.connect();
});

afterAll((done) => {
    mongoDB.disconnect(done);
});

// describe('index route', () => {
//     test('should respond with a 200 with no query parameters', async () => {
//         const response = await request(app).get("/");
//         expect(response.status).toBe(200);
//         expect(response.body).toMatchObject({message: "OK"});
//         expect(response.body).toBeDefined();
//     });
// });
describe('Test the main view of feedbacks, response with all feedbacks', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get("/api/feedbacks");
        expect(response.body).toBeDefined();
        expect(response.status).toBe(200);

    });
});

const idItem = "5ce6ea096d3dd52ac025ca55";

describe('Test the response of a get by id of a item', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get(`/api/feedbacks/${idItem}`);
        expect(response.body).toBeDefined();
        // expect(response.status).toBe(200);
    });
});

describe('Test the response of a get by id of a item', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get(`/api/feedbacks/${idItem}`);
        expect(response.body).toBeDefined();
        // expect(response.status).toBe(200);
    });
});

describe('Test adding a feedback', () => {
    test('It should response with the json of the new feedback', async () => {
        const feedback = {
            name : "UCN/rene.gutierrez",
            message : "I am a test of http post request",
            type : "Visual Appearance",
            status : "Created"
        }
        const response = await request(app).post(`/api/feedbacks`).send(feedback);
        expect(response.body).toBeDefined();
        expect(response.status).toBe(201);
    });
});

describe('Test adding a feedback', () => {
    test('It should response with the json of the new feedback', async () => {
        const feedback = {};
        const response = await request(app).post(`/api/feedbacks`).send(feedback);
        expect(response.status).toBe(500);
        expect(response.body).toMatchObject({message: "feedback validation failed: status: Path `status` is required., type: Path `type` is required., message: Path `message` is required., name: Path `name` is required."});
    });
});