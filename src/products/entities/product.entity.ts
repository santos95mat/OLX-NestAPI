import { User } from 'src/users/entities/user.entity';

export class Product {
  id: string;
  name: string;
  detail: string;
  price: number;
  avaible: boolean;
  createdAt: Date;
  updatedAt: Date;

  userProductsId: string;
  userPurchasedProducts?: User[];
}
