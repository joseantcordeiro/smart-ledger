import { EthService } from '@ledger/eth';
import { PrismaService } from '@ledger/prisma';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('transactions')
export class TransactionsProcessor {
	constructor(
		private prisma: PrismaService,
		private readonly eth: EthService
	) {}
  private readonly logger = new Logger(TransactionsProcessor.name);

  @Process('posting')
  async handlePosting(job: Job) {
    this.logger.debug('Start transaction...');
		const fromAddress = await this.accountAddress(job.data.source, job.data.ledgerId);
		this.logger.debug(fromAddress);
		const toAddress = await this.accountAddress(job.data.destination, job.data.ledgerId);
		this.logger.debug(toAddress);

		const asset = await this.prisma.assets.findUnique({
			where: {
        ledgerId_symbol: {
					ledgerId: job.data.ledgerId,
					symbol: job.data.asset
				}
			},
			select: {
        contract: true
      }
		})
		const tokenAddress = asset.contract;
		this.logger.debug(tokenAddress);

		const tx = await this.eth.transfer(fromAddress, toAddress, tokenAddress, job.data.value);
		this.logger.debug(tx);

		const transaction = await this.prisma.transactions.create({
			data: {
        hash: tx.hash,
				ledgerId: job.data.ledgerId,
			}
		});
		this.logger.debug(transaction);

		const posting = await this.prisma.postings.update({
			where: {
        id: job.data.id
			},
			data: {
        txId: transaction.id
      }
		});
		this.logger.debug(posting);

    this.logger.debug('Transaction completed');
  }

	public async accountAddress(name: string, ledgerId: string): Promise<string> {
		
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
      return null;
    }

    return account.address;
  }
}