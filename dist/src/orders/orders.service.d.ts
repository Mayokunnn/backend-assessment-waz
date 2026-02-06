import { OrderStatus, PaymentStatus } from '@prisma/client';
import { OrderRepository } from './repositories/order.repository';
import { OrderItemRepository } from './repositories/order-item.repository';
import { ProductRepository } from '../products/repositories/product.repository';
import { CartRepository } from '../cart/repositories/cart.repository';
import { CartItemRepository } from '../cart/repositories/cart-item.repository';
import { PrismaService } from '../database/prisma.service';
export declare class OrdersService {
    private orderRepository;
    private orderItemRepository;
    private productRepository;
    private cartRepository;
    private cartItemRepository;
    private prisma;
    constructor(orderRepository: OrderRepository, orderItemRepository: OrderItemRepository, productRepository: ProductRepository, cartRepository: CartRepository, cartItemRepository: CartItemRepository, prisma: PrismaService);
    createOrder(userId: string): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                slug: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                imageUrl: string | null;
                category: string;
            };
        } & {
            id: string;
            createdAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client-runtime-utils").Decimal;
        paymentId: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    findAll(userId: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                slug: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                imageUrl: string | null;
                category: string;
            };
        } & {
            id: string;
            createdAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client-runtime-utils").Decimal;
        paymentId: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    })[]>;
    findOne(userId: string, orderId: string): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                slug: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                imageUrl: string | null;
                category: string;
            };
        } & {
            id: string;
            createdAt: Date;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            productId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client-runtime-utils").Decimal;
        paymentId: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
    updateOrderStatus(orderId: string, status: OrderStatus, paymentStatus?: PaymentStatus, paymentId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client-runtime-utils").Decimal;
        paymentId: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }>;
}
