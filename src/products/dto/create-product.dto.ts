import { IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
  
  @IsString()
  @IsOptional()
  @MinLength(1)
  description?: string;

  /*@IsNumber()
  @IsOptional()
  @MinLength(1)
  removedAt?: number;

  @IsNumber()
  @IsOptional()
  @MinLength(1)
  updatedAt?: number;*/
}
