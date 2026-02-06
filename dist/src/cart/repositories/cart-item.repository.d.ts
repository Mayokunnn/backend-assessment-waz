import { PrismaService } from '../../database/prisma.service';
import { CartItem, Prisma } from '@prisma/client';
export declare class CartItemRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<({
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
        cart: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        cartId: string;
        productId: string;
    }) | null>;
    findByCartAndProduct(cartId: string, productId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        cartId: string;
        productId: string;
    } | null>;
    create(data: {
        cartId: string;
        productId: string;
        quantity: number;
    }): Promise<CartItem>;
    update(id: string, data: Prisma.CartItemUpdateInput): Promise<CartItem>;
    delete(id: string): Promise<CartItem>;
    deleteMany(where: Prisma.CartItemWhereInput): Promise<void>;
}
