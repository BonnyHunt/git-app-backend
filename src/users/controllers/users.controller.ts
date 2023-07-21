import {
  Controller,
  Query,
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

  @Get(':id/repos')
  findRepositories(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.findRepositories(id, page, per_page);
  }

  @Get(':id/:name')
  findRepository(
    @Param('id', ParseIntPipe) id: number,
    @Param('name') name: string,
  ) {
    return this.usersService.findRepository(id, name);
  }

  @Get(':id/:name/commits')
  findCommits(
    @Query('page') page?: number,
    @Query('per_page') per_page?: number,
    @Param('id', ParseIntPipe) id?: number,
    @Param('name') name?: string,
  ) {
    return this.usersService.findCommits(id, name, page, per_page);
  }

  @Post()
  createUser(@Body() paiload: CreateUserDto) {
    return this.usersService.create(paiload);
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
