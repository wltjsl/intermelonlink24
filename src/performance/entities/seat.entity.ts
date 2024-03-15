import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity({
    name: 'seats',
  })
  export class Seat {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'number', nullable: false })
    scheduleId: number;

    @Column({ type: 'datetime', nullable: false})
    date: Date;

    @Column({ unsigned: true, type: 'number', nullable: false })
    availableSeats: number;

    @Column({ unsigned: true, type: 'number', nullable: false })
    totalSeats: number;

    @OneToOne((type) => Schedule, (schedule) => schedule.seat)
    @JoinColumn()
    schedule: Schedule;
  }
