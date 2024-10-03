import { UserReqDto } from 'src/interfaces/dto/userReq.dto';
import { IUserRepository } from 'src/infrastructure/repositories/user.repository.interface';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(values: UserReqDto): Promise<User> {
    const newData = this.userRepository.create(values);
    return await this.userRepository.save(newData);
  }

  async findOne(userId: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
