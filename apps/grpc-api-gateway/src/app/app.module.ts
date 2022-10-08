import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { AccountsModule } from './accounts/accounts.module';
import { LedgersModule } from './ledgers/ledgers.module';
import { CommonModule } from './common.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [TenantsModule, LedgersModule, AccountsModule, CommonModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
