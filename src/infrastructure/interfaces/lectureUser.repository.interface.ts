import { LectureUser } from 'src/domain/entities/lectureUser.entity';
import { JoinUserReq } from 'src/interface/dto/req/joinUserReq.dto';

export interface ILectureUserRepository {
  create(values: JoinUserReq): Promise<LectureUser>;
  findOne(values: JoinUserReq): Promise<LectureUser>;
}
