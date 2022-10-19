/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import tracer from './app/tracer';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import supertokens from 'supertokens-node';
import { SupertokensExceptionFilter } from '@ledger/auth';

import { AppModule } from './app/app.module';

async function bootstrap() {
	await tracer.start();

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

	const configService = app.get(ConfigService);
  app.enableCors({
    origin: [configService.get('AUTH_WEBSITE_DOMAIN')],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

	app.useGlobalFilters(new SupertokensExceptionFilter());

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
