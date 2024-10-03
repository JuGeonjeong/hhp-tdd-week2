import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lecture } from 'src/domain/entities/lecture.entity';
import { LectureController } from 'src/interfaces/controller/lecture.controller';
import { LectureRepository } from 'src/infrastructure/repositories/lecture.repository';
import { LectureServiceImpl } from '../service/lecture.service.impl';
import { LectureUserRepository } from 'src/infrastructure/repositories/lectureUser.repository';
import { UserServiceImpl } from '../service/user.service.impl';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { LectureUserServiceImpl } from '../service/lectureUser.service.impl';
import { LectureUser } from 'src/domain/entities/lectureUser.entity';
import { User } from 'src/domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Lecture, LectureUser])],
  controllers: [LectureController],
  providers: [
    // SERVICE
    {
      provide: 'ILectureService',
      useClass: LectureServiceImpl,
    },
    {
      provide: 'IUserService',
      useClass: UserServiceImpl,
    },
    {
      provide: 'ILectureUserService',
      useClass: LectureUserServiceImpl,
    },
    // REPOSITORY
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'ILectureRepository',
      useClass: LectureRepository,
    },
    {
      provide: 'ILectureUserRepository',
      useClass: LectureUserRepository,
    },
  ],
})
export class LectureModule {}
