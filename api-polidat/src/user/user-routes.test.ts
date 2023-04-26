import supertest from 'supertest';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient()

import { app } from '../app';


// afterAll(async () => {
//     await state.prisma.$disconnect();
// });

describe('App API', () => {

    describe('Routing', () => {

        it('should create user', async () => {

            const deleteResp = prisma.user.delete({ where: { id: 1, } });
            
            // const getResp = await supertest(app).get('/user/1');
            // console.log(getResp.body);
            // expect(getResp.statusCode).toEqual(400);

            const putResp = await supertest(app).put('/user/1')
                .send({ email: 'test9@example.com' })
            expect(putResp.statusCode).toEqual(204);


            // const getResp = await supertest(app).get('/user/1');
            // expect(getResp.statusCode).toEqual(200);

        });

    });

});
  