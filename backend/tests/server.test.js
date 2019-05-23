const app = require('../app');
const request = require("supertest");

// afterEach(() => {
//     app.close();
// });


describe('index route', () => {
    test('should respond with a 200 with no query parameters', async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({message: "OK"});
        expect(response.body).toBeDefined();
    });
});