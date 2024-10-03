import { User } from 'src/domain/entities/user.entity';
import { UserReqDto } from 'src/interface/dto/res/userReq.dto';

export interface IUserService {
  createUser(values: UserReqDto): Promise<User>;
  findUser(userId: number): Promise<User>;
}
