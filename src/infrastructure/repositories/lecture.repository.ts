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
    const { userId } = values;
    const query = this.lectureRepository.createQueryBuilder('lecture');
    if (userId) {
      query.where('lecture.userId = :userId', { userId });
    }
    const data = await query.getMany();

    return data.map((lecture) => new LectureDto(lecture));
  }
}
