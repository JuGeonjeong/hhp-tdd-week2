import { IsInt, IsOptional } from 'class-validator';

export class LectureAllReqDto {
  @IsInt()
  @IsOptional()
  userId?: number;
}
