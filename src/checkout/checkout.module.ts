import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { OrdersModule } from '../orders/orders.module';
import { OrderRepository } from '../orders/repositories/order.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, OrdersModule],
  controllers: [CheckoutController],
  providers: [CheckoutService, OrderRepository],
})
export class CheckoutModule {}
