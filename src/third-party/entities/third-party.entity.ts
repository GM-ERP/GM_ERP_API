import { ThirdPartyType } from 'src/third-party-type/entities/third-party-type.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ThirdParty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('uuid')
  identificationTypeId: string;

  @Column('text', { unique: true })
  identificationNumber: string;

  @Column('text', { default: null })
  address: string;

  @Column('text', { default: null })
  phone: string;

  @Column('text', { default: null })
  email: string;

  @Column('uuid')
  userId: string;

  @Column('date', { default: null })
  @DeleteDateColumn()
  removedAt?: Date;

  @Column('date', { default: null })
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(
    () => ThirdPartyType,
    (thirdPartyType) => thirdPartyType.thirdParties,
  )
  @JoinColumn({ name: 'identificationTypeId' })
  idThirdPartyType: ThirdParty;
}
