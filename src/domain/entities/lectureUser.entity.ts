import { IsDate, IsInt } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Lecture } from './lecture.entity';

@Entity()
export class LectureUser {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @Column({ primary: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.lectureUsers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ primary: true })
  lectureId: number;

  @ManyToOne(() => Lecture, (lecture) => lecture.lectureUsers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  lecture: Lecture;
}
