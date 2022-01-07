import { Controller, Post, Get, Body } from '@nestjs/common';
import { BadgeService } from './badge.service';

@Controller('badge')
export class BadgeController {
  constructor(private badgeService: BadgeService) {}

  @Post('check')
  async check(@Body() body: Promise<any>) {
    return this.badgeService.check();
  }
}
