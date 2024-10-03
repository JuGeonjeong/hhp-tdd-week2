import { Inject, Injectable } from '@nestjs/common';
import { ILectureUserRepository } from 'src/infrastructure/repositories/lectureUser.repository.interface';
import { ILectureUserService } from './lectureUser.service';
import { JoinUserReq } from 'src/interfaces/dto/joinUserReq.dto';
import { LectureUserDto } from 'src/interfaces/dto/lectureUser.dto';

@Injectable()
export class LectureUserServiceImpl implements ILectureUserService {
  constructor(
    @Inject('ILectureUserRepository')
    private readonly lectureUserRepository: ILectureUserRepository,
  ) {}
  async create(values: JoinUserReq): Promise<LectureUserDto> {
    const data = await this.lectureUserRepository.create(values);

    return new LectureUserDto(data);
  }
  async findOne(values: JoinUserReq): Promise<LectureUserDto> {
    const data = await this.lectureUserRepository.findOne(values);

    return new LectureUserDto(data);
  }
}
