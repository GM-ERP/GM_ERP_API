import { ThirdParty } from 'src/third-party/entities/third-party.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ThirdPartyType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('uuid')
  userId: string;

  @OneToMany(() => ThirdParty, (thirdParty) => thirdParty.identificationTypeId)
  thirdParties: ThirdParty[];
}
