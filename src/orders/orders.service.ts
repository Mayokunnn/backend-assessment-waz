import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { OrderRepository } from './repositories/order.repository';
import { OrderItemRepository } from './repositories/order-item.repository';
import { ProductRepository } from '../products/repositories/product.repository';
import { CartRepository } from '../cart/repositories/cart.repository';
import { CartItemRepository } from '../cart/repositories/cart-item.repository';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: OrderRepository,
    private orderItemRepository: OrderItemRepository,
    private productRepository: ProductRepository,
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository,
    private prisma: PrismaService,
  ) {}

  async createOrder(userId: string) {
    const cart = await this.cartRepository.findByUserId(userId);

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    let total = 0;
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for ${item.product.name}. Only ${item.product.stock} available`,
        );
      }
      total += Number(item.product.price) * item.quantity;
    }

    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: 'PENDING' as OrderStatus,
          paymentStatus: 'PENDING' as PaymentStatus,
        },
      });

      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          },
        });

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    });

    return this.findOne(userId, order.id);
  }

  async findAll(userId: string) {
    return this.orderRepository.findByUserId(userId);
  }

  async findOne(userId: string, orderId: string) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new BadRequestException('This order does not belong to you');
    }

    return order;
  }

  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    paymentStatus?: PaymentStatus,
    paymentId?: string,
  ) {
    return this.orderRepository.update(orderId, {
      status,
      ...(paymentStatus && { paymentStatus }),
      ...(paymentId && { paymentId }),
    });
  }
}
