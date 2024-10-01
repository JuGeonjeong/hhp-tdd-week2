import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/database/user.model';
import { UserReqDto } from './userReq.dto';
import { IUserService } from 'src/application/service/user.sevice';

@Controller('/user')
export class UserController {
  constructor(
    @Inject('UserServiceImpl') private readonly userService: IUserService,
  ) {}

  @Post('')
  async create(@Body(ValidationPipe) userReqDto: UserReqDto): Promise<User> {
    const data = this.userService.createUser(userReqDto);
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<User> {
    const userId = Number.parseInt(id);
    const data = this.userService.findUser(userId);
    return data;
  }
}
