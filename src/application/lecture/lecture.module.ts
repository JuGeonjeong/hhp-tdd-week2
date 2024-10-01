import { Module } from '@nestjs/common';
import { LectureController } from 'src/interfaces/lecture/lecture.controller';

@Module({
  imports: [],
  controllers: [LectureController],
})
export class LectureModule {}
