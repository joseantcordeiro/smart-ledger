import { HttpStatus, Injectable } from '@nestjs/common';
import { initializeTracing } from '@smart-ledger/tracing'
import { PrismaService } from '../prisma.service';
//import { accounts } from '@prisma/client';
import { FindOneRequestDto } from './accounts.dto';
import { FindOneResponse } from './accounts.pb';

@Injectable()
export class AccountsService {
	constructor(private prisma: PrismaService) {}

	private tracer = initializeTracing('grpc-accounts-srv');

  public async findOne({ name }: FindOneRequestDto): Promise<FindOneResponse> {
		await this.tracer.startActiveSpan("GET /:account/balances", async (requestSpan) => {
			try {
				const account = await this.prisma.accounts.findUnique({
					where: {
						name: name,
					},
				})

				if (!account) {
					requestSpan.setAttribute("http.status", HttpStatus.NOT_FOUND);
					return { data: null, error: ['Account not found'], status: HttpStatus.NOT_FOUND };
				}

				requestSpan.setAttribute("http.status", HttpStatus.OK);
				return { data: account, error: null, status: HttpStatus.OK };
			} catch (e) {
				requestSpan.setAttribute("http.status", 500);
				return { data: null, error: e, status: 500 };
		 	} finally {
				requestSpan.end();
			}
		})
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
