import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'a3d1217c-4c98-11ed-bdc3-0242ac120002',
    description: 'user ID',
  })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'a3d1217c-4c98-11ed-bdc3-0242ac120002',
    description: 'product ID',
  })
  productId: string;
}
