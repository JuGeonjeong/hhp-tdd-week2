import { IsInt } from 'class-validator';

export class LectureDto {
  @IsInt()
  amount: number;
}
