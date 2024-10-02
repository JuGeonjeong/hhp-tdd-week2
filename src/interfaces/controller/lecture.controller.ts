import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ILectureService } from 'src/application/service/lecture.service';
import { LectureReqDto } from '../dto/lectureReq.dto';
import { LectureDto } from '../dto/lecture.dto';
import { LectureAllReqDto } from '../dto/lectureAllReq.dto';

@Controller('lecture')
export class LectureController {
  constructor(
    @Inject('ILectureService') private readonly lectureService: ILectureService,
  ) {}

  @Post('')
  async create(
    @Body(ValidationPipe) lectureReqDto: LectureReqDto,
  ): Promise<LectureDto> {
    return await this.lectureService.createLecture(lectureReqDto);
  }

  @Get('/:id')
  async findOne(@Param('id') id): Promise<LectureDto> {
    const lectureId = Number.parseInt(id);
    return await this.lectureService.findLecture(lectureId);
  }

  @Get('/list')
  async findAll(
    @Body(ValidationPipe) LectureAllReqDto: LectureAllReqDto,
  ): Promise<LectureDto[]> {
    return await this.lectureService.findLectureAll(LectureAllReqDto);
  }

  // @Post('/joinUser')
  // async joinUser(
  //   @Body(ValidationPipe) joinUserReqDto: JoinUserReq,
  // ): Promise<LectureDto> {
  //   return await this.lectureService.joinUser(joinUserReqDto);
  // }
}
