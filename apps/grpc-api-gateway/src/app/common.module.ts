import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { COMMON_PACKAGE_NAME, COMMON_SERVICE_NAME } from './common.pb';
import { MetadataController } from './metadata/metadata.controller';
import { ConfigurationController } from './configuration/configuration.controller';

@Module({
	imports: [
		ClientsModule.register([
      {
        name: COMMON_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50054',
          package: COMMON_PACKAGE_NAME,
          protoPath: 'node_modules/smart-ledger-proto/proto/common.proto',
        },
      },
    ]),
	],
  controllers: [MetadataController, ConfigurationController],
})
export class CommonModule {}