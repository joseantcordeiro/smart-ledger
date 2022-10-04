import { Module } from '@nestjs/common';
import { LedgersModule } from './ledgers/ledgers.module';

@Module({
  imports: [LedgersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
