import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OrderItem, Prisma } from '@prisma/client';

@Injectable()
export class OrderItemRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<OrderItem | null> {
    return this.prisma.orderItem.findUnique({
      where: { id },
    });
  }

  async findMany(where: Prisma.OrderItemWhereInput): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany({
      where,
    });
  }

  async create(data: Prisma.OrderItemCreateInput): Promise<OrderItem> {
    return this.prisma.orderItem.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.OrderItemUpdateInput,
  ): Promise<OrderItem> {
    return this.prisma.orderItem.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<OrderItem> {
    return this.prisma.orderItem.delete({
      where: { id },
    });
  }
}
