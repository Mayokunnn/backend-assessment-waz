import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    example: 'Wireless Headphones',
    description: 'Product name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @ApiProperty({
    example: 'Premium noise-cancelling wireless headphones',
    description: 'Product description',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ApiProperty({
    example: 299.99,
    description: 'Product price',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({
    example: 50,
    description: 'Stock quantity',
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  stock: number;

  @ApiProperty({
    example: 'wireless-headphones',
    description: 'URL-friendly product identifier',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  slug?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Product image URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'Product category',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  category: string;
}
