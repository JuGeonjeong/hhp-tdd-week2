import { UserReqDto } from 'src/interfaces/user/userReq.dto';
import { UserDto } from 'src/interfaces/common/user.dto';
import { IUserRepository } from 'src/infrastructure/user.repository.interface';

export class UserRepository implements IUserRepository {
  constructor() {}
  create(_values: UserReqDto): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  findOne(_id: number): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
}
