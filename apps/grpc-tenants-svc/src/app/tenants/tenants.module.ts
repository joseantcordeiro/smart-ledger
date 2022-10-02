import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  controllers: [TenantsController],
  providers: [PrismaService, TenantsService],
})
export class TenantsModule {}