import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import {
	CreateConfigurationRequestDto,
	DefaultConfigurationRequestDto,
	FindConfigurationRequestDto,
	FindConfigurationsRequestDto
} from './configuration.dto';
import {
	CreateConfigurationResponse,
	DefaultConfigurationResponse,
	FindConfigurationResponse,
	FindConfigurationsResponse
} from '../common.pb';

@Injectable()
export class ConfigurationService {
	constructor(private prisma: PrismaService) {}

	public async tenantDefaultConfiguration({ targetId }: DefaultConfigurationRequestDto): Promise<DefaultConfigurationResponse> {
		const count = await this.prisma.configuration.createMany({
			data: [
				{ targetId: targetId, key: 'LANGUAGUE', value: 'EN' },
				{ targetId: targetId, key: 'DEFAULT_FEE', value: '0.05' },
			],
			skipDuplicates: true,
		})

    if (count.count < 1) {
      return { data: null, error: ['Default tenant configuration not created'], status: HttpStatus.NOT_FOUND };
    }

    return { data: count, error: null, status: HttpStatus.CREATED };
  }

	public async ledgerDefaultConfiguration({ targetId }: DefaultConfigurationRequestDto): Promise<DefaultConfigurationResponse> {
		const count = await this.prisma.configuration.createMany({
			data: [
				{ targetId: targetId, key: 'DEFAULT_LANGUAGUE', value: 'EN' },
				{ targetId: targetId, key: 'DEFAULT_FEE', value: '0.05' },
			],
			skipDuplicates: true,
		})

    if (count.count < 1) {
      return { data: null, error: ['Default ledger configuration not created'], status: HttpStatus.NOT_FOUND };
    }

    return { data: count, error: null, status: HttpStatus.CREATED };
  }

	public async findOneConfiguration({ targetId, key }: FindConfigurationRequestDto): Promise<FindConfigurationResponse> {

		const configuration = await this.prisma.configuration.findUnique({
			where: {
        targetId_key: {
					targetId: targetId,
					key: key
				},
      },
			select: {
				targetId: true,
				key: true,
				value: true
			}
		});

    if (!configuration) {
      return { data: null, error: ['Configuration not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: configuration, error: null, status: HttpStatus.OK };
  }

	public async findManyConfiguration({ targetId, searchString, take, skip, orderBy }: FindConfigurationsRequestDto): Promise<FindConfigurationsResponse> {
		const or = searchString ? {
      OR: [
        { key: { contains: searchString } },
        { value: { contains: searchString } },
      ],
    } : {};

		const configurations = await this.prisma.configuration.findMany({
			where: {
        targetId: targetId,
        ...or
      },
			select: {
				targetId: true,
				key: true,
				value: true
			},
			take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      //orderBy: {
			//	key: orderBy,
			//}
		});

    if (!configurations) {
      return { data: null, error: ['Configuration not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: configurations, error: null, status: HttpStatus.OK };
  }

	public async createConfiguration({ targetId, key, value }: CreateConfigurationRequestDto): Promise<CreateConfigurationResponse> {
		const configuration = await this.prisma.configuration.create({
			data: { targetId: targetId, key: key, value: value }
		})

    if (!configuration) {
      return { data: null, error: ['Configuration not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: configuration, error: null, status: HttpStatus.CREATED };
  }

}