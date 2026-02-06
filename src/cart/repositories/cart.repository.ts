import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Cart, Prisma } from '@prisma/client';

@Injectable()
export class CartRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async create(userId: string) {
    return this.prisma.cart.create({
      data: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.cart.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.CartUpdateInput): Promise<Cart> {
    return this.prisma.cart.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Cart> {
    return this.prisma.cart.delete({
      where: { id },
    });
  }
}
