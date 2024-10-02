import { Module } from '@nestjs/common';
import { UserServiceImpl } from '../service/user.service.impl';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { UserController } from 'src/interfaces/controller/user.controller';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserServiceImpl,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
