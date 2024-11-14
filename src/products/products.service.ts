import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const { name } = createProductDto;

      const productFound = await this.productRepository.findOneBy({
        name: name.toLowerCase(),
        removedAt: IsNull(),
      });

      if (productFound) {
        throw new InternalServerErrorException(
          `Product with name ${name} already exists`,
        );
      }
      createProductDto.name = name.toLowerCase();
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return await this.productRepository.find({
      take: limit,
      skip: offset,
      where: { removedAt: IsNull() },
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(searchTerm: string) {
    let product: Product;
    if (isUUID(searchTerm)) {
      product = await this.productRepository.findOneBy({
        id: searchTerm,
        removedAt: IsNull(),
      });
    } else {
      product = await this.productRepository.findOneBy({
        name: searchTerm.toLowerCase(),
        removedAt: IsNull(),
      });
    }

    if (!product) {
      throw new InternalServerErrorException(`Product not found`);
    }

    return product;
  }

  async findByUserId(userId: string) {
    const product = await this.productRepository.find({
      where: {
        userId: userId,
        removedAt: IsNull(),
      },
      order: {
        name: 'ASC',
      },
    });
    if (!product) {
      throw new InternalServerErrorException(`Product not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    try {
      await this.productRepository.save(product);

      delete product.id,
        delete product.removedAt,
        delete product.updatedAt,
        delete product.userId;

      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    await this.productRepository.softRemove(product);

    return { message: `Product with id ${id} removed successfully` };
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);

    if (error.code === '23505') {
      throw new InternalServerErrorException(
        `Product already exists: ${error.detail}`,
      );
    }

    throw new InternalServerErrorException(`Error creating product: ${error}`);
  }
}
