import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { FindAccountsRequestDto, FindAccountRequestDto } from './accounts.dto';
import { FindAccountsResponse, FindAccountResponse } from './accounts.pb';

@Injectable()
export class AccountsService {
	constructor(private prisma: PrismaService) {}

  public async findOne({ name, ledgerId }: FindAccountRequestDto): Promise<FindAccountResponse> {
		
		const account = await this.prisma.accounts.findUnique({
			where: {
				name_ledgerId: {
					name: name,
					ledgerId: ledgerId
				}
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

	public async findMany({ searchString, take, skip, orderBy, ledgerId }: FindAccountsRequestDto): Promise<FindAccountsResponse> {
		const or = searchString ? {
      OR: [
        { name: { contains: searchString } },
        { address: { contains: searchString } },
      ],
    } : {};

		const accounts = await this.prisma.accounts.findMany({
			where: {
        status: 'ACTIVE',
				ledgerId: ledgerId,
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
