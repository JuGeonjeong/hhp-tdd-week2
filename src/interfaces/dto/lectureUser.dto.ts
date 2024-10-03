import { IsInt, IsString } from 'class-validator';
import { LectureUser } from 'src/domain/entities/lectureUser.entity';

export class LectureUserDto {
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
  createdAt;

  @IsInt()
  userId;

  user;

  @IsInt()
  lectureId;
  lecture;

  constructor(lectureUser: LectureUser) {
    this.id = lectureUser.id;
  }
}
