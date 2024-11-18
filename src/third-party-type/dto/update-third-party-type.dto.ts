import { PartialType } from '@nestjs/mapped-types';
import { CreateThirdPartyTypeDto } from './create-third-party-type.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateThirdPartyTypeDto extends PartialType(
  CreateThirdPartyTypeDto,
) {
  @IsString()
  @MinLength(1)
  name: string;
}
