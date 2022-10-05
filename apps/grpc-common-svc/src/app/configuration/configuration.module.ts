import { Module } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';

@Module({
  controllers: [ConfigurationController],
  providers: [PrismaService, ConfigurationService],
})
export class ConfigurationModule {}