import { LectureDto } from 'src/interface/dto/res/lecture.dto';
import { LectureReqDto } from 'src/interface/dto/req/lectureReq.dto';
import { LectureUserDto } from 'src/interface/dto/res/lectureUser.dto';
import { JoinUserReq } from 'src/interface/dto/req/joinUserReq.dto';

export interface ILectureService {
  createLecture(values: LectureReqDto): Promise<LectureDto>;
  findLecture(id: number): Promise<LectureDto>;
  findLectureAll(id: number): Promise<any[]>;
  joinUser(values: JoinUserReq): Promise<LectureUserDto>;
}
