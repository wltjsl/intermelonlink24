import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column({type: 'datetime', nullable: false})
    startDate: Date;

    @Column({type: 'datetime', nullable: false})
    endDate: Date;
  }
