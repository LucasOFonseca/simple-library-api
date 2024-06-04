import cors from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { booksRoutes, usersRoutes } from './routes';

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      autoDarkMode: false,
      provider: 'swagger-ui',
      documentation: {
        info: { title: 'Simple Library API', version: '1.0.0' },
        tags: [
          { name: 'Users', description: 'User related endpoints' },
          {
            name: 'Books',
            description: 'Book related endpoints',
          },
        ],
      },
    })
  )
  .use(usersRoutes)
  .use(booksRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
