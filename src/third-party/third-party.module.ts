import { Module } from '@nestjs/common';
import { ThirdPartyService } from './third-party.service';
import { ThirdPartyController } from './third-party.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThirdParty } from './entities/third-party.entity';

@Module({
  controllers: [ThirdPartyController],
  providers: [ThirdPartyService],
  imports: [TypeOrmModule.forFeature([ThirdParty])],
})
export class ThirdPartyModule {}
