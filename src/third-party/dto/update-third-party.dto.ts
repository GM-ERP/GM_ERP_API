import { PartialType } from '@nestjs/mapped-types';
import { CreateThirdPartyDto } from './create-third-party.dto';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateThirdPartyDto extends PartialType(CreateThirdPartyDto) {
  @IsString()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  identificationTypeId: string;

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
}
