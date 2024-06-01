import { prismaClient } from '../../prisma';
import { CreateUserDTO } from '../dtos';

export class UserService {
  async create(data: CreateUserDTO) {
    const createdUser = await prismaClient.user.create({ data });

    return createdUser;
  }
}
