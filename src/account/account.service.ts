import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from 'src/schemas/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<Account>,
  ) {}

  async findAll() {
    return this.accountModel.find().exec();
  }
  async findOneById(id) {
    return this.accountModel.findById(id).exec();
  }
  async findOneByName(name) {
    return this.accountModel.find({ userName: name }).exec();
  }
  async findOneByResistration(reg) {
    return this.accountModel.find({ registration: reg }).exec();
  }
  async postAccount(body) {
    return {};
  }
  async updateById(id, body) {
    return {};
  }
  async updateByName(name, body) {
    return {};
  }
  async updateByRegistration(reg, body) {
    return {};
  }
  async deleteById(id) {
    this.accountModel.findByIdAndDelete(id);
    return {};
  }
  async deleteByName(name) {
    this.accountModel.deleteOne({ userName: name });
    return {};
  }
  async deleteByRegistration(reg) {
    this.accountModel.deleteOne({ registration: reg });
    return {};
  }
}
