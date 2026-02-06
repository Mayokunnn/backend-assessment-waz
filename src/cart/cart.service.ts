import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { CartItemRepository } from './repositories/cart-item.repository';
import { ProductRepository } from '../products/repositories/product.repository';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private cartItemRepository: CartItemRepository,
    private productRepository: ProductRepository,
  ) {}

  async getCart(userId: string) {
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

  async addToCart(userId: string, addToCartDto: AddToCartDto) {
    const { productId, quantity } = addToCartDto;

    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < quantity) {
      throw new BadRequestException(
        `Insufficient stock. Only ${product.stock} items available`,
      );
    }

    let cart = await this.cartRepository.findByUserId(userId);

    if (!cart) {
      cart = await this.cartRepository.create(userId);
    }

    const existingItem = await this.cartItemRepository.findByCartAndProduct(
      cart.id,
      productId,
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (product.stock < newQuantity) {
        throw new BadRequestException(
          `Insufficient stock. Only ${product.stock} items available`,
        );
      }

      await this.cartItemRepository.update(existingItem.id, {
        quantity: newQuantity,
      });
    } else {
      await this.cartItemRepository.create({
        cartId: cart.id,
        productId,
        quantity,
      });
    }

    return this.getCart(userId);
  }

  async updateCartItem(
    userId: string,
    itemId: string,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const { quantity } = updateCartItemDto;

    const cartItem = await this.cartItemRepository.findById(itemId);

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.cart.userId !== userId) {
      throw new BadRequestException('This item does not belong to your cart');
    }

    if (cartItem.product.stock < quantity) {
      throw new BadRequestException(
        `Insufficient stock. Only ${cartItem.product.stock} items available`,
      );
    }

    await this.cartItemRepository.update(itemId, { quantity });

    return this.getCart(userId);
  }

  async removeCartItem(userId: string, itemId: string) {
    const cartItem = await this.cartItemRepository.findById(itemId);

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.cart.userId !== userId) {
      throw new BadRequestException('This item does not belong to your cart');
    }

    await this.cartItemRepository.delete(itemId);

    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    const cart = await this.cartRepository.findByUserId(userId);

    if (cart) {
      await this.cartItemRepository.deleteMany({
        cartId: cart.id,
      });
    }
  }
}
