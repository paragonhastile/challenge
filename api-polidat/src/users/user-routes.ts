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


router.get(`/user`, async (ctx) => {
    try {
      
        const ctxreq: any = ctx.request.query;
        const email = ctxreq.email;

        let foundUser = await prisma.user.findUnique( { where: { email: email } } );

        if (!foundUser) {
            ctx.status = 404;
            ctx.body = {
                message: "User not found.",
            };
        } else {
            ctx.status = 200;
            ctx.body = { ...foundUser };
        }

    } catch (err) {
      console.error(err);
    }
});

router.post(`/user`, async (ctx) => {
    try {

        const ctxreq: any = ctx.request.body;
        const email = ctxreq.email;
        const storeName = ctxreq.storeName;

        // validate fields
        if (!email || !storeName) {
            ctx.status = 400;
            ctx.body = {
                message: "Missing required fields.",
            };
        }

        // check for existing user email
        let foundUser = await prisma.user.findUnique( { where: { email: email } } ); 

        if (foundUser) {
            ctx.status = 409;
            ctx.body = {
                message: "Email already exists.",
            };
        }

        // init account
        let account = {
            stripeAccountId: '',
            paymentsEnabled: false,
            payoutsEnabled: false,
        }

        // init store
        let store = {
            name: storeName,
        }

        let user: Prisma.UserCreateInput = {
            email: email,
            accounts: { 
                create: [
                    { ...account }
                ]
            },
            stores: { 
                create: [
                    { ...store }
                ]
            }
        }

        let createNested = {
            accounts: true,
            stores: true
        }

        // put the item
        await prisma.user.create({ data: user, include: createNested });

        ctx.status = 201;
        ctx.body = {
          email: email,
        };
    } catch (err) {
        console.error(err);
    }
});

export default router;