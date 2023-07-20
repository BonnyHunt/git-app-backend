import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './jwtconstants';
import { JwtStrategy } from './jwtStrategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtContants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
