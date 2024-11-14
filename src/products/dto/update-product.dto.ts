import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  description?: string;
}
