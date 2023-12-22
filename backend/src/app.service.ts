import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req) {
    if (!req.user) {
      return {
        userExists: false,
        allowed: false,
      };
    }
    if (req.user.email === 'patricio.julia1@gmail.com') {
      return {
        allowed: true,
        userExists: true,
      };
    }
    return {
      allowed: false,
      userExists: true,
    };
  }
}
