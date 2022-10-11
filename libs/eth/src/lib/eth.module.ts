import { Module } from '@nestjs/common';
import { Web3Module } from 'nest-web3';
import { EthService } from './eth.service';

@Module({
	imports: [
		Web3Module.forRoot({
			name: 'eth',
			url: 'http://joseantcordeiro.hopto.org:8545',
		})
	],
  controllers: [],
  providers: [EthService],
  exports: [EthService],
})
export class EthModule {}
