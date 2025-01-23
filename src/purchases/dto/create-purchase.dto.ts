import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreatePurchaseDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(1)
  price: number;

  @IsUUID()
  @IsNotEmpty()
  thirdPartyId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
