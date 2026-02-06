import { PrismaService } from '../../database/prisma.service';
import { Order, Prisma } from '@prisma/client';
export declare class OrderRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                imageUrl: string | null;
                category: string;
            };
        } & {
            id: string;
            createdAt: Date;
            price: Prisma.Decimal;
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
        total: Prisma.Decimal;
        paymentId: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    }) | null>;
    findByUserId(userId: string): Promise<({
        items: ({
            product: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string;
                slug: string;
                price: Prisma.Decimal;
                stock: number;
                imageUrl: string | null;
                category: string;
            };
        } & {
            id: string;
            createdAt: Date;
            price: Prisma.Decimal;
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
        total: Prisma.Decimal;
        paymentId: string | null;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
    })[]>;
    create(data: Prisma.OrderCreateInput): Promise<Order>;
    update(id: string, data: Prisma.OrderUpdateInput): Promise<Order>;
    delete(id: string): Promise<Order>;
}
