import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Fulano',
    description: 'Nome do usuário',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  @ApiProperty({
    example: '641.713.480-64',
    description: 'CPF do usuário',
  })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'dia/mes/ano',
    description: 'Data de nascimento do usuário',
  })
  birth: string;

  @IsEmail()
  @ApiProperty({
    example: 'user@email.com',
    description: 'Email do usuário',
  })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'user1234',
    description: 'Senha com no minimo 8 caracteres',
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    example: 'comum',
    description: 'tipo de usuario [admin, comum, etc..]',
  })
  role: boolean;
}
