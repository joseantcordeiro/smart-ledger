import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@ledger/prisma";
import { CreateBatchRequestDto } from './transactions.dto';
import { CreateBatchResponse, Posting } from './transactions.pb';

@Injectable()
export class TransactionsService {
	constructor(private prisma: PrismaService) {}

	public async createBatch(ledgerId: string, postings: Posting[]): Promise<CreateBatchResponse> {
		
		const batch = await this.prisma.batches.create({
			data: { postings: postings, ledgerId: ledgerId },
			select: {
				id: true,
        postings: true,
				status: true
			}
		})

		if (!batch) {
      return { data: null, error: ['Batch not created'], status: HttpStatus.NOT_FOUND };
    }

    return { data: batch, error: null, status: HttpStatus.CREATED };
		
	}

}