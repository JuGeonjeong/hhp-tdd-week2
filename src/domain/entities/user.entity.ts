import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LectureUser } from './lectureUser.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: String })
  name: string;

  @OneToMany(() => LectureUser, (lectureUser) => lectureUser.user, {
    cascade: true,
  })
  lectureUsers?: LectureUser[];

  // constructor(partial: Partial<User>) {
  //   Object.assign(this, partial);
  // }
}
