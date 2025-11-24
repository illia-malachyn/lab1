import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('light_sensors')
export class LightSensor {
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
