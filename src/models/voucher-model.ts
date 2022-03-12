import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import {ProfileAttr, VoucherAttr} from '../@types/entities';
import Profile from './profile-model';
import Project from './project-model';

@Table({
  indexes: [{unique: true, fields: ['series']}],
})
export default class Voucher extends Model implements VoucherAttr {
  @AllowNull(false)
  @Column(DataType.CITEXT)
  series!: string;

  @AllowNull(false)
  @ForeignKey(() => Project)
  @Column
  projectId!: number;

  @AllowNull(false)
  @Column
  description!: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  totalCost!: number;

  @Column
  remarks?: string;

  @Column
  closed?: boolean;

  @AllowNull(false)
  @ForeignKey(() => Profile)
  @Column
  processedBy!: number;

  @BelongsTo(() => Profile)
  processedByProfile?: ProfileAttr;
}
