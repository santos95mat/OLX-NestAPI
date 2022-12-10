import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: 'fazendo uma compra',
  })
  async create(@Body() dto: CreateOrderDto) {
    return await this.ordersService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'listando todas as compras',
  })
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'listando um compra por ID',
  })
  async findOne(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'editando compra por ID',
  })
  async update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return await this.ordersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'deletando compra por ID',
  })
  async remove(@Param('id') id: string) {
    return await this.ordersService.remove(id);
  }
}
