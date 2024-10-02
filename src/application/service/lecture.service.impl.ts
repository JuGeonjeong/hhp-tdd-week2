import { Inject, Injectable } from '@nestjs/common';
import { LectureDto } from 'src/interfaces/dto/lecture.dto';
import { LectureReqDto } from 'src/interfaces/dto/lectureReq.dto';
import { ILectureRepository } from 'src/infrastructure/repositories/lecture.repository.interface';
import { ILectureService } from './lecture.service';
import { LectureAllReqDto } from 'src/interfaces/dto/lectureAllReq.dto';

@Injectable()
export class LectureServiceImpl implements ILectureService {
  constructor(
    @Inject('ILectureRepository')
    private readonly lectureRepository: ILectureRepository,
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

  // async joinUser(values: JoinUserReq): Promise<LectureDto> {
  //   throw new Error('Method not implemented.');
  // }
}
