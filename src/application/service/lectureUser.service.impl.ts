import { Inject, Injectable } from '@nestjs/common';
import { ILectureUserRepository } from 'src/infrastructure/interfaces/lectureUser.repository.interface';
import { ILectureUserService } from './lectureUser.service';
import { LectureUserDto } from 'src/interface/dto/res/lectureUser.dto';
import { JoinUserReq } from 'src/interface/dto/req/joinUserReq.dto';

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
