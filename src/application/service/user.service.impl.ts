import { IUserService } from './user.service';
import { UserReqDto } from 'src/interfaces/dto/userReq.dto';
import { UserDto } from 'src/interfaces/dto/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/infrastructure/repositories/user.repository.interface';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(values: UserReqDto): Promise<UserDto> {
    const data = await this.userRepository.create(values);

    return new UserDto(data);
  }

  async findUser(userId: number): Promise<UserDto> {
    const data = await this.userRepository.findOne(userId);

    return new UserDto(data);
  }
}
