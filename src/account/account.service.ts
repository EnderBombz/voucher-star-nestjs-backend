import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from 'src/schemas/account.schema';
import * as bcrypt from 'bcrypt';

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
  async findOneByEmail(email: string): Promise<any> {
    return await this.accountModel.find({ email }).exec();
  }
  async passIsMatch(hashedPassword: string, password: string) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  }
  async postAccount(body) {
    const rounds = 10;
    const { email, password, username } = body;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);
    const userData = new this.accountModel({
      email,
      username,
      password: hash,
    });

    return { message: 'success' };
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
