import express from 'express';

// import prisma from '../client'
import { prismaMock } from '../singleton'

import { ItemNotFountError, PrismaError } from '../errors';

export const mount = (rootPath: string, app: express.Application) => {


    app.put(`${rootPath}/:id`, async (req, res) => {

        try {
            // get the inputs
            const hash = req.params.id;
            // const at = req.query.at ? req.query.at as string : new Date().toISOString();
            console.log(req.body)
            
            // validate the inputs


            // put the item
            const response = await prismaMock.user.create({
                data: {
                    id: req.body.email,
                    email: req.body.email,
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

            const newUserWithTweets = await prismaMock.user.findUnique({
                where: {
                  id: id,
                },
                include: { accounts: true },
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