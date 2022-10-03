import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { AccountsModule } from './accounts/accounts.module';
import { LedgersModule } from './ledgers/ledgers.module';

@Module({
  imports: [TenantsModule, LedgersModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
