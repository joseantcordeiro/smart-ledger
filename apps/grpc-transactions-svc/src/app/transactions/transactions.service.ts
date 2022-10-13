import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@ledger/prisma";
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { CreateBatchRequestDto } from './transactions.dto';
import { CreateBatchResponse } from './transactions.pb';

@Injectable()
export class TransactionsService {
	constructor(
		private prisma: PrismaService,
		@InjectQueue('transactions') private transactionsQueue: Queue,
	) {}

	public async createBatch({ ledgerId, postings }: CreateBatchRequestDto): Promise<CreateBatchResponse> {

		const batch = await this.prisma.batches.create({
			data: { ledgerId: ledgerId },
			select: {
				id: true,
				status: true,
				ledgerId: true
			}
		})

		if (!batch) {
      return { data: null, error: ['Batch not created'], status: HttpStatus.NOT_MODIFIED };
    }

		let counter = 0;
		for (let i = 0; i < postings.length; i++) {
			// TODO check if account exists and is active
			const posting = await this.prisma.postings.create({
				data: {
					source: postings[i].source,
					destination: postings[i].destination,
					asset: postings[i].asset,
					value: postings[i].value,
					batchId: batch.id,
					ledgerId: batch.ledgerId
				}
			});

			counter++;
		
			const job = await this.transactionsQueue.add('posting', posting);
	 
			// printing element
			console.log("key : ", i, "counter : ", counter, "value : ", JSON.stringify(posting));
			console.log("Job: ", JSON.stringify(job));
		};

		const updateBatch = await this.prisma.batches.update({
			where: {
				id: batch.id,
			},
			data: {
				counter: counter
			},
			select: {
				id: true,
        status: true,
				counter: true
			}
		})

    return { data: updateBatch, error: null, status: HttpStatus.CREATED };
	}

}