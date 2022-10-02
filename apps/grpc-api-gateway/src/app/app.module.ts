import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [TenantsModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
