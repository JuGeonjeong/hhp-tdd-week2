import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureUser } from 'src/domain/entities/lectureUser.entity';
import { ILectureUserRepository } from './lectureUser.repository.interface';
import { JoinUserReq } from 'src/interfaces/dto/joinUserReq.dto';
import { LectureUserDto } from 'src/interfaces/dto/lectureUser.dto';

@Injectable()
export class LectureUserRepository implements ILectureUserRepository {
  constructor(
    @InjectRepository(LectureUser)
    private readonly lectureUserRepository: Repository<LectureUser>,
  ) {}

  async create(values: JoinUserReq): Promise<LectureUser> {
    const lectureUser = this.lectureUserRepository.create(values);
    await this.lectureUserRepository.save(lectureUser);

    return lectureUser;
  }

  async findOne(values: JoinUserReq): Promise<LectureUserDto> {
    const { userId, lectureId } = values;
    const query = this.lectureUserRepository.createQueryBuilder('lu');
    query
      .where('lu.userId = :userId', { userId })
      .andWhere('lu.lectureId = :lectureId', { lectureId });

    const data = await query.getOne();

    return new LectureUserDto(data);
  }
}
