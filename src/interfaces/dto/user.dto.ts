import { IsInt, IsString } from 'class-validator';
import { User } from 'src/domain/entities/user.entity';

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
