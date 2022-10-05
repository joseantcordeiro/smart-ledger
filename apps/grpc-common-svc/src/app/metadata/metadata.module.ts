import { Module } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';

@Module({
  controllers: [MetadataController],
  providers: [PrismaService, MetadataService],
})
export class MetadataModule {}