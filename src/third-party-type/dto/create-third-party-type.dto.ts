import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateThirdPartyTypeDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
