import { OrderRepository } from '../orders/repositories/order.repository';
import { OrdersService } from '../orders/orders.service';
import { PaymentDto } from './dto/payment.dto';
export declare class CheckoutService {
    private orderRepository;
    private ordersService;
    constructor(orderRepository: OrderRepository, ordersService: OrdersService);
    processPayment(userId: string, paymentDto: PaymentDto): Promise<{
        success: boolean;
        message: string;
        order: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            total: import("@prisma/client-runtime-utils").Decimal;
            paymentId: string | null;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        };
        paymentId: string;
    }>;
    private mockPaymentGateway;
    completeOrder(userId: string, orderId: string): Promise<{
        success: boolean;
        message: string;
        order: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import("@prisma/client").$Enums.OrderStatus;
            total: import("@prisma/client-runtime-utils").Decimal;
            paymentId: string | null;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        };
    }>;
}
