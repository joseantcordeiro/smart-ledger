import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import {
	CreateMetadataRequestDto,
	FindMetadataRequestDto,
	FindMetadatasRequestDto
} from './metadata.dto';
import {
	CreateMetadataResponse,
	FindMetadataResponse,
	FindMetadatasResponse
} from '../common.pb';

@Injectable()
export class MetadataService {
	constructor(private prisma: PrismaService) {}

	public async findOneMetadata({ targetId, key }: FindMetadataRequestDto): Promise<FindMetadataResponse> {

		const metadata = await this.prisma.metadata.findUnique({
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

    if (!metadata) {
      return { data: null, error: ['Configuration not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.OK };
  }

	public async findManyMetadata({ targetId, searchString, take, skip, orderBy }: FindMetadatasRequestDto): Promise<FindMetadatasResponse> {
		const or = searchString ? {
      OR: [
        { key: { contains: searchString } },
        { value: { contains: searchString } },
      ],
    } : {};

		const metadata = await this.prisma.metadata.findMany({
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

    if (!metadata) {
      return { data: null, error: ['Metadata not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.OK };
  }

	public async createMetadata({ targetId, key, value }: CreateMetadataRequestDto): Promise<CreateMetadataResponse> {
		const metadata = await this.prisma.metadata.create({
			data: { targetId: targetId, key: key, value: value }
		})

    if (!metadata) {
      return { data: null, error: ['Metadata not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: metadata, error: null, status: HttpStatus.CREATED };
  }

}