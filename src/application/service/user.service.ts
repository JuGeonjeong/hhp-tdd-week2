import { User } from 'src/infrastructure/database/user.model';
import { UserReqDto } from 'src/interfaces/dto/userReq.dto';

export interface IUserService {
  createUser(values: UserReqDto): Promise<User>;
  findUser(userId: number): Promise<User>;
}
