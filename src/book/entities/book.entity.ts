import { Schedule } from 'src/performance/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'books',
  })
  export class Book {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'number', nullable: false })
    userId: number;

    @Column({ type: 'number', nullable: false })
    scheduleId: number;

    @ManyToOne((type): typeof User => User, user => user.Books, {onDelete: 'CASCADE'})
    user: User;

    @ManyToOne((type): typeof Schedule => Schedule, {onDelete: 'CASCADE'})
    schedule: Schedule;
  }
