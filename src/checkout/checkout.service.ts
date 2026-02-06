import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrderRepository } from '../orders/repositories/order.repository';
import { OrdersService } from '../orders/orders.service';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class CheckoutService {
  constructor(
    private orderRepository: OrderRepository,
    private ordersService: OrdersService,
  ) {}

  async processPayment(userId: string, paymentDto: PaymentDto) {
    const { orderId, cardNumber } = paymentDto;

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new BadRequestException('This order does not belong to you');
    }

    if (order.paymentStatus === 'COMPLETED') {
      throw new BadRequestException('Order has already been paid');
    }

    const paymentSuccess = this.mockPaymentGateway(cardNumber);

    if (!paymentSuccess) {
      await this.ordersService.updateOrderStatus(
        orderId,
        'CANCELLED',
        'FAILED',
      );
      throw new BadRequestException('Payment failed. Please try again');
    }

    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const updatedOrder = await this.ordersService.updateOrderStatus(
      orderId,
      'PROCESSING',
      'COMPLETED',
      paymentId,
    );

    return {
      success: true,
      message: 'Payment processed successfully',
      order: updatedOrder,
      paymentId,
    };
  }

  private mockPaymentGateway(cardNumber: string): boolean {
    return !cardNumber.endsWith('0000');
  }

  async completeOrder(userId: string, orderId: string) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new BadRequestException('This order does not belong to you');
    }

    if (order.paymentStatus !== 'COMPLETED') {
      throw new BadRequestException('Order payment is not completed');
    }

    const updatedOrder = await this.ordersService.updateOrderStatus(
      orderId,
      'SHIPPED',
    );

    return {
      success: true,
      message: 'Order completed successfully',
      order: updatedOrder,
    };
  }
}
