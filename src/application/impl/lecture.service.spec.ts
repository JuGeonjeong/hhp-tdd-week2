import { Test, TestingModule } from '@nestjs/testing';
import { LectureServiceImpl } from './lecture.service.impl';
import { ILectureRepository } from 'src/infrastructure/interfaces/lecture.repository.interface';
import { IUserService } from '../service/user.service';
import { ILectureUserService } from '../service/lectureUser.service';
import { BadRequestException } from '@nestjs/common';
import { LectureReqDto } from 'src/interface/dto/req/lectureReq.dto';
import { JoinUserReq } from 'src/interface/dto/req/joinUserReq.dto';
import { Lecture } from 'src/domain/entities/lecture.entity';
import { User } from 'src/domain/entities/user.entity';
import { LectureUserDto } from 'src/interface/dto/res/lectureUser.dto';
import { LectureDto } from 'src/interface/dto/res/lecture.dto';

describe('LectureServiceImpl', () => {
  let service: LectureServiceImpl;
  let lectureRepository: ILectureRepository;
  let userService: IUserService;
  let lectureUserService: ILectureUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LectureServiceImpl,
        {
          provide: 'ILectureRepository',
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: 'IUserService',
          useValue: {
            findUser: jest.fn(),
          },
        },
        {
          provide: 'ILectureUserService',
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LectureServiceImpl>(LectureServiceImpl);
    lectureRepository = module.get<ILectureRepository>('ILectureRepository');
    userService = module.get<IUserService>('IUserService');
    lectureUserService = module.get<ILectureUserService>('ILectureUserService');
  });

  describe('createLecture', () => {
    it('should create a lecture successfully', async () => {
      const lectureReqDto: LectureReqDto = {
        name: 'test',
        date: '2024-10-05',
        professor: 'tester',
      };
      const mockLecture = {
        id: 1,
        name: 'Test Lecture',
        date: '2024-10-05',
        professor: 'tester',
        maximum: 30,
        count: 0,
      };

      jest.spyOn(lectureRepository, 'create').mockResolvedValue(mockLecture);

      const result = await service.createLecture(lectureReqDto);
      expect(result).toEqual(new LectureDto(mockLecture));
      expect(lectureRepository.create).toHaveBeenCalledWith(lectureReqDto);
    });
  });

  describe('joinUser', () => {
    it('should throw an error if user does not exist', async () => {
      const joinUserReq: JoinUserReq = { userId: 1, lectureId: 1 };
      jest.spyOn(userService, 'findUser').mockResolvedValue(null);

      await expect(service.joinUser(joinUserReq)).rejects.toThrow(
        new BadRequestException(`없는 유저 데이터입니다. id: 1`),
      );
    });

    it('should throw an error if lecture is already joined', async () => {
      const joinUserReq: JoinUserReq = { userId: 1, lectureId: 1 };
      const existingLectureUser = {
        id: 1,
        name: 'test',
        date: '2024-10-05',
        professor: 'tester',
        maximum: 30,
        count: 0,
        createdAt: '2024-10-04',
        userId: 1,
        lectureId: 1,
        user: User,
        lecture: Lecture,
      };

      jest
        .spyOn(userService, 'findUser')
        .mockResolvedValue({ id: 1, name: 'test' });
      jest
        .spyOn(lectureUserService, 'findOne')
        .mockResolvedValue(existingLectureUser);

      await expect(service.joinUser(joinUserReq)).rejects.toThrow(
        new BadRequestException('이미 신청한 강의입니다.'),
      );
    });

    it('should successfully join a lecture', async () => {
      const joinUserReq: JoinUserReq = { userId: 1, lectureId: 1 };
      const mockLecture = {
        id: 1,
        date: '2024-10-05',
        name: 'test',
        professor: 'tester',
        count: 0,
        maximum: 30,
      };
      const existingLectureUser = {
        id: 1,
        name: 'test',
        date: '2024-10-05',
        professor: 'tester',
        maximum: 30,
        count: 0,
        createdAt: '2024-10-04',
        userId: 1,
        lectureId: 1,
        user: User,
        lecture: Lecture,
      };

      jest
        .spyOn(userService, 'findUser')
        .mockResolvedValue({ id: 1, name: 'test' });
      jest.spyOn(lectureUserService, 'findOne').mockResolvedValue(null);
      jest.spyOn(lectureRepository, 'findOne').mockResolvedValue(mockLecture);
      jest
        .spyOn(lectureUserService, 'create')
        .mockResolvedValue(existingLectureUser);
      jest.spyOn(service, 'addCount').mockResolvedValue(undefined);

      const result = await service.joinUser(joinUserReq);
      expect(result).toBeInstanceOf(LectureUserDto);
      expect(service.addCount).toHaveBeenCalledWith(1);
    });
  });
});
