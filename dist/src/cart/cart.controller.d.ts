import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(user: any): Promise<({
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
    }) | {
        total: number;
        itemCount: number;
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
            updatedAt: Date;
            quantity: number;
            cartId: string;
            productId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    addToCart(user: any, addToCartDto: AddToCartDto): Promise<({
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
    }) | {
        total: number;
        itemCount: number;
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
            updatedAt: Date;
            quantity: number;
            cartId: string;
            productId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    updateCartItem(user: any, id: string, updateCartItemDto: UpdateCartItemDto): Promise<({
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
    }) | {
        total: number;
        itemCount: number;
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
            updatedAt: Date;
            quantity: number;
            cartId: string;
            productId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    removeCartItem(user: any, id: string): Promise<({
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
    }) | {
        total: number;
        itemCount: number;
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
            updatedAt: Date;
            quantity: number;
            cartId: string;
            productId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
