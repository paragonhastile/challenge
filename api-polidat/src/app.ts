import 'express-async-errors';

import express, { json } from 'express';
import helmet from 'helmet';

import * as UserRoutes from './user/user-routes';


const errorHandling = (err:any, _req:any, res:any, _next:any) => {
  try {
    res.status(err.statusCode).json({
      msg: err.message,
    });
  } catch (exc: any) {
    console.log(exc);
    res.status(500).json({
      msg: 'Internal Server Error',
      success: false,
    });
  }
};

const app = express();
app.use(json());
app.use(helmet());

app.get('/ping', (_, res) => {
  res.status(200).json({
    msg: 'pong',
  });
});

UserRoutes.mount('/user', app);

app.use((_, res, _2) => {
  res.status(404).json({ error: 'NOT FOUND' });
});

app.use(errorHandling);

export { app };
