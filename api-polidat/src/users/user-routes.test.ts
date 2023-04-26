import supertest from 'supertest';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

import app from '../app';


// afterAll(async () => {
//     await state.prisma.$disconnect();
// });

afterEach((done) => {
    app.close();
    done();
});

describe('App API', () => {

    describe('Routing', () => {

        it("should pong", async () => {
            const response = await supertest(app).get("/ping");
            expect(response.status).toEqual(200);
            expect(response.type).toEqual("application/json");
            expect(response.body.data).toEqual("pong");
        });

        describe("GET: user", () => {

            it("should get user", async () => {

                await prisma.store.deleteMany({});
                await prisma.account.deleteMany({});
                await prisma.user.deleteMany({});
                
                const response = await supertest(app)
                    .get("/user?email=test7@example.com");

                expect(response.status).toEqual(404);
                expect(response.type).toEqual("application/json");

                const response2 = await supertest(app)
                    .post("/user")
                    .send({ 
                        email: "test7@example.com",
                        storeName: 'test store'
                    });

                console.log(response2.status)

                expect(response2.status).toEqual(201);
                expect(response2.type).toEqual("application/json");
                console.log(response2.body)
                expect(response2.body).toEqual({
                    email: "test7@example.com"
                });

                const response3 = await supertest(app)
                    .get("/user?email=test7@example.com");

                expect(response3.status).toEqual(200);
                expect(response3.type).toEqual("application/json");

            });

        });

        

        describe("POST: user", () => {

            it("should validate new user", async () => {

                await prisma.store.deleteMany({});
                await prisma.account.deleteMany({});
                await prisma.user.deleteMany({});
                
                const response = await supertest(app)
                    .post("/user")
                    .send({ 
                        storeName: 'test store'
                    });

                console.log(response.status)

                expect(response.status).toEqual(400);
                expect(response.type).toEqual("application/json");
                console.log(response.body)
            
            });

            it("should enforce unique user email", async () => {

                await prisma.store.deleteMany({});
                await prisma.account.deleteMany({});
                await prisma.user.deleteMany({});
                
                const response = await supertest(app)
                    .post("/user")
                    .send({ 
                        email: "test7@example.com",
                        storeName: 'test store'
                    });

                console.log(response.status)

                expect(response.status).toEqual(201);
                expect(response.type).toEqual("application/json");
                console.log(response.body)
                expect(response.body).toEqual({
                    email: "test7@example.com"
                });

                const response2 = await supertest(app)
                    .post("/user")
                    .send({ 
                        email: "test7@example.com",
                        storeName: 'test store'
                    });

                console.log(response2.status)

                expect(response2.status).toEqual(409);
                expect(response2.type).toEqual("application/json");
                expect(response2.body).toEqual({
                    message: "Email already exists.",
                });
            
            });

        });


    });

});