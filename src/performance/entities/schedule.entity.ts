import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from './seat.entity';
import { Performance } from './performance.entity';

@Entity({
    name: 'schedules',
  })
  export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'number', nullable: false })
    showId: number;

    @Column({type: 'datetime', nullable: false})
    date: Date;

    @Column({type: 'time', nullable: false})
    time: String;

    @ManyToOne((type): typeof Performance => Performance, performance => performance.schedules, {onDelete: 'CASCADE'})
    performance: Performance;

    @OneToOne((type): typeof Seat => Seat, seat => seat.schedule, { cascade: true })
    seat: Seat;
  }
