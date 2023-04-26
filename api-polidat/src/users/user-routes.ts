import Router from "koa-router";
const router = new Router();

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient()

router.get(`/ping`, async (ctx) => {
  try {
    ctx.body = {
      status: "success",
      data: "pong"
    };
  } catch (err) {
    console.error(err);
  }
});

router.post(`/user`, async (ctx) => {
    try {

        // check for existing user email
        let foundUser = await prisma.user.findUnique( { where: { email: "test98@example.com" } } ); 
        console.log(foundUser);
        if (foundUser) {
            ctx.status = 409;
            ctx.body = {
                message: "Email already exists.",
            };
        }

        let account = {
            stripeAccountId: '',
            paymentsEnabled: false,
            payoutsEnabled: false,
        }

        let user: Prisma.UserCreateInput = {
            email: "test98@example.com",
            accounts: { 
                create: [
                    { ...account }
                ]
            }
        }

        let createNested = {
            accounts: true,
        }

        // put the item
        const createResponse = await prisma.user.create({ data: user, include: createNested });
        console.log(createResponse);
        const getResponse = await prisma.user.findUnique( { where: { id: 2 } } );
        console.log(getResponse);

        ctx.status = 201;
        ctx.body = {
          email: "test7@example.com",
        };
    } catch (err) {
      console.error(err);
    }
});

export default router;