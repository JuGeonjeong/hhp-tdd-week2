import { Injectable } from '@nestjs/common';
import { ILectureRepository } from '../interfaces/lecture.repository.interface';
import { LectureReqDto } from 'src/interface/dto/req/lectureReq.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from 'src/domain/entities/lecture.entity';
import { Repository } from 'typeorm';
import { LectureDto } from 'src/interface/dto/res/lecture.dto';
import { GroupedLectureDto } from 'src/interface/dto/res/groupLecture.dto';
import * as dayjs from 'dayjs';

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

  async findOne(lectureId: number): Promise<Lecture> {
    return await this.lectureRepository.findOneBy({ id: lectureId });
  }

  async findAll(userId: number): Promise<LectureDto[] | GroupedLectureDto[]> {
    if (userId) {
      const query = this.lectureRepository.createQueryBuilder('lecture');
      query
        .innerJoin('lecture.lectureUsers', 'lectureUser')
        .where('lectureUser.userId = :userId', { userId });
      const data = await query.getMany();
      return data.map((lecture) => new LectureDto(lecture));
    } else {
      const now = dayjs().toDate();
      const query = await this.lectureRepository
        .createQueryBuilder('lecture')
        .select(['lecture.date', 'lecture'])
        .where('lecture.date > :now', { now }) // 현재 날짜 이후의 데이터만 필터링
        .orderBy('lecture.date', 'ASC')
        .getMany();

      const groupedLectures = query.reduce((result, lecture) => {
        const date = lecture.date.toString().split('T')[0];
        if (!result[date]) {
          result[date] = [];
        }
        result[date].push(new LectureDto(lecture));
        return result;
      }, {});

      return Object.keys(groupedLectures).map(
        (date) => new GroupedLectureDto(date, groupedLectures[date]),
      );
    }
  }

  async update(id: number): Promise<Lecture> {
    await this.lectureRepository
      .createQueryBuilder('lecture')
      .update(Lecture)
      .set({
        count: () => 'count + 1',
      })
      .where('lecture.id = :id', { id })
      .execute();

    return await this.lectureRepository.findOneBy({ id });
  }
}
