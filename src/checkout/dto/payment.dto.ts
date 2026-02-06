import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({
    example: 'order-uuid',
    description: 'Order ID to process payment for',
  })
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    example: '4242424242424242',
    description: 'Mock credit card number',
  })
  @IsString()
  @Matches(/^\d{16}$/, { message: 'Card number must be 16 digits' })
  cardNumber: string;

  @ApiProperty({
    example: '12/25',
    description: 'Card expiry date (MM/YY)',
  })
  @IsString()
  @Matches(/^\d{2}\/\d{2}$/, { message: 'Expiry must be in MM/YY format' })
  expiryDate: string;

  @ApiProperty({
    example: '123',
    description: 'Card CVV',
  })
  @IsString()
  @Matches(/^\d{3}$/, { message: 'CVV must be 3 digits' })
  cvv: string;
}
