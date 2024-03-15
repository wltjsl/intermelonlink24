import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../types/userRole.type';
import { Book } from 'src/book/entities/book.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  nickname: string;

  @Column({ type: 'number', nullable: false })
  points: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToMany((type) => Book, (book) => book.user)
  Books: Book[];

}
