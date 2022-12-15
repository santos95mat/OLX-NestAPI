import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';

@Injectable()
export class OrdersService {
  private orderSelect = {
    id: true,
    userId: false,
    productId: false,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const id = randomUUID();
    const data = { ...dto, id };

    return await this.prisma.orders
      .create({ data })
      .catch(handleErrorConstraintUnique);
  }

  async findAll(): Promise<Order[]> {
    return await this.prisma.orders.findMany({
      select: {
        ...this.orderSelect,
        user: {
          select: {
            id: true,
            name: true,
            cpf: true,
            birth: true,
            email: true,
            role: true,
            password: false,
            createdAt: true,
            updatedAt: true,
          },
        },
        product: true,
      },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order: Order = await this.prisma.orders.findUnique({
      where: { id },
      select: {
        ...this.orderSelect,
        user: {
          select: {
            id: true,
            name: true,
            cpf: true,
            birth: true,
            email: true,
            role: true,
            password: false,
            createdAt: true,
            updatedAt: true,
          },
        },
        product: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Entrada de id ${id} não encontrada`);
    }

    return order;
  }

  async update(id: string, dto: UpdateOrderDto): Promise<Order> {
    await this.findOne(id);

    return await this.prisma.orders
      .update({ where: { id }, data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.orders.delete({ where: { id } });
  }
}
