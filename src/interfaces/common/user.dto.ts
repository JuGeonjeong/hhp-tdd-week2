import { IsInt, IsString } from 'class-validator';
import { User } from 'src/database/user.model';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
  }
}
