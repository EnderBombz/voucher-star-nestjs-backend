import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//@UseGuards(JwtAuthGuard) <-- Realiza a autenticação do usuário

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
