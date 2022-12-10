import { Product } from 'src/products/entities/product.entity';

export class User {
  id: string;
  name: string;
  cpf: string;
  birth: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  userProducts?: Product[];
}
