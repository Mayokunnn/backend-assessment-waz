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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const cart_repository_1 = require("./repositories/cart.repository");
const cart_item_repository_1 = require("./repositories/cart-item.repository");
const product_repository_1 = require("../products/repositories/product.repository");
let CartService = class CartService {
    cartRepository;
    cartItemRepository;
    productRepository;
    constructor(cartRepository, cartItemRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }
    async getCart(userId) {
        const cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            return this.cartRepository.create(userId);
        }
        const total = cart.items.reduce((sum, item) => {
            return sum + Number(item.product.price) * item.quantity;
        }, 0);
        return {
            ...cart,
            total,
            itemCount: cart.items.length,
        };
    }
    async addToCart(userId, addToCartDto) {
        const { productId, quantity } = addToCartDto;
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (product.stock < quantity) {
            throw new common_1.BadRequestException(`Insufficient stock. Only ${product.stock} items available`);
        }
        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            cart = await this.cartRepository.create(userId);
        }
        const existingItem = await this.cartItemRepository.findByCartAndProduct(cart.id, productId);
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (product.stock < newQuantity) {
                throw new common_1.BadRequestException(`Insufficient stock. Only ${product.stock} items available`);
            }
            await this.cartItemRepository.update(existingItem.id, {
                quantity: newQuantity,
            });
        }
        else {
            await this.cartItemRepository.create({
                cartId: cart.id,
                productId,
                quantity,
            });
        }
        return this.getCart(userId);
    }
    async updateCartItem(userId, itemId, updateCartItemDto) {
        const { quantity } = updateCartItemDto;
        const cartItem = await this.cartItemRepository.findById(itemId);
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        if (cartItem.cart.userId !== userId) {
            throw new common_1.BadRequestException('This item does not belong to your cart');
        }
        if (cartItem.product.stock < quantity) {
            throw new common_1.BadRequestException(`Insufficient stock. Only ${cartItem.product.stock} items available`);
        }
        await this.cartItemRepository.update(itemId, { quantity });
        return this.getCart(userId);
    }
    async removeCartItem(userId, itemId) {
        const cartItem = await this.cartItemRepository.findById(itemId);
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        if (cartItem.cart.userId !== userId) {
            throw new common_1.BadRequestException('This item does not belong to your cart');
        }
        await this.cartItemRepository.delete(itemId);
        return this.getCart(userId);
    }
    async clearCart(userId) {
        const cart = await this.cartRepository.findByUserId(userId);
        if (cart) {
            await this.cartItemRepository.deleteMany({
                cartId: cart.id,
            });
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_repository_1.CartRepository,
        cart_item_repository_1.CartItemRepository,
        product_repository_1.ProductRepository])
], CartService);
//# sourceMappingURL=cart.service.js.map