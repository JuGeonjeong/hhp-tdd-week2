import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LectureUser } from 'src/domain/entities/lectureUser.entity';
import { ILectureUserRepository } from '../interfaces/lectureUser.repository.interface';
import { JoinUserReq } from 'src/interface/dto/req/joinUserReq.dto';

@Injectable()
export class LectureUserRepository implements ILectureUserRepository {
  constructor(
    @InjectRepository(LectureUser)
    private readonly lectureUserRepository: Repository<LectureUser>,
  ) {}

  async create(values: JoinUserReq): Promise<LectureUser> {
    const lectureUser = this.lectureUserRepository.create(values);
    return await this.lectureUserRepository.save(lectureUser);
  }

  async findOne(values: JoinUserReq): Promise<LectureUser> {
    const { userId, lectureId } = values;
    const query = this.lectureUserRepository.createQueryBuilder('lectureUser');
    query
      .where('lectureUser.userId = :userId', { userId })
      .andWhere('lectureUser.lectureId = :lectureId', { lectureId });

    return await query.getOne();
  }
}
