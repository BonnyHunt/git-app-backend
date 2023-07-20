import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger/dist';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { CreateProjectDto } from '../dtos/project.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/:repo/commits')
  findProyect(
    @Param('id', ParseIntPipe) id: number,
    @Param('repo') name: string,
  ) {
    return this.usersService.findCommits(id, name);
  }

  @Post()
  createUser(@Body() paiload: CreateUserDto) {
    return this.usersService.create(paiload);
  }

  @Post(':id')
  createProyect(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateProjectDto,
  ) {
    return this.usersService.createProject(id, payload);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
