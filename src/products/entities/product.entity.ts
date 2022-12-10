import { Order } from 'src/orders/entities/order.entity';

export class Product {
  id: string;
  name: string;
  detail: string;
  price: number;
  avaible: boolean;
  createdAt: Date;
  updatedAt: Date;

  userProductsId: string;
  orders?: Order[];
}
