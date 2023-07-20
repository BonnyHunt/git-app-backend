import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  //@UseGuards(JwtAuthGuard)
  @Post('register')
  register(@Body() BodyUser: CreateUserDto) {
    return this.authService.register(BodyUser);
  }

  //@UseGuards(JwtAuthGuard)
  @Post('login')
  login(@Body() BodyUser: LoginAuthDto) {
    return this.authService.login(BodyUser);
  }
}
