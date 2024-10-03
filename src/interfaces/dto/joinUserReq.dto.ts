import { IsNotEmpty, IsNumber } from 'class-validator';

export class JoinUserReq {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  lectureId: number;
}
