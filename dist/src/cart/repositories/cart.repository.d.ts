import { PrismaService } from '../../database/prisma.service';
import { Cart, Prisma } from '@prisma/client';
export declare class CartRepository {
    private prisma;
    constructor(prisma: PrismaService);
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
            updatedAt: Date;
            quantity: number;
            cartId: string;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }) | null>;
    create(userId: string): Promise<{
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
            updatedAt: Date;
            quantity: number;
            cartId: string;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    } | null>;
    update(id: string, data: Prisma.CartUpdateInput): Promise<Cart>;
    delete(id: string): Promise<Cart>;
}
