import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { BadgeModule } from './badge/badge.module';

@Module({
  imports: [UserModule, AccountModule, BadgeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
