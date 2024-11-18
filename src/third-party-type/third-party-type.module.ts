import { Module } from '@nestjs/common';
import { ThirdPartyTypeService } from './third-party-type.service';
import { ThirdPartyTypeController } from './third-party-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdPartyType } from './entities/third-party-type.entity';

@Module({
  controllers: [ThirdPartyTypeController],
  providers: [ThirdPartyTypeService],
  imports: [TypeOrmModule.forFeature([ThirdPartyType])],
})
export class ThirdPartyTypeModule {}
