import { User } from 'src/domain/entities/user.entity';
import { UserReqDto } from 'src/interfaces/dto/userReq.dto';

export interface IUserService {
  createUser(values: UserReqDto): Promise<User>;
  findUser(userId: number): Promise<User>;
}
