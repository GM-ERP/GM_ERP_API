import { PartialType } from '@nestjs/mapped-types';
import { CreateThirdPartyDto } from './create-third-party.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdateThirdPartyDto extends PartialType(CreateThirdPartyDto) {
  @IsString()
  @IsOptional()
  @MinLength(1)
  name?: string;

  @IsUUID()
  @IsOptional()
  identificationTypeId?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  identificationNumber?: string;

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
}
