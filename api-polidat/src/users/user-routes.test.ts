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

        describe("post user", () => {

            it("should add a new user", async () => {

                await prisma.account.deleteMany({});
                await prisma.user.deleteMany({});

                const response = await supertest(app)
                    .post("/user")
                    .send({ 
                        email: "test7@example.com" 
                    });
            
                expect(response.status).toEqual(201);
                expect(response.type).toEqual("application/json");
                expect(response.body).toEqual({
                    email: "test7@example.com",
                });

            });

            it("should enforce unique user email", async () => {

                await prisma.account.deleteMany({});
                await prisma.user.deleteMany({});

                const response = await supertest(app)
                    .post("/user")
                    .send({ 
                        email: "test7@example.com" 
                    });

                console.log(response.status)

                expect(response.status).toEqual(201);
                expect(response.type).toEqual("application/json");
                expect(response.body).toEqual({
                    email: "test7@example.com",
                });

                const response2 = await supertest(app)
                    .post("/user")
                    .send({ 
                        email: "test7@example.com" 
                    });

                console.log(response2.status)

                expect(response2.status).toEqual(409);
                expect(response2.type).toEqual("application/json");
                expect(response2.body).toEqual({
                    message: "Email already exists.",
                });
            
            });

        });

        // it('should create user', async () => {

        //     const deleteResp = prisma.user.delete({ where: { id: 1, } });
            
        //     // const getResp = await supertest(app).get('/user/1');
        //     // console.log(getResp.body);
        //     // expect(getResp.statusCode).toEqual(400);

        //     const putResp = await supertest(app).put('/user/1')
        //         .send({ email: 'test9@example.com' })
        //     expect(putResp.statusCode).toEqual(204);


        //     // const getResp = await supertest(app).get('/user/1');
        //     // expect(getResp.statusCode).toEqual(200);

        // });

    });

});