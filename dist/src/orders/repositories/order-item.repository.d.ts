import { PrismaService } from '../../database/prisma.service';
import { OrderItem, Prisma } from '@prisma/client';
export declare class OrderItemRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<OrderItem | null>;
    findMany(where: Prisma.OrderItemWhereInput): Promise<OrderItem[]>;
    create(data: Prisma.OrderItemCreateInput): Promise<OrderItem>;
    update(id: string, data: Prisma.OrderItemUpdateInput): Promise<OrderItem>;
    delete(id: string): Promise<OrderItem>;
}
