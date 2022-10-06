import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@ledger/prisma";
import {
	FindLedgerRequestDto,
	CreateLedgerRequestDto,
} from './ledgers.dto';
import {
	FindLedgerResponse,
	CreateLedgerResponse,
} from './ledgers.pb';

@Injectable()
export class LedgersService {
	constructor(private prisma: PrismaService) {}

	public async findOne({ id }: FindLedgerRequestDto): Promise<FindLedgerResponse> {
		
		const ledger = await this.prisma.ledgers.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				name: true,
			},
		})

    if (!ledger) {
      return { data: null, error: ['Ledger not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: ledger, error: null, status: HttpStatus.OK };
  }

	public async createLedger({ tenantId, name }: CreateLedgerRequestDto): Promise<CreateLedgerResponse> {
		const ledger = await this.prisma.ledgers.create({
			data: {
				name: name,
				tenant: {
					connect: { id: tenantId },
				},
			}
		})

    if (!ledger) {
      return { data: null, error: ['Ledger not created'], status: HttpStatus.NOT_FOUND };
    }

		const count = await this.ledgerDefaultConfiguration(ledger.id);
		if (count < 1) {
      return { data: ledger, error: ['Default tenant configuration not created'], status: HttpStatus.CREATED };
    }

    return { data: ledger, error: null, status: HttpStatus.CREATED };
  }

	public async ledgerDefaultConfiguration(targetId: string): Promise<number> {
		const count = await this.prisma.configuration.createMany({
			data: [
				{ targetId: targetId, key: 'LANGUAGUE', value: 'EN' },
				{ targetId: targetId, key: 'DEFAULT_FEE', value: '0.05' },
			],
			skipDuplicates: true,
		})

    return count.count;
  }


}