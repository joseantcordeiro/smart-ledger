import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "@ledger/prisma";
import {
	FindLedgerRequestDto,
	CreateLedgerRequestDto,
	GetConfigurationRequestDto,
	GetConfigurationsRequestDto,
	CreateConfigurationRequestDto
} from './ledgers.dto';
import {
	FindLedgerResponse,
	CreateLedgerResponse,
	GetConfigurationResponse,
	GetConfigurationsResponse,
	CreateConfigurationResponse
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
				volumeIn: true,
				volumeOut: true,
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
      return { data: null, error: ['Tenant not created'], status: HttpStatus.NOT_FOUND };
    }

    return { data: ledger, error: null, status: HttpStatus.CREATED };
  }

	public async getConfiguration(request: GetConfigurationRequestDto): Promise<GetConfigurationResponse> {
		
		const config = await this.prisma.configs.findUnique({
			where: {
				ledger_key: {
					ledger: request.id,
					key: request.key,
				},
			},
			select: {
				ledger: true,
				key: true,
				value: true,
			},
		})

    if (!config) {
      return { data: null, error: ['Configuration not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: config, error: null, status: HttpStatus.OK };
  }

	public async getConfigurations(request: GetConfigurationsRequestDto): Promise<GetConfigurationsResponse> {
		
		const config = await this.prisma.configs.findMany({
			where: {
				ledger: request.id,
			},
			select: {
				ledger: true,
				key: true,
				value: true,
			},
		})

    if (!config) {
      return { data: null, error: ['Configurations not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: config, error: null, status: HttpStatus.OK };
  }

	public async createConfiguration(request: CreateConfigurationRequestDto): Promise<CreateConfigurationResponse> {
		const config = await this.prisma.configs.create({
			data: { ledger: request.id, key: request.key, value: request.value }
		})

    if (!config) {
      return { data: null, error: ['Configuration not created'], status: HttpStatus.NOT_FOUND };
    }

    return { data: config, error: null, status: HttpStatus.CREATED };
  }

}