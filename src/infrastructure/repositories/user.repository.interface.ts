import { User } from 'src/domain/entities/user.entity';
import { UserReqDto } from 'src/interfaces/dto/userReq.dto';

export interface IUserRepository {
  create(values: UserReqDto): Promise<User>;
  findOne(id: number): Promise<User>;
}
