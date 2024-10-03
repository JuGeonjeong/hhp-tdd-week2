import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LectureDto } from 'src/interface/dto/res/lecture.dto';
import { LectureReqDto } from 'src/interface/dto/req/lectureReq.dto';
import { ILectureRepository } from 'src/infrastructure/interfaces/lecture.repository.interface';
import { ILectureService } from './lecture.service';
import * as dayjs from 'dayjs';
import { LectureUserDto } from 'src/interface/dto/res/lectureUser.dto';
import { ILectureUserService } from './lectureUser.service';
import { IUserService } from './user.service';
import { Mutex } from 'async-mutex';
import { JoinUserReq } from 'src/interface/dto/req/joinUserReq.dto';

@Injectable()
export class LectureServiceImpl implements ILectureService {
  constructor(
    @Inject('ILectureRepository')
    private readonly lectureRepository: ILectureRepository,
    @Inject('IUserService')
    private readonly userService: IUserService,
    @Inject('ILectureUserService')
    private readonly lectureUserService: ILectureUserService,
  ) {}

  async createLecture(values: LectureReqDto): Promise<LectureDto> {
    const data = await this.lectureRepository.create(values);
    return new LectureDto(data);
  }

  async findLecture(id: number): Promise<LectureDto> {
    const data = await this.lectureRepository.findOne(id);
    return new LectureDto(data);
  }

  async findLectureAll(userId: number): Promise<any[]> {
    const data = await this.lectureRepository.findAll(userId);
    console.log('service', data);
    return data;
  }

  async joinUser(values: JoinUserReq): Promise<LectureUserDto> {
    const mutex = new Mutex();
    const { userId, lectureId } = values;
    const now = dayjs();
    now.format('YYYY-MM-DD');
    const exUser = await this.userService.findUser(userId);
    if (!exUser)
      throw new BadRequestException(`없는 유저 데이터입니다. id: ${userId}`);
    const exlectureUser = await this.lectureUserService.findOne(values);
    if (exlectureUser.id)
      throw new BadRequestException(`이미 신청한 강의입니다.`);

    return mutex.runExclusive(async () => {
      const exLecture = await this.lectureRepository.findOne(lectureId);
      if (!exLecture)
        throw new BadRequestException(
          `없는 강의 데이터입니다. id: ${lectureId}`,
        );
      if (now > dayjs(exLecture.date))
        throw new BadRequestException(`지난 강의 입니다.`);
      if (exLecture.count >= exLecture.maximum)
        throw new BadRequestException(`인원이 초과된 강의입니다.`);

      const lectrueUser = await this.lectureUserService.create(values);
      await this.addCount(lectureId);

      return new LectureUserDto(lectrueUser);
    });
  }

  async addCount(lectureId: number) {
    return await this.lectureRepository.update(lectureId);
  }
}
