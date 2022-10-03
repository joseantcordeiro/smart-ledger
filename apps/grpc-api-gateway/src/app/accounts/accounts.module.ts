import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ACCOUNTS_PACKAGE_NAME, ACCOUNTS_SERVICE_NAME } from './accounts.pb';
import { AccountsController } from './accounts.controller';

@Module({
	imports: [
		ClientsModule.register([
      {
        name: ACCOUNTS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: ACCOUNTS_PACKAGE_NAME,
          protoPath: 'node_modules/smart-ledger-proto/proto/accounts.proto',
        },
      },
    ]),
	],
  controllers: [AccountsController],
})
export class AccountsModule {}
