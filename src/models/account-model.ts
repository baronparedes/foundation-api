import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  NotEmpty,
  Table,
} from 'sequelize-typescript';

import {RecordStatus} from '../@types';
import {AccountAttr} from '../@types/entities';

@Table({
  indexes: [{unique: true, fields: ['name']}],
})
export default class Account extends Model implements AccountAttr {
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.CITEXT)
  name!: string;

  @Column
  remarks?: string;

  @AllowNull(false)
  @Default('active')
  @Column
  status!: RecordStatus;
}
