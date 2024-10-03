import { LectureDto } from './lecture.dto';

export class GroupedLectureDto {
  date: string;
  lectures: LectureDto[];

  constructor(date: string, lectures: any[]) {
    this.date = date;
    this.lectures = lectures.map((lecture) => new LectureDto(lecture));
  }
}
