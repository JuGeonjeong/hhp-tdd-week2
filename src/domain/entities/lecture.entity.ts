import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LectureUser } from './lectureUser.entity';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  date: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  professor: string;

  @Column({ default: 30, type: Number })
  maximum: number;

  @Column({ default: 0, type: Number })
  count: number;

  @OneToMany(() => LectureUser, (lectureUser) => lectureUser.lecture, {
    cascade: true,
  })
  lectureUsers?: LectureUser[];
}
