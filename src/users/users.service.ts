import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';

@Injectable()
export class UsersService {
  private userSelect = {
    id: true,
    name: true,
    cpf: true,
    birth: true,
    email: true,
    password: false,
    role: true,
    updatedAt: true,
    createdAt: true,
  };

  private orderSelect = {
    id: true,
    userId: false,
    productId: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword: string = bcrypt.hashSync(dto.password, 8);
    const id = randomUUID();
    const data = { ...dto, id, password: hashedPassword };

    return await this.prisma.users
      .create({ data })
      .catch(handleErrorConstraintUnique);
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.users.findMany({
      select: {
        ...this.userSelect,
        userProducts: true,
        orders: {
          select: {
            ...this.orderSelect,
            product: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user: User = await this.prisma.users.findUnique({
      where: { id },
      select: { ...this.userSelect, userProducts: true, orders: true },
    });

    if (!user) {
      throw new NotFoundException(`Entrada de id ${id} não encontrada`);
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id);

    return await this.prisma.users
      .update({ where: { id }, data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.users.delete({ where: { id } });
  }
}
