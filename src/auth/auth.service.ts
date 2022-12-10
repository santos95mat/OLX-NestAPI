import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private userSelect = {
    id: true,
    name: true,
    cpf: true,
    birth: true,
    email: true,
    password: true,
    role: true,
    updatedAt: true,
    createdAt: true,
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = dto;

    const user: User = await this.prisma.users.findUnique({
      where: { email },
      select: {
        ...this.userSelect,
        userProducts: true,
        orders: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Email ou senha inválidos');
    }

    const passwordMatch: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new NotFoundException('Email ou senha inválidos');
    }

    delete user.password;

    const token: string = this.jwtService.sign({ email });

    return { token, user };
  }
}
