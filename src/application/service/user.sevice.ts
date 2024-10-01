import { User } from 'src/database/user.model';
import { UserReqDto } from 'src/interfaces/user/userReq.dto';

export interface IUserService {
  createUser(values: UserReqDto): Promise<User>;
  findUser(id: number): Promise<User>;
}
