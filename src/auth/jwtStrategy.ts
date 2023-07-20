import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtContants } from './jwtconstants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrkey: 'secret-key',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.name };
  }
}
