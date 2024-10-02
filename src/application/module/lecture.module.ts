import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from 'src/domain/entities/lecture.entity';
import { LectureController } from 'src/interfaces/controller/lecture.controller';
import { LectureRepository } from 'src/infrastructure/repositories/lecture.repository';
import { LectureServiceImpl } from '../service/lecture.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  controllers: [LectureController],
  providers: [
    {
      provide: 'ILectureService',
      useClass: LectureServiceImpl,
    },
    {
      provide: 'ILectureRepository',
      useClass: LectureRepository,
    },
  ],
})
export class LectureModule {}
