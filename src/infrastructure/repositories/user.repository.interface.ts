import { User } from 'src/infrastructure/database/user.model';
import { UserReqDto } from 'src/interfaces/dto/userReq.dto';

export interface IUserRepository {
  create(values: UserReqDto): Promise<User>;
  findOne(id: number): Promise<User>;
}
