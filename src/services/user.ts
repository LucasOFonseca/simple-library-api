import { NotFoundError } from 'elysia';
import { prismaClient } from '../../prisma';
import { UserRequestDTO } from '../dtos';

export class UserService {
  async create(data: UserRequestDTO) {
    const createdUser = await prismaClient.user.create({ data });

    return createdUser;
  }

  async update(data: UserRequestDTO, id: string) {
    const userToUpdate = await prismaClient.user.findUnique({ where: { id } });

    if (!userToUpdate) throw new NotFoundError();

    const updatedUser = await prismaClient.user.update({
      where: { id },
      data,
    });

    return updatedUser;
  }

  async list() {
    const users = await prismaClient.user.findMany();

    return users;
  }
}
