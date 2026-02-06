import { CheckoutService } from './checkout.service';
import { PaymentDto } from './dto/payment.dto';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    processPayment(user: any, paymentDto: PaymentDto): Promise<{
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
    completeOrder(user: any, orderId: string): Promise<{
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
