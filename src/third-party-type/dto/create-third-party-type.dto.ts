import { IsString, MinLength } from 'class-validator';

export class CreateThirdPartyTypeDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  userId: string;
}
