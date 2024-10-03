import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureUserRepository } from 'src/infrastructure/repositories/lectureUser.repository';
import { LectureUser } from 'src/domain/entities/lectureUser.entity';
import { LectureUserServiceImpl } from '../impl/lectureUser.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([LectureUser])],
  controllers: [],
  providers: [
    {
      provide: 'ILectureUserService',
      useClass: LectureUserServiceImpl,
    },
    {
      provide: 'ILectureUserRepository',
      useClass: LectureUserRepository,
    },
  ],
})
export class LectureUserModule {}
