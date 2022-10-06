import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
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
				status: true
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
        status: 'ACTIVE',
        ...or
      },
			select: {
				address: true,
				name: true,
				status: true
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

}
