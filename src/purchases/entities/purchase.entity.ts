import { ThirdParty } from 'src/third-party/entities/third-party.entity';
import {
  Column,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  productId: string;

  @Column('number', { default: 0 })
  quantity: number;

  @Column('numeric', { default: 0 })
  price: number;

  @Column('uuid')
  thirdPartyId: string;

  @Column('uuid')
  userId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('date', { default: null })
  @DeleteDateColumn()
  removedAt?: Date;

  @Column('date', { default: null })
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => ThirdParty, (thirdParty) => thirdParty.purchases)
  @JoinColumn({ name: 'thirdPartyId' })
  thirdPartyIdPurchase: ThirdParty;
}
