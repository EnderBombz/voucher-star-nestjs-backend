import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, HttpModule],
  controllers: [BadgeController],
  providers: [BadgeService],
})
export class BadgeModule {}
