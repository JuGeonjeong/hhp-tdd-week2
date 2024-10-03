import { JoinUserReq } from 'src/interfaces/dto/joinUserReq.dto';
import { LectureDto } from 'src/interfaces/dto/lecture.dto';
import { LectureReqDto } from 'src/interfaces/dto/lectureReq.dto';
import { LectureUserDto } from 'src/interfaces/dto/lectureUser.dto';

export interface ILectureService {
  createLecture(values: LectureReqDto): Promise<LectureDto>;
  findLecture(id: number): Promise<LectureDto>;
  findLectureAll(id: number): Promise<any[]>;
  joinUser(values: JoinUserReq): Promise<LectureUserDto>;
}
