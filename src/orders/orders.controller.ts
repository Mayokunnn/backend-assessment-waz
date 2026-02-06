import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create order from cart' })
  @ApiResponse({
    status: 201,
    description: 'Order created successfully',
    schema: {
      example: {
        id: 'order-uuid',
        userId: 'user-uuid',
        status: 'PENDING',
        total: 599.98,
        paymentStatus: 'PENDING',
        items: [
          {
            id: 'item-uuid',
            quantity: 2,
            price: 299.99,
            product: {
              id: 'product-uuid',
              name: 'Wireless Headphones',
            },
          },
        ],
        createdAt: '2024-01-01T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Cart is empty or insufficient stock' })
  createOrder(@CurrentUser() user: any) {
    return this.ordersService.createOrder(user.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get order history' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  findAll(@CurrentUser() user: any) {
    return this.ordersService.findAll(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details' })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.ordersService.findOne(user.userId, id);
  }
}
