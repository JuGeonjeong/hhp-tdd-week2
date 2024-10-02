import { Injectable } from '@nestjs/common';
import { ILectureRepository } from './lecture.repository.interface';
import { LectureReqDto } from 'src/interfaces/dto/lectureReq.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from 'src/domain/entities/lecture.entity';
import { Repository } from 'typeorm';
import { LectureDto } from 'src/interfaces/dto/lecture.dto';
import { LectureAllReqDto } from 'src/interfaces/dto/lectureAllReq.dto';

@Injectable()
export class LectureRepository implements ILectureRepository {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  async create(values: LectureReqDto): Promise<LectureDto> {
    const newData = this.lectureRepository.create(values);
    const data = await this.lectureRepository.save(newData);

    return new LectureDto(data);
  }

  async findOne(lectureId: number): Promise<LectureDto> {
    const data = await this.lectureRepository.findOneBy({ id: lectureId });
    console.log(data);

    return new LectureDto(data);
  }

  async findAll(values: LectureAllReqDto): Promise<LectureDto[]> {
    console.log('1');
    const data = await this.lectureRepository
      .createQueryBuilder('lecture')
      .getMany();
    ///////////////////////////////// 이어하기
    console.log('2');
    console.log(data);
    return data.map((lecture) => new LectureDto(lecture));
  }

  // async joinUser(values: JoinUserReq): Promise<Lecture> {
  //   // 신청이력
  //   // 인원체크
  //   throw new Error('Method not implemented.');
  // }
}
