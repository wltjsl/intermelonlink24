import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './performance-category.type';
import { Schedule } from './schedule.entity';

@Entity({
    name: 'performances',
  })
  export class Performance {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', nullable: false })
    title: string;
  
    @Column({ type: 'varchar', nullable: false })
    description: string;

    @Column({ type: 'varchar', nullable: false })
    place: string;

    @Column({ type: 'varchar', nullable: false })
    imageUrl: string;

    @Column({ type: 'varchar', nullable: false })
    price: number;

    @Column({type: 'datetime', nullable: false})
    startDate: Date;

    @Column({type: 'datetime', nullable: false})
    endDate: Date;

    @Column({type: 'enum', enum: Category, nullable: false})
    category: Category;

    @OneToMany((type): typeof Schedule => Schedule, schedule => schedule.performance, {cascade: true})
    schedules: Schedule[];
  }
