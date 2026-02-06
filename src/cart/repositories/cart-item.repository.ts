import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CartItem, Prisma } from '@prisma/client';

@Injectable()
export class CartItemRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.cartItem.findUnique({
      where: { id },
      include: {
        cart: true,
        product: true,
      },
    });
  }

  async findByCartAndProduct(cartId: string, productId: string) {
    return this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });
  }

  async create(data: {
    cartId: string;
    productId: string;
    quantity: number;
  }): Promise<CartItem> {
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

  async update(
    id: string,
    data: Prisma.CartItemUpdateInput,
  ): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<CartItem> {
    return this.prisma.cartItem.delete({
      where: { id },
    });
  }

  async deleteMany(where: Prisma.CartItemWhereInput): Promise<void> {
    await this.prisma.cartItem.deleteMany({
      where,
    });
  }
}
