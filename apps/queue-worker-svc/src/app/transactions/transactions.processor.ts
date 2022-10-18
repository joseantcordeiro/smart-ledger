import { EthService } from '@ledger/eth';
import { PrismaService } from '@ledger/prisma';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';

@Processor('transactions')
export class TransactionsProcessor {
	constructor(
		private prisma: PrismaService,
		private readonly eth: EthService,
		@InjectQueue('transactions') private transactionsQueue: Queue,
	) {}
  private readonly logger = new Logger(TransactionsProcessor.name);

	@Process('batch')
  async handleBatch(job: Job) {
    this.logger.debug('Start batch...');

		await this.prisma.batches.update({
			where: {
        id: job.data.id
			},
			data: {
        status: 'PROCESSING'
      }
		});

		const postings = await this.prisma.postings.findMany({
			where: {
        batchId: job.data.id,
			}
		});
		
		if (postings.length != job.data.counter) {
			this.logger.debug(postings);
			throw new Error('Batch lenght inconsistent');
		}

		for (let i = 0; i < postings.length; i++) {
			this.logger.debug('Start transaction...');
			const fromAddress = await this.accountAddress(postings[i].source, postings[i].ledgerId);
			this.logger.debug(fromAddress);
			const toAddress = await this.accountAddress(postings[i].destination, postings[i].ledgerId);
			this.logger.debug(toAddress);

			const asset = await this.prisma.assets.findUnique({
				where: {
					ledgerId_symbol: {
						ledgerId: postings[i].ledgerId,
						symbol: postings[i].asset
					}
				},
				select: {
					contract: true
				}
			});
			const tokenAddress = asset.contract;
			this.logger.debug(tokenAddress);

			const tx = await this.eth.transaction(fromAddress, toAddress, tokenAddress, postings[i].value, postings[i].type);
			this.logger.debug(tx);

			const transaction = await this.prisma.transactions.create({
				data: {
					hash: tx.hash,
					status: tx.status,
					ledgerId: postings[i].ledgerId,
				}
			});
			this.logger.debug(transaction);

			await this.prisma.postings.update({
				where: {
					id: postings[i].id
				},
				data: {
					txId: transaction.id
				}
			});

			// await this.transactionsQueue.add('transaction', transaction);

			this.logger.debug('Transaction completed');
		};

		await this.prisma.batches.update({
			where: {
        id: job.data.id
			},
			data: {
        status: 'FINISHED'
      }
		});
		this.logger.debug('Batch completed');
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