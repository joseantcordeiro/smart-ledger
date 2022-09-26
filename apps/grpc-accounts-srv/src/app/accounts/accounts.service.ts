import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FindAccountsRequestDto, FindAccountRequestDto, FindMetadataRequestDto, CreateMetadataRequestDto } from './accounts.dto';
import { FindAccountsResponse, FindAccountResponse, FindMetadataResponse, CreateMetadataResponse } from './accounts.pb';

@Injectable()
export class AccountsService {
	constructor(private prisma: PrismaService) {}

  public async findOne({ name }: FindAccountRequestDto): Promise<FindAccountResponse> {
		
		const account = await this.prisma.accounts.findUnique({
			where: {
				name: name,
			},
			select: {
				address: true,
				name: true,
				meta: true
			},
		})

    if (!account) {
      return { data: null, error: ['Account not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: account, error: null, status: HttpStatus.OK };
  }

	public async findMany({ searchString, take, skip, orderBy }: FindAccountsRequestDto): Promise<FindAccountsResponse> {
		const or = searchString ? {
      OR: [
        { name: { contains: searchString } },
        { address: { contains: searchString } },
      ],
    } : {};

		const accounts = await this.prisma.accounts.findMany({
			where: {
        active: true,
        ...or
      },
			select: {
				address: true,
				name: true,
				meta: true
			},
			take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      //orderBy: {
      //  name: orderBy
      //}
		});

    if (!accounts) {
      return { data: null, error: ['Accounts not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: accounts, error: null, status: HttpStatus.OK };
  }

	public async findMetadata({ name, searchString, take, skip, orderBy }: FindMetadataRequestDto): Promise<FindMetadataResponse> {
		const or = searchString ? {
      OR: [
        { key: { contains: searchString } },
        { value: { contains: searchString } },
      ],
    } : {};

		const metadata = await this.prisma.metadata.findMany({
			where: {
        account: name,
        ...or
      },
			select: {
				key: true,
				value: true
			},
			take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      //orderBy: {
			//	key: orderBy,
			//}
		});

    if (!metadata) {
      return { data: null, error: ['Metadata not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.OK };
  }

	public async createMetadata({ name, key, value }: CreateMetadataRequestDto): Promise<CreateMetadataResponse> {
		const metadata = await this.prisma.metadata.create({
			data: { account: name, key: key, value: value }
		})

    if (!metadata) {
      return { data: null, error: ['Metadata not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.OK };
  }

}
