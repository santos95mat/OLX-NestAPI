import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Criação de um produto',
  })
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listando todos os produtos',
  })
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'listando um produto por ID',
  })
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editando um produto pelo ID',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Apagando um produto pelo ID',
  })
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
