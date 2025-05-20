import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_MESSAGES } from '@common/messages/auth-messages';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error(AUTH_MESSAGES.JWT_SECRET_KEY_ERROR);
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    // JWT 페이로드에서 필요한 정보만 리턴 (req.user로 들어감)
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
