import { LectureReqDto } from 'src/interface/dto/req/lectureReq.dto';
import { Lecture } from 'src/domain/entities/lecture.entity';
import { GroupedLectureDto } from 'src/interface/dto/res/groupLecture.dto';

export interface ILectureRepository {
  create(values: LectureReqDto): Promise<Lecture>;
  findOne(lectureId: number): Promise<Lecture>;
  findAll(userId: number): Promise<Lecture[] | GroupedLectureDto[]>;
  update(lectureId: number): Promise<Lecture>;
}
