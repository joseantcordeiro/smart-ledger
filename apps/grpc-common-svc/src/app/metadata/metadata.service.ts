import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';

@Injectable()
export class MetadataService {
	constructor(private prisma: PrismaService) {}

	public async findMetadata({ name, searchString, take, skip, orderBy }: FindMetadataRequestDto): Promise<FindMetadataResponse> {
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
      return { data: null, error: ['Metadata not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.OK };
  }

	public async createMetadata({ name, key, value }: CreateMetadataRequestDto): Promise<CreateMetadataResponse> {
		const metadata = await this.prisma.metadata.create({
			data: { targetId: name, key: key, value: value }
		})

    if (!metadata) {
      return { data: null, error: ['Metadata not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.CREATED };
  }

}