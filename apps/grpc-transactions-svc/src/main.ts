import tracer from './app/tracer';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { protobufPackage } from './app/transactions/transactions.pb';

async function bootstrap() {
	await tracer.start();
	
  const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50055',
      package: protobufPackage,
      protoPath: join('node_modules/smart-ledger-proto/proto/transactions.proto'),
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();
