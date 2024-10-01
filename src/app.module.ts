import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './application/user/user.module';
import { LectureModule } from './application/lecture/lecture.module';

@Module({
  imports: [UserModule, LectureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
