import { IsNotEmpty, IsString } from 'class-validator';

export class UserReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
