import { Module } from '@nestjs/common';
import { UserModule } from './application/module/user.module';
import { LectureModule } from './application/module/lecture.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: process.env.PORT ? Number(process.env.PORT) : 12307,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: process.env.NODE_ENV !== 'production',
      timezone: 'Z',
      charset: 'utf8mb4',
      entities: [__dirname + '/domain/entities/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
    LectureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
