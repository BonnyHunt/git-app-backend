import { HttpException, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { users } from 'src/database/usersDb';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { Project, User } from 'src/users/entities/user.entity';
import { LoginAuthDto } from '../dtos/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  private projects: Project[] = [];
  private users: User[] = users;
  private counterId = users.length - 1;

  async register(BodyUser: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const { password } = BodyUser;
    const plainToHash = await hash(password, 10);
    const newUser = {
      id: this.counterId,
      ...BodyUser,
      password: plainToHash,
      projects: this.projects,
    };
    this.users.push(newUser);
    return newUser;
  }

  async login(BodyUser: LoginAuthDto) {
    const { username, password } = BodyUser;
    const findUser = this.users.find((item) => item.username === username);
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 403);

    const checkPassword = await compare(password, findUser.password);

    if (!checkPassword) throw new HttpException('PASSWORD_INVALID', 403);

    const payload = { id: findUser.id, name: findUser.username };
    const token = this.jwtService.sign(payload);

    const data = {
      user: findUser,
      token,
    };

    return data;
  }
}
