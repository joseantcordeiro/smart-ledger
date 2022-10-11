import { Module } from '@nestjs/common';
// import { Web3Module } from 'nest-web3';
import { EthModule } from '@ledger/eth';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
		EthModule,
		AccountsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
