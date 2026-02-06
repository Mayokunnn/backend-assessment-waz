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
exports.CartItemRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let CartItemRepository = class CartItemRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.cartItem.findUnique({
            where: { id },
            include: {
                cart: true,
                product: true,
            },
        });
    }
    async findByCartAndProduct(cartId, productId) {
        return this.prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId,
                    productId,
                },
            },
        });
    }
    async create(data) {
        return this.prisma.cartItem.create({
            data: {
                cart: {
                    connect: {
                        id: data.cartId,
                    },
                },
                product: {
                    connect: {
                        id: data.productId,
                    },
                },
                quantity: data.quantity,
            },
        });
    }
    async update(id, data) {
        return this.prisma.cartItem.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.cartItem.delete({
            where: { id },
        });
    }
    async deleteMany(where) {
        await this.prisma.cartItem.deleteMany({
            where,
        });
    }
};
exports.CartItemRepository = CartItemRepository;
exports.CartItemRepository = CartItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartItemRepository);
//# sourceMappingURL=cart-item.repository.js.map