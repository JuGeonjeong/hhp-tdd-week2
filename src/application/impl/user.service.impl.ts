import { IUserService } from '../service/user.service';
import { UserReqDto } from 'src/interface/dto/res/userReq.dto';
import { UserDto } from 'src/interface/dto/res/user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/infrastructure/interfaces/user.repository.interface';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(values: UserReqDto): Promise<UserDto> {
    return await this.userRepository.create(values);
  }

  async findUser(userId: number): Promise<UserDto> {
    return await this.userRepository.findOne(userId);
  }
}
