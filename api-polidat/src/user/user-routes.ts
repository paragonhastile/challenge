import express from 'express';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient()

import { ItemNotFountError, PrismaError } from '../errors';

export const mount = (rootPath: string, app: express.Application) => {


    app.put(`${rootPath}/:id`, async (req, res) => {

        // try {
            // get the inputs
            const hash = req.params.id;
            // const at = req.query.at ? req.query.at as string : new Date().toISOString();
            console.log(req.body)

            // cast the inputs
            let user: Prisma.UserCreateInput = {
                email: req.body.email,
            }
            
            // validate the inputs


            // put the item
            const response = await prisma.user.create({ data: user });
            return;

            // console.log(response);
        
            // res.status(204);
        // } catch (exc: any) {
        //     console.log(exc);
        //     throw(new PrismaError(exc.message));
        // }

    });

    app.put(`${rootPath}/account/:id`, async (req, res) => {

        try {
            // get the inputs
            const hash = req.params.id;
            // const at = req.query.at ? req.query.at as string : new Date().toISOString();
            console.log(req.body)
            
            // validate the inputs


            // put the item
            const response = await prisma.account.create({
                data: {
                    id: req.body.id,
                    stripeAccountId: '',
                    paymentsEnabled: false,
                    payoutsEnabled: false,
                    userId: req.body.userId,
                }
              });

            console.log(response);
        
            res.status(204);
        } catch (exc: any) {
            console.log(exc);
            throw(new PrismaError(exc.message));
        }

    });

    app.put(`${rootPath}/store/:id`, async (req, res) => {

        try {
            // get the inputs
            const hash = req.params.id;
            // const at = req.query.at ? req.query.at as string : new Date().toISOString();
            console.log(req.body)
            
            // validate the inputs


            // put the item
            const response = await prisma.store.create({
                data: {
                    id: req.body.id,
                    name: req.body.name,
                    userId: req.body.userId,
                }
              });

            console.log(response);
        
            res.status(204);
        } catch (exc: any) {
            console.log(exc);
            throw(new PrismaError(exc.message));
        }

    });

    app.get(`${rootPath}/:id`, async (req, res) => {

        try {

            // get the inputs
            const id = req.params.id;

            const newUserWithTweets = await prisma.user.findUnique({
                where: {
                  id: id,
                },
                include: { accounts: true, stores: true },
              });

            if (!newUserWithTweets) {
                throw(new ItemNotFountError(`User with id ${id} not found`));
            }

            res.status(200).json(newUserWithTweets)

        } catch (exc: any) {
            console.log(exc);
            throw(new PrismaError(exc.message));
        }

    });

};