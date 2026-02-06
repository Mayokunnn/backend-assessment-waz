import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
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
    }>;
    findAll(queryDto: QueryProductsDto): Promise<{
        items: {
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
        }[];
        pageInfo: {
            hasNextPage: boolean;
            nextCursor: string | null;
        };
    }>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
