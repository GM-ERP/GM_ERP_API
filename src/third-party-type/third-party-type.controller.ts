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
import { ThirdPartyTypeService } from './third-party-type.service';
import { CreateThirdPartyTypeDto } from './dto/create-third-party-type.dto';
import { UpdateThirdPartyTypeDto } from './dto/update-third-party-type.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('third-party-type')
export class ThirdPartyTypeController {
  constructor(private readonly thirdPartyTypeService: ThirdPartyTypeService) {}

  @Post()
  create(@Body() createThirdPartyTypeDto: CreateThirdPartyTypeDto) {
    return this.thirdPartyTypeService.create(createThirdPartyTypeDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.thirdPartyTypeService.findAll(paginationDto);
  }

  @Get(':searchTerm')
  findOne(@Param('searchTerm') searchTerm: string) {
    return this.thirdPartyTypeService.findOne(searchTerm);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateThirdPartyTypeDto: UpdateThirdPartyTypeDto,
  ) {
    return this.thirdPartyTypeService.update(id, updateThirdPartyTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.thirdPartyTypeService.remove(id);
  }
}
