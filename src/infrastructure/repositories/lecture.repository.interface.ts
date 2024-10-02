import { LectureReqDto } from 'src/interfaces/dto/lectureReq.dto';
import { Lecture } from '../database/lecture.model';
import { LectureAllReqDto } from 'src/interfaces/dto/lectureAllReq.dto';

export interface ILectureRepository {
  create(values: LectureReqDto): Promise<Lecture>;
  findOne(id: number): Promise<Lecture>;
  findAll(values: LectureAllReqDto): Promise<Lecture[]>;
  // joinUser(values: JoinUserReq): Promise<Lecture>;
}
