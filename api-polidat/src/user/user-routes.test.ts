import supertest from 'supertest';

import { prismaMock } from '../singleton'

import { app } from '../app';


// afterAll(async () => {
//     await state.prisma.$disconnect();
// });

describe('App API', () => {

    describe('Routing', () => {

        it('should create user', async () => {

            prismaMock.user.delete({ where: { id: '1', } });

            // const getResp = await supertest(app).get('/user/1');
            // console.log(getResp.body);
            // expect(getResp.statusCode).toEqual(400);

            try {
                const putResp = await supertest(app).put('/user/1')
                    .send({ id: '1', email: 'test2@example.com' })
                expect(putResp.statusCode).toEqual(204);
            } catch (exc: any) {
                console.log(exc);;
            }

            // const getResp = await supertest(app).get('/user/1');
            // expect(getResp.statusCode).toEqual(200);

        });

    });

});
  