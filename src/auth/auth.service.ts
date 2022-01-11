import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async validateUser(accountEmail: string, accountPassword: string) {
    const account = await this.accountService.findOneByEmail(accountEmail);
    const accountPass = account[0].password;
    const isMatch = await this.accountService.passIsMatch(
      accountPass,
      accountPassword,
    );

    if (account && isMatch) {
      const { _id, username, email } = account;
      return { id: _id, username, email };
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
