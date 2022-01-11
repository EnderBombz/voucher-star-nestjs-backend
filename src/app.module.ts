import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { BadgeModule } from './badge/badge.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://VoucherRed:${process.env.DATABASE_PASS}@starcluster.alup8.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    ),
    UserModule,
    AccountModule,
    BadgeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
