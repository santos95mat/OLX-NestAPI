import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Chuteira',
    description: 'Nome de um produto para venda',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Chuteira da nike preta numero 42',
    description: 'Descrição do produto para venda',
  })
  detail: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 50.0,
    description: 'Preço do produto para venda',
  })
  price: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'sem tem ou não o produto disponivel em estoque',
  })
  avaible: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'a3d1217c-4c98-11ed-bdc3-0242ac120002',
    description: 'user ID',
  })
  userId: string;
}
