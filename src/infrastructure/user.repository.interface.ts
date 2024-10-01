import { User } from 'src/database/user.model';
import { UserReqDto } from 'src/interfaces/user/userReq.dto';

export interface IUserRepository {
  create(values: UserReqDto): Promise<User>;
  findOne(id: number): Promise<User>;
}
