import { JoinUserReq } from 'src/interface/dto/req/joinUserReq.dto';
import { LectureUserDto } from 'src/interface/dto/res/lectureUser.dto';

export interface ILectureUserService {
  create(values: JoinUserReq): Promise<LectureUserDto>;
  findOne(values: JoinUserReq): Promise<LectureUserDto>;
}
