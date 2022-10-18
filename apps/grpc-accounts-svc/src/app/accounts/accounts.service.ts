import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { EthService } from '@ledger/eth';
import { FindAccountsRequestDto, FindAccountRequestDto, FindBalanceRequestDto } from './accounts.dto';
import { FindAccountsResponse, FindAccountResponse, FindBalanceResponse } from './accounts.pb';

@Injectable()
export class AccountsService {
	constructor(
		private prisma: PrismaService,
		private readonly eth: EthService) {}

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

	public async createAccount({ name, ledgerId }: FindAccountRequestDto): Promise<FindAccountResponse> {
		
		// TODO check if account already exists
		
		const ethAccount = await this.eth.createAccount();

		const account = await this.prisma.accounts.create({
			data: { address: ethAccount, name: name, ledgerId: ledgerId },
			select: {
				address: true,
				name: true,
				status: true
			},
		})

    if (!account) {
      return { data: null, error: ['Account not created'], status: HttpStatus.NOT_FOUND };
    }

    return { data: account, error: null, status: HttpStatus.CREATED };
  }

	public async balance({ name, symbol, ledgerId }: FindBalanceRequestDto): Promise<FindBalanceResponse> {
		
		const account = await this.findOne({ name, ledgerId });

    if (account.status != HttpStatus.OK) {
      return { data: null, error: ['Account not found'], status: HttpStatus.NOT_FOUND };
    }

		const asset = await this.prisma.assets.findUnique({
			where: {
				ledgerId_symbol: {
					ledgerId: ledgerId,
					symbol: symbol
				}
			},
			select: {
				contract: true,
				symbol: true
			},
		})

		if (!asset) {
      return { data: null, error: ['Asset not found'], status: HttpStatus.NOT_FOUND };
    }

		const balance = await this.eth.getBalance(account.data.address, asset.contract);
		balance.balance = Math.trunc(balance.balance / 10e+18);

		const response = {
			name: account.data.name,
			symbol: asset.symbol,
			amount: balance.balance
		}

    return { data: response, error: null, status: HttpStatus.OK };
  }

}
