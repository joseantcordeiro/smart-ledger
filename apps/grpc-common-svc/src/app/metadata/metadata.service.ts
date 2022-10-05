import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';

@Injectable()
export class MetadataService {
	constructor(private prisma: PrismaService) {}

}