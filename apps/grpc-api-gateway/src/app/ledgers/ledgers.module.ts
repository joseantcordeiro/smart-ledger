import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LEDGERS_PACKAGE_NAME, LEDGERS_SERVICE_NAME } from './ledgers.pb';
import { LedgersController } from './ledgers.controller';

@Module({
	imports: [
		ClientsModule.register([
      {
        name: LEDGERS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: LEDGERS_PACKAGE_NAME,
          protoPath: 'node_modules/smart-ledger-proto/proto/ledgers.proto',
        },
      },
    ]),
	],
  controllers: [LedgersController],
})
export class LedgersModule {}