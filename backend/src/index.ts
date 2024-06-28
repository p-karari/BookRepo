// server.ts
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import 'dotenv/config';
import bookRouter from '../src/books/book.router';
import { cors } from 'hono/cors'

const app = new Hono();

app.use('/*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route("/", bookRouter);

const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch.bind(app),
  port: port,
});
