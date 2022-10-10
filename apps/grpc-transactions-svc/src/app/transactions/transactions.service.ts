import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@ledger/prisma";
import { CreateBatchRequestDto } from './transactions.dto';
import { CreateBatchResponse } from './transactions.pb';

@Injectable()
export class TransactionsService {
	constructor(private prisma: PrismaService) {}

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
      return { data: null, error: ['Batch not created'], status: HttpStatus.NOT_FOUND };
    }

		for (let i = 0; i < postings.length; i++) {
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
	 
			// printing element
			console.log("key : ",i, "value : ",JSON.stringify(posting));
		};

    return { data: batch, error: null, status: HttpStatus.CREATED };
		
	}

}