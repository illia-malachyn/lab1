import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('humidity_sensors')
export class HumiditySensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column({
    type: 'double precision',
  })
  value: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  unit: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
    default: () => 'NOW()',
  })
  timestamp: Date;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;
}
