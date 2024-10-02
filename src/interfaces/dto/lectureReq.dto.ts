import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class LectureReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  professor: string;
}
