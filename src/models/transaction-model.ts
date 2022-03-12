import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import {TransactionType} from '../@types';
import {ProfileAttr, TransactionAttr} from '../@types/entities';
import Profile from './profile-model';
import Project from './project-model';

@Table
export default class Transaction extends Model implements TransactionAttr {
  @AllowNull(false)
  @Column
  accountId!: number;

  @ForeignKey(() => Project)
  @Column
  projectId?: number;

  @ForeignKey(() => Project)
  @Column
  voucherId?: number;

  @AllowNull(false)
  @Column
  transactionType!: TransactionType;

  @AllowNull(false)
  @Column
  details!: string;

  @Column
  checkNumber?: string;

  @Column
  checkPostingDate?: Date;

  @Column
  checkIssuingBank?: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  amount!: number;

  @AllowNull(false)
  @ForeignKey(() => Profile)
  @Column
  processedBy!: number;

  @BelongsTo(() => Profile)
  processedByProfile?: ProfileAttr;
}
