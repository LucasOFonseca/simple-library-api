import { NotFoundError } from 'elysia';
import { prismaClient } from '../../prisma';
import { AvailabilityStatus, BookRequestDTO } from '../dtos';

export class BookService {
  async create(data: BookRequestDTO) {
    const createdBook = await prismaClient.book.create({ data });

    return createdBook;
  }

  async update(data: BookRequestDTO, id: string) {
    const bookToUpdate = await prismaClient.book.findUnique({ where: { id } });

    if (!bookToUpdate) throw new NotFoundError();

    const updatedBook = await prismaClient.book.update({
      where: { id },
      data,
    });

    return updatedBook;
  }

  async borrow(bookId: string, userId: string) {
    const bookToBorrow = await prismaClient.book.findUnique({
      where: { id: bookId },
    });
    const user = await prismaClient.user.findUnique({ where: { id: userId } });

    if (!bookToBorrow || !user) throw new NotFoundError();

    if (bookToBorrow.status === AvailabilityStatus.borrowed) {
      throw new Error('Book already borrowed');
    }

    await prismaClient.$transaction([
      prismaClient.user.update({
        where: { id: userId },
        data: {
          books: {
            connect: { id: bookId },
          },
        },
      }),
      prismaClient.book.update({
        where: { id: bookId },
        data: { status: AvailabilityStatus.borrowed },
      }),
    ]);
  }

  async return(id: string) {
    const bookToReturn = await prismaClient.book.findUnique({ where: { id } });

    if (!bookToReturn) throw new NotFoundError();

    if (
      bookToReturn.status === AvailabilityStatus.available ||
      !bookToReturn.userId
    ) {
      throw new Error('Book already available');
    }

    const user = await prismaClient.user.findUnique({
      where: { id: bookToReturn.userId },
    });

    if (!user) throw new NotFoundError();

    await prismaClient.$transaction([
      prismaClient.user.update({
        where: { id: user.id },
        data: {
          books: {
            disconnect: { id },
          },
        },
      }),
      prismaClient.book.update({
        where: { id },
        data: { status: AvailabilityStatus.available },
      }),
    ]);
  }

  async list(status?: AvailabilityStatus) {
    const books = await prismaClient.book.findMany({ where: { status } });

    return books;
  }
}
