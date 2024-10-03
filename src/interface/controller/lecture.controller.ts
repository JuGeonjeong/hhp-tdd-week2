import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ILectureService } from 'src/application/service/lecture.service';
import { LectureReqDto } from '../dto/req/lectureReq.dto';
import { LectureDto } from '../dto/res/lecture.dto';
import { JoinUserReq } from '../dto/req/joinUserReq.dto';
import { LectureUser } from 'src/domain/entities/lectureUser.entity';

@Controller('/lecture')
export class LectureController {
  constructor(
    @Inject('ILectureService') private readonly lectureService: ILectureService,
  ) {}

  // 특강 등록
  @Post('')
  async create(
    @Body(ValidationPipe) lectureReqDto: LectureReqDto,
  ): Promise<LectureDto> {
    return await this.lectureService.createLecture(lectureReqDto);
  }

  // 특강 단일 조회
  @Get(':id')
  async findOne(@Param('id') id): Promise<LectureDto> {
    const lectureId = Number.parseInt(id);
    return await this.lectureService.findLecture(lectureId);
  }

  // 특강 목록 조회
  // userId값이 있을시 신청완료 목록
  @Get('list/:userId')
  async findAll(@Query('userId') userId): Promise<any[]> {
    return await this.lectureService.findLectureAll(userId);
  }

  // 특강 신청
  @Post('joinUser')
  async joinUser(
    @Body(ValidationPipe) joinUserReqDto: JoinUserReq,
  ): Promise<LectureUser> {
    return await this.lectureService.joinUser(joinUserReqDto);
  }
}
