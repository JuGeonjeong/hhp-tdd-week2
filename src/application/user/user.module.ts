import { Module } from '@nestjs/common';
import { UserServiceImpl } from 'src/application/user/user.sevice.impl';
import { UserController } from 'src/interfaces/user/user.controller';

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
