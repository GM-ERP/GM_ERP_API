import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateThirdPartyTypeDto, UpdateThirdPartyTypeDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ThirdPartyType } from './entities/third-party-type.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ThirdPartyTypeService {
  private readonly logger = new Logger('ThirdPartyTypeService');

  constructor(
    @InjectRepository(ThirdPartyType)
    private readonly thirdPartyTypeRepository: Repository<ThirdPartyType>,
  ) {}

  async create(createThirdPartyTypeDto: CreateThirdPartyTypeDto) {
    try {
      const { name } = createThirdPartyTypeDto;

      const thirdPartyTypeFound = await this.thirdPartyTypeRepository.findOneBy(
        {
          name: name.toLowerCase(),
        },
      );

      if (thirdPartyTypeFound) {
        throw new InternalServerErrorException(
          `Third party type with name ${name} already exists`,
        );
      }
      createThirdPartyTypeDto.name = name.toLowerCase();
      const thirdpartyType = this.thirdPartyTypeRepository.create(
        createThirdPartyTypeDto,
      );
      await this.thirdPartyTypeRepository.save(thirdpartyType);

      return thirdpartyType;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.thirdPartyTypeRepository.find({
      take: limit,
      skip: offset,
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(searchTerm: string) {
    let thirdPartyType: ThirdPartyType;
    if (isUUID(searchTerm)) {
      thirdPartyType = await this.thirdPartyTypeRepository.findOneBy({
        id: searchTerm,
      });
    } else {
      thirdPartyType = await this.thirdPartyTypeRepository.findOneBy({
        name: searchTerm.toLowerCase(),
      });
    }

    if (!thirdPartyType) {
      throw new InternalServerErrorException(`Third party type not found`);
    }

    return thirdPartyType;
  }

  async findByUserId(userId: string) {
    const thirdpartyType = await this.thirdPartyTypeRepository.find({
      where: {
        userId: userId,
      },
      order: {
        name: 'ASC',
      },
    });
    if (!thirdpartyType) {
      throw new InternalServerErrorException(`Third partyType not found`);
    }

    return thirdpartyType;
  }

  async update(id: string, updateThirdPartyTypeDto: UpdateThirdPartyTypeDto) {
    const thirdpartyType = await this.thirdPartyTypeRepository.preload({
      id,
      ...updateThirdPartyTypeDto,
    });

    if (!thirdpartyType) {
      throw new NotFoundException(`Third party type with id ${id} not found`);
    }

    try {
      await this.thirdPartyTypeRepository.save(thirdpartyType);

      delete thirdpartyType.id, delete thirdpartyType.userId;

      return thirdpartyType;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const thirdpartyType = await this.findOne(id);

    if (!thirdpartyType) {
      throw new Error(`Third party type with id ${id} not found`);
    }

    await this.thirdPartyTypeRepository.delete(thirdpartyType);

    return { message: `Third party type with id ${id} removed successfully` };
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);

    if (error.code === '23505') {
      throw new InternalServerErrorException(
        `Third party type already exists: ${error.detail}`,
      );
    }

    throw new InternalServerErrorException(
      `Error creating Third party type: ${error}`,
    );
  }
}
