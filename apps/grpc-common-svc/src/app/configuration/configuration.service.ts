import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';

@Injectable()
export class ConfigurationService {
	constructor(private prisma: PrismaService) {}

	public async tenantDefaultConfiguration({ id }: DefaultConfigurationRequestDto): Promise<DefaultConfigurationResponse> {
		const metadata = await this.prisma.configuration.createMany({
			data: [
				{ targetId: id, key: 'LANGUAGUE', value: 'EN' },
				{ targetId: id, key: 'DEFAULT_LANGUAGUE', value: 'EN' },
			],
			skipDuplicates: true,
		})

    if (!metadata) {
      return { data: null, error: ['Default tenant configuration not created'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.CREATED };
  }

}