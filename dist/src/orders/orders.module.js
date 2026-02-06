"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const order_repository_1 = require("./repositories/order.repository");
const order_item_repository_1 = require("./repositories/order-item.repository");
const database_module_1 = require("../database/database.module");
const products_module_1 = require("../products/products.module");
const cart_module_1 = require("../cart/cart.module");
const cart_item_repository_1 = require("../cart/repositories/cart-item.repository");
const cart_repository_1 = require("../cart/repositories/cart.repository");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, products_module_1.ProductsModule, cart_module_1.CartModule],
        controllers: [orders_controller_1.OrdersController],
        providers: [
            orders_service_1.OrdersService,
            order_repository_1.OrderRepository,
            order_item_repository_1.OrderItemRepository,
            cart_item_repository_1.CartItemRepository,
            cart_repository_1.CartRepository,
        ],
        exports: [orders_service_1.OrdersService],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map