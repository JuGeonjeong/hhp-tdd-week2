import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LectureDto } from 'src/interfaces/dto/lecture.dto';
import { LectureReqDto } from 'src/interfaces/dto/lectureReq.dto';
import { ILectureRepository } from 'src/infrastructure/repositories/lecture.repository.interface';
import { ILectureService } from './lecture.service';
import { LectureAllReqDto } from 'src/interfaces/dto/lectureAllReq.dto';
import { JoinUserReq } from 'src/interfaces/dto/joinUserReq.dto';
import dayjs from 'dayjs';
import { LectureUserDto } from 'src/interfaces/dto/lectureUser.dto';
import { ILectureUserService } from './lectureUser.service';
import { IUserService } from './user.service';

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

  async findLectureAll(values: LectureAllReqDto): Promise<LectureDto[]> {
    const data = await this.lectureRepository.findAll(values);

    return data.map((lecture) => new LectureDto(lecture));
  }

  async joinUser(values: JoinUserReq): Promise<LectureUserDto> {
    const { userId, lectureId } = values;
    const now = dayjs();
    now.format('YYYY-MM-DD');
    const exUser = await this.userService.findUser(userId);
    const exLecture = await this.lectureRepository.findOne(lectureId);
    const exlectureUser = await this.lectureUserService.findOne(values);
    if (!exUser)
      throw new BadRequestException(`없는 데이터입니다. id: ${userId}`);
    if (!exLecture)
      throw new BadRequestException(`없는 데이터입니다. id: ${lectureId}`);
    if (exlectureUser) throw new BadRequestException(`이미 신청한 강의입니다.`);
    if (now > dayjs(exLecture.date))
      throw new BadRequestException(`지난 강의 입니다.`);

    const lectrueUser = await this.lectureUserService.create(values);

    return new LectureUserDto(lectrueUser);
  }
}
