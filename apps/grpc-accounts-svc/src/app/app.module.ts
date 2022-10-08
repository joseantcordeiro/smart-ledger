import { Module } from '@nestjs/common';
import { Web3Module } from 'nest-web3';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
		Web3Module.forRoot({
			name: 'eth',
			url: 'http://joseantcordeiro.hopto.org:8545',
		}),
		AccountsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
