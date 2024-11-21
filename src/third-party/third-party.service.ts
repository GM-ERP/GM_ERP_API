import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThirdParty } from './entities/third-party.entity';
import { Brackets, IsNull, Repository } from 'typeorm';
import { CreateThirdPartyDto, UpdateThirdPartyDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ThirdPartyService {
  private readonly logger = new Logger('thirdPartyService');
  constructor(
    @InjectRepository(ThirdParty)
    private readonly thirdPartyRepository: Repository<ThirdParty>,
  ) {}

  async create(createThirdPartyDto: CreateThirdPartyDto) {
    try {
      const { name } = createThirdPartyDto;

      const thirdPartyFound = await this.thirdPartyRepository.findOneBy({
        name: name.toLowerCase(),
        removedAt: IsNull(),
      });

      if (thirdPartyFound) {
        throw new InternalServerErrorException(
          `Third party with name ${name} already exists`,
        );
      }
      createThirdPartyDto.name = name.toLowerCase();
      const thirdParty = this.thirdPartyRepository.create(createThirdPartyDto);
      await this.thirdPartyRepository.save(thirdParty);

      return thirdParty;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.thirdPartyRepository.find({
      take: limit,
      skip: offset,
      where: { removedAt: IsNull() },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(searchTerm: string) {
    let thirdParty: ThirdParty;
    if (isUUID(searchTerm)) {
      thirdParty = await this.thirdPartyRepository.findOneBy({
        id: searchTerm,
        removedAt: IsNull(),
      });
    } else {
      const queryBuilder = this.thirdPartyRepository.createQueryBuilder();

      thirdParty = await queryBuilder
        .where('ThirdParty.removedAt IS NULL')
        .andWhere(
          new Brackets((qb) => {
            qb.where('ThirdParty.name = :name', {
              name: searchTerm.toLowerCase(),
            }).orWhere(
              'ThirdParty.identificationNumber = :identificationNumber',
              {
                identificationNumber: searchTerm,
              },
            );
          }),
        )
        .getOne();
    }

    console.log(thirdParty);

    if (!thirdParty) {
      throw new InternalServerErrorException(`Third party not found`);
    }

    return thirdParty;
  }

  async findByUserId(userId: string) {
    const thirdParty = await this.thirdPartyRepository.find({
      where: {
        userId: userId,
        removedAt: IsNull(),
      },
      order: {
        name: 'ASC',
      },
    });
    if (!thirdParty) {
      throw new InternalServerErrorException(`Third party not found`);
    }

    return thirdParty;
  }

  async update(id: string, updateThirdPartyDto: UpdateThirdPartyDto) {
    const thirdParty = await this.thirdPartyRepository.preload({
      id,
      ...updateThirdPartyDto,
    });

    if (!thirdParty) {
      throw new NotFoundException(`Third party with id ${id} not found`);
    }

    try {
      await this.thirdPartyRepository.save(thirdParty);

      delete thirdParty.id, delete thirdParty.userId;

      return thirdParty;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const thirdParty = await this.findOne(id);

    if (!thirdParty) {
      throw new Error(`Third party with id ${id} not found`);
    }

    await this.thirdPartyRepository.softRemove(thirdParty);

    return { message: `Third party with id ${id} removed successfully` };
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);

    if (error.code === '23505') {
      throw new InternalServerErrorException(
        `Third party already exists: ${error.detail}`,
      );
    }

    throw new InternalServerErrorException(
      `Error creating Third party: ${error}`,
    );
  }
}
