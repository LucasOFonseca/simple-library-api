import Elysia, { t } from 'elysia';
import { AvailabilityStatus } from '../../dtos';
import { BookService } from '../../services';

const bookRequestSchema = t.Object({
  title: t.String(),
  author: t.String(),
  summary: t.String(),
});

const bookResponseSchema = t.Object({
  id: t.String(),
  title: t.String(),
  author: t.String(),
  summary: t.String(),
  status: t.Enum(AvailabilityStatus),
  createdAt: t.String(),
  updatedAt: t.String(),
});

export const booksRoutes = new Elysia().group('/books', (app) =>
  app
    .post(
      '',
      ({ body }) => {
        const bookService = new BookService();

        return bookService.create(body);
      },
      {
        body: bookRequestSchema,
        detail: {
          tags: ['Books'],
          summary: 'Create a new book',
          responses: {
            200: {
              description: 'Book created successfully',
              content: {
                'application/json': {
                  schema: bookResponseSchema,
                },
              },
            },
          },
        },
      }
    )
    .put(
      '/:id',
      ({ body, params: { id } }) => {
        const bookService = new BookService();

        return bookService.update(body, id);
      },
      {
        params: t.Object({ id: t.String() }),
        body: bookRequestSchema,
        detail: {
          tags: ['Books'],
          summary: 'Update a book',
          responses: {
            200: {
              description: 'Book updated successfully',
              content: {
                'application/json': {
                  schema: bookResponseSchema,
                },
              },
            },
          },
        },
      }
    )
    .put(
      '/:id/borrow/:userId',
      async ({ params: { id, userId } }) => {
        const bookService = new BookService();

        await bookService.borrow(id, userId);
      },
      {
        params: t.Object({ id: t.String(), userId: t.String() }),
        body: bookRequestSchema,
        detail: {
          tags: ['Books'],
          summary: 'Borrow a book to a user',
          responses: {
            200: {
              description: 'Book borrowed successfully',
            },
          },
        },
      }
    )
    .put(
      '/return/:id',
      async ({ params: { id } }) => {
        const bookService = new BookService();

        await bookService.return(id);
      },
      {
        params: t.Object({ id: t.String() }),
        body: bookRequestSchema,
        detail: {
          tags: ['Books'],
          summary: 'Return a borrowed book',
          responses: {
            200: {
              description: 'Book returned successfully',
            },
          },
        },
      }
    )
    .get(
      '',
      ({ query: { status } }) => {
        const bookService = new BookService();

        return bookService.list(status);
      },
      {
        query: t.Object({ status: t.Optional(t.Enum(AvailabilityStatus)) }),
        detail: {
          tags: ['Books'],
          summary: 'List all books',
          responses: {
            200: {
              description: 'Books retrieved successfully',
              content: {
                'application/json': {
                  schema: t.Array(bookResponseSchema),
                },
              },
            },
          },
        },
      }
    )
);
