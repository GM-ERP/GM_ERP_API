import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column()
  userId: string;

  @Column({ default: null })
  description?: string;

  @Column('date', { default: null })
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column('date', { default: null })
  @DeleteDateColumn()
  removedAt?: Date;
}
