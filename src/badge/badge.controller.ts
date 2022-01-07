import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { BadgeService } from './badge.service';

@Controller('badge')
export class BadgeController {
  constructor(private badgeService: BadgeService) {}

  @Post('check/:id')
  async check(@Param('id') id) {
    return this.badgeService.checkUser(id);
  }

  @Post('generate-badge')
  async generateBadge(@Body() body: Promise<any>) {
    return this.badgeService.generateBadge(body);
  }
}
