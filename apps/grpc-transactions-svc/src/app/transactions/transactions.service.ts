import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@ledger/prisma";
import { Prisma } from "@prisma/client";
import { CreateBatchRequestDto } from './transactions.dto';
import { CreateBatchResponse } from './transactions.pb';

@Injectable()
export class TransactionsService {
	constructor(private prisma: PrismaService) {}

	public async createBatch({ ledgerId, postings }: CreateBatchRequestDto): Promise<CreateBatchResponse> {
		
		const json = postings as Prisma.JsonArray;

		const batch = await this.prisma.batches.create({
			data: { postings: json, ledgerId: ledgerId },
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