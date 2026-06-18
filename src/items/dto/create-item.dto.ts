import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({ example: 'iPhone 15' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 80000 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Latest Apple phone', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}