import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import logger from "koa-logger";
import userRoutes from './users/user-routes'

const app = new Koa();

const PORT = process.env.PORT || 7654;

// Middleware for handling errors centrally, instead of in each route
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err: any) {
    let status = err.status || err.statusCode;
    if (status == 500) {
      status = 400;  // we never want to leak a 500
    }
    // todo: create an intentional library of known error objects
    err.status = status;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
})

// Middleware for parsing request bodies
app.use(bodyParser());
app.use(
  cors({
    origin: "*"
  })
);

// Middleware for logging
app.use(logger());

// Middleware for handling routes
app.use(userRoutes.routes())
  .use(userRoutes.allowedMethods()); // returns a 405 (Method Not Allowed) status code when attempting to access an existing endpoint with a wrong method

// handles all errors and scenario where diff test runners spin up instances that try to use same port
app.on("error", (err, ctx) => {
  console.log(err);
  err.status = err.status;
  ctx.body = { message: err.message };
  console.log(ctx.body)
});

// Initialize server
const server = app
  .listen(PORT, async () => {
    console.log(`Server listening on port: ${PORT}`);
})
  

export default server;
