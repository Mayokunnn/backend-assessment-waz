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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const checkout_service_1 = require("./checkout.service");
const payment_dto_1 = require("./dto/payment.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let CheckoutController = class CheckoutController {
    checkoutService;
    constructor(checkoutService) {
        this.checkoutService = checkoutService;
    }
    processPayment(user, paymentDto) {
        return this.checkoutService.processPayment(user.userId, paymentDto);
    }
    completeOrder(user, orderId) {
        return this.checkoutService.completeOrder(user.userId, orderId);
    }
};
exports.CheckoutController = CheckoutController;
__decorate([
    (0, common_1.Post)('payment'),
    (0, swagger_1.ApiOperation)({ summary: 'Process payment for an order (Mock)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Payment processed successfully',
        schema: {
            example: {
                success: true,
                message: 'Payment processed successfully',
                paymentId: 'PAY-1234567890-abc123',
                order: {
                    id: 'order-uuid',
                    status: 'PROCESSING',
                    paymentStatus: 'COMPLETED',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Payment failed or invalid order' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, payment_dto_1.PaymentDto]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "processPayment", null);
__decorate([
    (0, common_1.Post)('complete/:orderId'),
    (0, swagger_1.ApiOperation)({ summary: 'Complete order after payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order completed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Payment not completed' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order not found' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "completeOrder", null);
exports.CheckoutController = CheckoutController = __decorate([
    (0, swagger_1.ApiTags)('Checkout'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('checkout'),
    __metadata("design:paramtypes", [checkout_service_1.CheckoutService])
], CheckoutController);
//# sourceMappingURL=checkout.controller.js.map