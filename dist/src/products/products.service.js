"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("./repositories/product.repository");
let ProductsService = class ProductsService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(createProductDto) {
        const product = await this.productRepository.create(createProductDto);
        return product;
    }
    async findAll(queryDto) {
        const { cursor, limit = 10, category, search, minPrice, maxPrice, } = queryDto;
        const where = {};
        if (category) {
            where.category = category;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined) {
                where.price.gte = minPrice;
            }
            if (maxPrice !== undefined) {
                where.price.lte = maxPrice;
            }
        }
        const products = await this.productRepository.findMany({
            where,
            take: limit + 1,
            ...(cursor && {
                skip: 1,
                cursor: {
                    id: cursor,
                },
            }),
            orderBy: {
                createdAt: 'desc',
            },
        });
        const hasNextPage = products.length > limit;
        const items = hasNextPage ? products.slice(0, -1) : products;
        const nextCursor = hasNextPage ? items[items.length - 1].id : null;
        return {
            items,
            pageInfo: {
                hasNextPage,
                nextCursor,
            },
        };
    }
    async findOne(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        await this.findOne(id);
        const product = await this.productRepository.update(id, updateProductDto);
        return product;
    }
    async remove(id) {
        await this.findOne(id);
        await this.productRepository.delete(id);
        return { message: 'Product deleted successfully' };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map