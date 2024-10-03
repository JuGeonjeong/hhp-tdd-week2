import { JoinUserReq } from 'src/interfaces/dto/joinUserReq.dto';
import { LectureUserDto } from 'src/interfaces/dto/lectureUser.dto';

export interface ILectureUserService {
  create(values: JoinUserReq): Promise<LectureUserDto>;
  findOne(values: JoinUserReq): Promise<LectureUserDto>;
}
