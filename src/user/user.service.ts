import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }
  async findOneById(id) {
    return this.userModel.find({ _id: id }).exec();
  }
  async findOneByName(name) {
    return this.userModel.find({ userName: name }).exec();
  }
  async findOneByRegistration(reg) {
    return this.userModel.find({ registration: reg }).exec();
  }
  async postUser(body) {
    try {
      const { userName, outsourced, area } = body;
      const userData = new this.userModel({
        userName,
        outsourced,
        area,
      });
      await userData.save();
      return { message: 'success', status: 201, method: 'POST' };
    } catch (err) {
      console.debug(err);
    }
  }
  async updateById(id, body) {
    try {
      const { userName, outsourced, area } = body;

      const currentData = await this.userModel.findOne({ _id: id }).exec();

      if (!currentData) {
        return { message: 'User not found.' };
      }

      this.userModel.updateOne(
        { _id: id },
        {
          $set: {
            userName,
            outsourced,
            area,
          },
        },
      );

      return { message: 'success', status: 201, method: 'PUT' };
    } catch (err) {
      console.debug(err);
    }
  }
  async updateByName(name, body) {
    try {
      const { userName, outsourced, area } = body;

      const currentData = await this.userModel
        .findOne({ userName: name })
        .exec();

      if (!currentData) {
        return { message: 'User not found.' };
      }

      this.userModel.updateOne(
        { userName: name },
        {
          $set: {
            userName,
            outsourced,
            area,
          },
        },
      );

      return { message: 'success', status: 201, method: 'PUT' };
    } catch (err) {
      console.debug(err);
    }
  }
  async updateByRegistration(reg, body) {
    try {
      const { userName, outsourced, area } = body;

      const currentData = await this.userModel
        .findOne({ registration: reg })
        .exec();

      if (!currentData) {
        return { message: 'User not found.' };
      }

      this.userModel.updateOne(
        { registration: reg },
        {
          $set: {
            userName,
            outsourced,
            area,
          },
        },
      );

      return { message: 'success', status: 201, method: 'PUT' };
    } catch (err) {
      console.debug(err);
    }
  }
  async updateVouchersById(id: string, voucherList: []) {
    const data = await this.userModel.updateOne(
      { _id: id },
      {
        $set: {
          vouchers: voucherList,
        },
      },
    );
    return data;
  }
  async updateVouchersByName(name: string, voucherList: []) {
    const data = await this.userModel.updateOne(
      { userName: name },
      {
        $set: {
          vouchers: voucherList,
        },
      },
    );
    return data;
  }
  async updateVouchersByRegistration(reg: string, voucherList: []) {
    const data = await this.userModel.updateOne(
      { registration: reg },
      {
        $set: {
          vouchers: voucherList,
        },
      },
    );
    return data;
  }
  async deleteById(id) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
  async deleteByName(name) {
    return this.userModel.deleteOne({ userName: name }).exec();
  }
  async deleteByRegistration(reg) {
    return this.userModel.deleteOne({ registration: reg }).exec();
  }
}
