import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle-error-unique.util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto, user: User): Promise<Product> {
    if (!user.role) {
      throw new UnauthorizedException();
    }
    const id = randomUUID();
    const data = { ...dto, id };

    return await this.prisma.products
      .create({ data })
      .catch(handleErrorConstraintUnique);
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.products.findMany();
  }

  async findOne(id: string): Promise<Product> {
    const product: Product = await this.prisma.products.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Entrada de id ${id} não encontrada`);
    }

    return product;
  }

  async update(
    id: string,
    dto: UpdateProductDto,
    user: User,
  ): Promise<Product> {
    if (!user.role) {
      throw new UnauthorizedException();
    }

    await this.findOne(id);

    return await this.prisma.products
      .update({ where: { id }, data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async remove(id: string, user: User) {
    if (!user.role) {
      throw new UnauthorizedException();
    }

    await this.findOne(id);

    return await this.prisma.users.delete({ where: { id } });
  }
}
