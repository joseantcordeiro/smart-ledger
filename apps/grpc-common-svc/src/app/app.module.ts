import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [ConfigurationModule, MetadataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
