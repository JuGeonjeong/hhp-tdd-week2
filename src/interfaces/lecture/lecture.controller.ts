import { Controller } from '@nestjs/common';

@Controller('/lecture')
export class LectureController {
  constructor() {}

  /**
   * TODO - 특정 유저의 포인트를 조회하는 기능을 작성해주세요.
   */
  //   @Get(':id')
  //   async point(@Param('id') id): Promise<UserPoint> {
  //     const userId = Number.parseInt(id);
  //     return { id: userId, point: 0, updateMillis: Date.now() };
  //   }

  /**
   * TODO - 특정 유저의 포인트 충전/이용 내역을 조회하는 기능을 작성해주세요.
   */
  //   @Get(':id/histories')
  //   async history(@Param('id') id): Promise<PointHistory[]> {
  //     const userId = Number.parseInt(id);
  //     return [];
  //   }
}
