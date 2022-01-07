import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';

@Module({
  imports: [BadgeService],
  controllers: [BadgeController],
  providers: [BadgeService],
})
export class BadgeModule {}
