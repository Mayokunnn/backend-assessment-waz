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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("./repositories/order.repository");
const order_item_repository_1 = require("./repositories/order-item.repository");
const product_repository_1 = require("../products/repositories/product.repository");
const cart_repository_1 = require("../cart/repositories/cart.repository");
const cart_item_repository_1 = require("../cart/repositories/cart-item.repository");
const prisma_service_1 = require("../database/prisma.service");
let OrdersService = class OrdersService {
    orderRepository;
    orderItemRepository;
    productRepository;
    cartRepository;
    cartItemRepository;
    prisma;
    constructor(orderRepository, orderItemRepository, productRepository, cartRepository, cartItemRepository, prisma) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.prisma = prisma;
    }
    async createOrder(userId) {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        let total = 0;
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for ${item.product.name}. Only ${item.product.stock} available`);
            }
            total += Number(item.product.price) * item.quantity;
        }
        const order = await this.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    total,
                    status: 'PENDING',
                    paymentStatus: 'PENDING',
                },
            });
            for (const item of cart.items) {
                await tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    },
                });
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
            return newOrder;
        });
        return this.findOne(userId, order.id);
    }
    async findAll(userId) {
        return this.orderRepository.findByUserId(userId);
    }
    async findOne(userId, orderId) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.userId !== userId) {
            throw new common_1.BadRequestException('This order does not belong to you');
        }
        return order;
    }
    async updateOrderStatus(orderId, status, paymentStatus, paymentId) {
        return this.orderRepository.update(orderId, {
            status,
            ...(paymentStatus && { paymentStatus }),
            ...(paymentId && { paymentId }),
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository,
        order_item_repository_1.OrderItemRepository,
        product_repository_1.ProductRepository,
        cart_repository_1.CartRepository,
        cart_item_repository_1.CartItemRepository,
        prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map