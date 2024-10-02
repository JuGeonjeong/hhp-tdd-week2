import { UserReqDto } from 'src/interfaces/dto/userReq.dto';
import { UserDto } from 'src/interfaces/dto/user.dto';
import { IUserRepository } from 'src/infrastructure/repositories/user.repository.interface';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) // TypeORM의 Repository<User> 주입
    private readonly userRepository: Repository<User>,
  ) {}

  async create(values: UserReqDto): Promise<UserDto> {
    const newData = this.userRepository.create(values);
    const data = await this.userRepository.save(newData);

    return new UserDto(data);
  }

  async findOne(userId: number): Promise<UserDto> {
    const data = await this.userRepository.findOneBy({ id: userId });

    return new UserDto(data);
  }
}
