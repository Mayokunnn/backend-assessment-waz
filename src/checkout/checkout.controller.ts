import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { PaymentDto } from './dto/payment.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Checkout')
@ApiBearerAuth('JWT-auth')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('payment')
  @ApiOperation({ summary: 'Process payment for an order (Mock)' })
  @ApiResponse({
    status: 200,
    description: 'Payment processed successfully',
    schema: {
      example: {
        success: true,
        message: 'Payment processed successfully',
        paymentId: 'PAY-1234567890-abc123',
        order: {
          id: 'order-uuid',
          status: 'PROCESSING',
          paymentStatus: 'COMPLETED',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Payment failed or invalid order' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  processPayment(@CurrentUser() user: any, @Body() paymentDto: PaymentDto) {
    return this.checkoutService.processPayment(user.userId, paymentDto);
  }

  @Post('complete/:orderId')
  @ApiOperation({ summary: 'Complete order after payment' })
  @ApiResponse({ status: 200, description: 'Order completed successfully' })
  @ApiResponse({ status: 400, description: 'Payment not completed' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  completeOrder(@CurrentUser() user: any, @Param('orderId') orderId: string) {
    return this.checkoutService.completeOrder(user.userId, orderId);
  }
}
