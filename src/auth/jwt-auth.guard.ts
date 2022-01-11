import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//@UseGuards(JwtAuthGuard) <-- Verifica se a Token é válida, antes passar para requisição

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
