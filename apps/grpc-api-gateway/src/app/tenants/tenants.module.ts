import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TENANTS_PACKAGE_NAME, TENANTS_SERVICE_NAME } from './tenants.pb';
import { TenantsController } from './tenants.controller';

@Module({
	imports: [
		ClientsModule.register([
      {
        name: TENANTS_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: TENANTS_PACKAGE_NAME,
          protoPath: 'node_modules/smart-ledger-proto/proto/tenants.proto',
        },
      },
    ]),
	],
  controllers: [TenantsController],
})
export class TenantsModule {}