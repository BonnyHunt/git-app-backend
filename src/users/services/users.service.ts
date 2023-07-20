import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { repos, users } from 'src/database/usersDb';
import { findRepos } from 'src/utils/utils';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = users;
  private repos: object[] = repos;

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, changes: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  findProjects(id: number, page: number, perPage: number) {
    const user = this.findOne(id);

    if (!user) {
      throw new NotFoundException(`Project #${name} not found`);
    }
    try {
      const response = findRepos(user, page, perPage);
      return response;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
