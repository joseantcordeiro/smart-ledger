import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TRANSACTIONS_PACKAGE_NAME, TRANSACTIONS_SERVICE_NAME } from './transactions.pb';
import { TransactionsController } from './transactions.controller';

@Module({
	imports: [
		ClientsModule.register([
      {
        name: TRANSACTIONS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50055',
          package: TRANSACTIONS_PACKAGE_NAME,
          protoPath: 'node_modules/smart-ledger-proto/proto/transactions.proto',
        },
      },
    ]),
	],
  controllers: [TransactionsController],
})
export class TransactionsModule {}