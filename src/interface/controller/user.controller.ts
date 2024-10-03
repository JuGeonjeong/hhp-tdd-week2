import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { IUserService } from 'src/application/service/user.service';
import { UserReqDto } from '../dto/res/userReq.dto';
import { User } from 'src/domain/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}

  @Post('')
  async create(@Body(ValidationPipe) userReqDto: UserReqDto): Promise<User> {
    return await this.userService.createUser(userReqDto);
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<User> {
    const userId = Number.parseInt(id);
    return await this.userService.findUser(userId);
  }
}
