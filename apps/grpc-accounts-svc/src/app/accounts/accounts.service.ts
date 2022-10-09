import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { Web3Service } from "nest-web3";
import { FindAccountsRequestDto, FindAccountRequestDto } from './accounts.dto';
import { FindAccountsResponse, FindAccountResponse } from './accounts.pb';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('request');

@Injectable()
export class AccountsService {
	constructor(
		private prisma: PrismaService,
		private readonly web3Service: Web3Service) {}

  public async findOne({ name, ledger_id }: FindAccountRequestDto): Promise<FindAccountResponse> {
		
		const account = await this.prisma.accounts.findUnique({
			where: {
				name_ledgerId: {
					name: name,
					ledgerId: ledger_id
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

	public async findMany({ search_string, take, skip, order_by, ledger_id }: FindAccountsRequestDto): Promise<FindAccountsResponse> {
		const or = search_string ? {
      OR: [
        { name: { contains: search_string } },
        { address: { contains: search_string } },
      ],
    } : {};

		const accounts = await this.prisma.accounts.findMany({
			where: {
        status: 'ACTIVE',
				ledgerId: ledger_id,
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
      //  name: order_by
      //}
		});

    if (!accounts) {
      return { data: null, error: ['Accounts not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: accounts, error: null, status: HttpStatus.OK };
  }

	public async createAccount({ name, ledger_id }: FindAccountRequestDto): Promise<FindAccountResponse> {
		
		// TODO check if account already exists

		const web3 = this.web3Service.getClient('eth');
		const ethAccount = web3.eth.accounts.create();

		const options = {
			'method': 'POST',
			'url': 'http://joseantcordeiro.hopto.org:8200/v1/secret/data/' + ethAccount.address,
			'headers': {
				'X-Vault-Token': 's.AwmKlMHrVdNq3GNyM88C1SyY',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"options": {
					"cas": 0
				},
				"data": {
					"privateKey": ethAccount.privateKey,
				}
			})
		
		};
		request(options, function (error: string | undefined, response: { body: any; }) {
			if (error) throw new Error(error);
			console.log(response.body);
		});

		const account = await this.prisma.accounts.create({
			data: { address: ethAccount.address, name: name, ledgerId: ledger_id },
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

}
