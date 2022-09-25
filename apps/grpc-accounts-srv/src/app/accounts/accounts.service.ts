import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
//import { accounts } from '@prisma/client';
import { FindOneRequestDto } from './accounts.dto';
import { FindOneResponse } from './accounts.pb';

@Injectable()
export class AccountsService {
	constructor(private prisma: PrismaService) {}

  public async findOne({ name }: FindOneRequestDto): Promise<FindOneResponse> {
		
		const account = await this.prisma.accounts.findUnique({
			where: {
				name: name,
			},
			select: {
				address: true,
				name: true,
			},
		})

    if (!account) {
      return { data: null, error: ['Account not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: account, error: null, status: HttpStatus.OK };
  }
/**
  public async createProduct(payload: CreateProductRequestDto): Promise<CreateProductResponse> {
    const product: Product = new Product();

    product.name = payload.name;
    product.sku = payload.sku;
    product.stock = payload.stock;
    product.price = payload.price;

    await this.repository.save(product);

    return { id: product.id, error: null, status: HttpStatus.OK };
  }

  public async decreaseStock({ id, orderId }: DecreaseStockRequestDto): Promise<DecreaseStockResponse> {
    const product: Product = await this.repository.findOne({ select: ['id', 'stock'], where: { id } });

    if (!product) {
      return { error: ['Product not found'], status: HttpStatus.NOT_FOUND };
    } else if (product.stock <= 0) {
      return { error: ['Stock too low'], status: HttpStatus.CONFLICT };
    }

    const isAlreadyDecreased: number = await this.decreaseLogRepository.count({ where: { orderId } });

    if (isAlreadyDecreased) {
      // Idempotence
      return { error: ['Stock already decreased'], status: HttpStatus.CONFLICT };
    }

    await this.repository.update(product.id, { stock: product.stock - 1 });
    await this.decreaseLogRepository.insert({ product, orderId });

    return { error: null, status: HttpStatus.OK };
  } */
}
