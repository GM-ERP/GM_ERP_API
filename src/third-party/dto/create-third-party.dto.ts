import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateThirdPartyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  identificationType: string;

  @IsString()
  @IsNotEmpty()
  identificationNumber: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
