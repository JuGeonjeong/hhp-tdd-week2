import { LectureDto } from 'src/interfaces/dto/lecture.dto';
import { LectureAllReqDto } from 'src/interfaces/dto/lectureAllReq.dto';
import { LectureReqDto } from 'src/interfaces/dto/lectureReq.dto';

export interface ILectureService {
  createLecture(values: LectureReqDto): Promise<LectureDto>;
  findLecture(id: number): Promise<LectureDto>;
  findLectureAll(values: LectureAllReqDto): Promise<LectureDto[]>;
  // joinUser(values: JoinUserReq): Promise<LectureDto>;
}
