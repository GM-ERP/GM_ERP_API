import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ThirdPartyService } from './third-party.service';
import { CreateThirdPartyDto } from './dto/create-third-party.dto';
import { UpdateThirdPartyDto } from './dto/update-third-party.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('third-party')
export class ThirdPartyController {
  constructor(private readonly thirdPartyService: ThirdPartyService) {}

  @Post()
  create(@Body() createThirdPartyDto: CreateThirdPartyDto) {
    return this.thirdPartyService.create(createThirdPartyDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.thirdPartyService.findAll(paginationDto);
  }

  @Get(':searchTerm')
  findOne(@Param('searchTerm') searchTerm: string) {
    return this.thirdPartyService.findOne(searchTerm);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThirdPartyDto: UpdateThirdPartyDto,
  ) {
    return this.thirdPartyService.update(id, updateThirdPartyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.thirdPartyService.remove(id);
  }
}
