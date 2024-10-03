import { IsInt, IsString } from 'class-validator';
import { Lecture } from 'src/domain/entities/lecture.entity';

export class LectureDto {
  @IsInt()
  id: number;

  @IsString()
  date: string;

  @IsString()
  name: string;

  @IsString()
  professor: string;

  @IsInt()
  maximum: number;

  @IsInt()
  count: number;

  constructor(lecture: Lecture) {
    this.id = lecture.id;
    this.date = lecture.date;
    this.name = lecture.name;
    this.professor = lecture.professor;
    this.maximum = lecture.maximum;
    this.count = lecture.count;
  }
}
