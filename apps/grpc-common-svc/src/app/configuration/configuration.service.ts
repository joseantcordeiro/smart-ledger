import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import {
	CreateConfigurationRequestDto,
	DefaultConfigurationRequestDto
} from './configuration.dto';
import {
	CreateConfigurationResponse,
	DefaultConfigurationResponse,
	FindConfigurationsResponse
} from '../common.pb';

@Injectable()
export class ConfigurationService {
	constructor(private prisma: PrismaService) {}

	public async tenantDefaultConfiguration({ id }: DefaultConfigurationRequestDto): Promise<DefaultConfigurationResponse> {
		const configuration = await this.prisma.configuration.createMany({
			data: [
				{ targetId: id, key: 'LANGUAGUE', value: 'EN' },
				{ targetId: id, key: 'DEFAULT_LANGUAGUE', value: 'EN' },
			],
			skipDuplicates: true,
		})

    if (!configuration) {
      return { data: null, error: ['Default tenant configuration not created'], status: HttpStatus.NOT_FOUND };
    }

    return { data: configuration, error: null, status: HttpStatus.CREATED };
  }

	public async findConfiguration({ name, searchString, take, skip, orderBy }: FindMetadataRequestDto): Promise<FindConfigurationsResponse> {
		const or = searchString ? {
      OR: [
        { key: { contains: searchString } },
        { value: { contains: searchString } },
      ],
    } : {};

		const metadata = await this.prisma.metadata.findMany({
			where: {
        targetId: name,
        ...or
      },
			select: {
				key: true,
				value: true
			},
			take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      //orderBy: {
			//	key: orderBy,
			//}
		});

    if (!metadata) {
      return { data: null, error: ['Configuration not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.OK };
  }

	public async createConfiguration({ name, key, value }: CreateConfigurationRequestDto): Promise<CreateConfigurationResponse> {
		const metadata = await this.prisma.metadata.create({
			data: { targetId: name, key: key, value: value }
		})

    if (!metadata) {
      return { data: null, error: ['Configuration not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.CREATED };
  }

}