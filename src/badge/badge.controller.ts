import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { BadgeService } from './badge.service';

@Controller('badge')
export class BadgeController {
  constructor(private badgeService: BadgeService) {}

  @Post('check/:id')
  async check(@Param('id') id) {
    return this.badgeService.checkUser(id);
  }

  @Post('send-vouchers-id')
  async sendVouchers(@Body() body) {
    return this.badgeService.sendVouchersById(body);
  }

  @Post('generate-badge')
  async generateBadge(@Body() body: Promise<any>) {
    return this.badgeService.generateBadge(body);
  }

  @Put('update-vouchers-id')
  async updateBouchers(@Body() body: Promise<any>) {
    return this.badgeService.updateVouchersById(body);
  }
}
