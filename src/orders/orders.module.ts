import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './repositories/order.repository';
import { OrderItemRepository } from './repositories/order-item.repository';
import { DatabaseModule } from '../database/database.module';
import { ProductsModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';
import { CartItemRepository } from 'src/cart/repositories/cart-item.repository';
import { CartRepository } from 'src/cart/repositories/cart.repository';

@Module({
  imports: [DatabaseModule, ProductsModule, CartModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRepository,
    OrderItemRepository,
    CartItemRepository,
    CartRepository,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
