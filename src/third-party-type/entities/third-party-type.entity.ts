import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ThirdPartyType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column()
  userId: string;
}
