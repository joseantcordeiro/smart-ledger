import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@ledger/prisma";
import { FindLedgerRequestDto, CreateLedgerRequestDto } from './ledgers.dto';
import { FindLedgerResponse, CreateLedgerResponse } from './ledgers.pb';

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
				volumeIn: true,
				volumeOut: true,
			},
		})

    if (!ledger) {
      return { data: null, error: ['Ledger not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: ledger, error: null, status: HttpStatus.OK };
  }

	public async createLedger({ name, identifier, timezone, country }: CreateLedgerRequestDto): Promise<CreateLedgerResponse> {
		const tenant = await this.prisma.ledgers.create({
			data: { name: name, identifier: identifier, timezone_id: timezone, country_code: country }
		})

    if (!tenant) {
      return { data: null, error: ['Tenant not created'], status: HttpStatus.NOT_FOUND };
    }

		const data = await this.prisma.ledgers.findUnique({
			where: {
				id: tenant.id,
			},
			select: {
				id: true,
				name: true,
				identifier: true,
				country: {
					select: {
						code: true,
						name: true,
					},
				},
				timezone: {
					select: {
						value: true,
						text: true,
					},
				},
			},
		})

    return { data: data, error: null, status: HttpStatus.OK };
  }

}