import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Repository } from 'typeorm';
import { Lecture } from 'src/domain/entities/lecture.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Lecture User Join (e2e)', () => {
  let app: INestApplication;
  let lectureRepository: Repository<Lecture>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    lectureRepository = moduleFixture.get<Repository<Lecture>>(
      getRepositoryToken(Lecture),
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow only 1 out of 5 requests from the same user to succeed', async () => {
    // Given: 특강 생성 (최대 30명)
    const lecture = await lectureRepository.save({
      name: 'Test Lecture',
      date: '2024-10-05',
      professor: 'Test Professor',
      maximum: 30, // 최대 30명 수강 가능
      count: 0,
    });

    const userId = 1; // 동일한 사용자

    // When: 동일한 사용자가 5번 신청 요청을 보냄
    const requests = Array(5)
      .fill(0)
      .map(() => {
        return request(app.getHttpServer()).post('/lecture/joinUser').send({
          userId, // 동일한 사용자
          lectureId: lecture.id,
        });
      });

    const results = await Promise.allSettled(requests);

    // Then: 성공한 요청이 1개인지 확인
    const successCount = results.filter(
      (result) => result.status === 'fulfilled',
    ).length;
    const failCount = results.filter(
      (result) => result.status === 'rejected',
    ).length;

    expect(successCount).toBe(1); // 1번만 성공해야 함
    expect(failCount).toBe(4); // 나머지 4번은 실패
  });

  it('should allow only 30 out of 40 users to join the lecture', async () => {
    // Given: 특강 생성 (최대 30명)
    const lecture = await lectureRepository.save({
      name: 'Test Lecture for 40 users',
      date: '2024-10-05',
      professor: 'Test Professor',
      maximum: 30,
      count: 0,
    });

    // When: 40명의 동시 요청을 보냄
    const requests = Array(40)
      .fill(0)
      .map((_, i) => {
        return request(app.getHttpServer())
          .post('/lecture/joinUser')
          .send({
            userId: i + 1, // 각기 다른 사용자
            lectureId: lecture.id,
          });
      });

    const results = await Promise.allSettled(requests);

    // Then: 성공한 요청이 30개인지 확인
    const successCount = results.filter(
      (result) => result.status === 'fulfilled',
    ).length;
    const failCount = results.filter(
      (result) => result.status === 'rejected',
    ).length;

    expect(successCount).toBe(30); // 30명만 성공해야 함
    expect(failCount).toBe(10); // 나머지 10명은 실패
  });
});
