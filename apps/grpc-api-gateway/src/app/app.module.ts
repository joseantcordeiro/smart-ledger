import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { AccountsModule } from './accounts/accounts.module';
import { LedgersModule } from './ledgers/ledgers.module';
import { CommonModule } from './common.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from '@ledger/auth';

@Module({
  imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TenantsModule,
		LedgersModule,
		AccountsModule,
		CommonModule,
		TransactionsModule,
		AuthModule.fromEnv(),
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
