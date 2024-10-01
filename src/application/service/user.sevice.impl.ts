import { IUserService } from './user.sevice';
import { UserReqDto } from 'src/interfaces/user/userReq.dto';
import { UserDto } from 'src/interfaces/common/user.dto';
import { IUserRepository } from 'src/infrastructure/user.repository.interface';

export class UserServiceImpl implements IUserService {
  constructor(private readonly userRepo: IUserRepository) {}

  createUser(_values: UserReqDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  findUser(_id: number): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
}
