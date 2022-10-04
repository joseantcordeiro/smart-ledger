import { Module } from '@nestjs/common';
import { PrismaService } from '@ledger/prisma';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  controllers: [TenantsController],
  providers: [PrismaService, TenantsService],
})
export class TenantsModule {}