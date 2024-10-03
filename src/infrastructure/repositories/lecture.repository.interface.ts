import { LectureReqDto } from 'src/interfaces/dto/lectureReq.dto';
import { Lecture } from 'src/domain/entities/lecture.entity';
import { GroupedLectureDto } from 'src/interfaces/dto/groupLecture.dto';

export interface ILectureRepository {
  create(values: LectureReqDto): Promise<Lecture>;
  findOne(lectureId: number): Promise<Lecture>;
  findAll(userId: number): Promise<Lecture[] | GroupedLectureDto[]>;
  update(lectureId: number): Promise<Lecture>;
}
