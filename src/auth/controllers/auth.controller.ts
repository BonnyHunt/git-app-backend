import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  register(@Body() BodyUser: CreateUserDto) {
    return this.authService.register(BodyUser);
  }

  @Post('login')
  login(@Body() BodyUser: LoginAuthDto) {
    return this.authService.login(BodyUser);
  }
}
