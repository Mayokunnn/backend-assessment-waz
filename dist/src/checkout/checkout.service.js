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
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const order_repository_1 = require("../orders/repositories/order.repository");
const orders_service_1 = require("../orders/orders.service");
let CheckoutService = class CheckoutService {
    orderRepository;
    ordersService;
    constructor(orderRepository, ordersService) {
        this.orderRepository = orderRepository;
        this.ordersService = ordersService;
    }
    async processPayment(userId, paymentDto) {
        const { orderId, cardNumber } = paymentDto;
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.userId !== userId) {
            throw new common_1.BadRequestException('This order does not belong to you');
        }
        if (order.paymentStatus === 'COMPLETED') {
            throw new common_1.BadRequestException('Order has already been paid');
        }
        const paymentSuccess = this.mockPaymentGateway(cardNumber);
        if (!paymentSuccess) {
            await this.ordersService.updateOrderStatus(orderId, 'CANCELLED', 'FAILED');
            throw new common_1.BadRequestException('Payment failed. Please try again');
        }
        const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const updatedOrder = await this.ordersService.updateOrderStatus(orderId, 'PROCESSING', 'COMPLETED', paymentId);
        return {
            success: true,
            message: 'Payment processed successfully',
            order: updatedOrder,
            paymentId,
        };
    }
    mockPaymentGateway(cardNumber) {
        return !cardNumber.endsWith('0000');
    }
    async completeOrder(userId, orderId) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.userId !== userId) {
            throw new common_1.BadRequestException('This order does not belong to you');
        }
        if (order.paymentStatus !== 'COMPLETED') {
            throw new common_1.BadRequestException('Order payment is not completed');
        }
        const updatedOrder = await this.ordersService.updateOrderStatus(orderId, 'SHIPPED');
        return {
            success: true,
            message: 'Order completed successfully',
            order: updatedOrder,
        };
    }
};
exports.CheckoutService = CheckoutService;
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_repository_1.OrderRepository,
        orders_service_1.OrdersService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map