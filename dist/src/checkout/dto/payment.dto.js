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
exports.PaymentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class PaymentDto {
    orderId;
    cardNumber;
    expiryDate;
    cvv;
}
exports.PaymentDto = PaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'order-uuid',
        description: 'Order ID to process payment for',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PaymentDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '4242424242424242',
        description: 'Mock credit card number',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{16}$/, { message: 'Card number must be 16 digits' }),
    __metadata("design:type", String)
], PaymentDto.prototype, "cardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12/25',
        description: 'Card expiry date (MM/YY)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{2}\/\d{2}$/, { message: 'Expiry must be in MM/YY format' }),
    __metadata("design:type", String)
], PaymentDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123',
        description: 'Card CVV',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{3}$/, { message: 'CVV must be 3 digits' }),
    __metadata("design:type", String)
], PaymentDto.prototype, "cvv", void 0);
//# sourceMappingURL=payment.dto.js.map