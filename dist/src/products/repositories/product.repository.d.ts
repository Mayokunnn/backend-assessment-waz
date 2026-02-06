import { PrismaService } from '../../database/prisma.service';
import { Product, Prisma } from '@prisma/client';
export declare class ProductRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<Product | null>;
    findMany(args: Prisma.ProductFindManyArgs): Promise<Product[]>;
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    update(id: string, data: Prisma.ProductUpdateInput): Promise<Product>;
    delete(id: string): Promise<Product>;
}
