import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateThirdPartyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsUUID()
  @IsNotEmpty()
  identificationTypeId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  identificationNumber: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  address?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  phone?: string;

  @IsEmail()
  @IsOptional()
  @MinLength(1)
  email?: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
