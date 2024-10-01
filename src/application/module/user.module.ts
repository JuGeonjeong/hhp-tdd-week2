import { Module } from '@nestjs/common';
import { UserController } from 'src/interfaces/user/user.controller';
import { UserServiceImpl } from '../service/user.sevice.impl';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserServiceImpl',
      useClass: UserServiceImpl,
    },
  ],
})
export class UserModule {}
