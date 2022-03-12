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
import {ProjectAttr} from '../@types/entities';

@Table({
  indexes: [{unique: true, fields: ['code']}],
})
export default class Project extends Model implements ProjectAttr {
  @AllowNull(false)
  @NotEmpty
  @Column(DataType.CITEXT)
  name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column(DataType.CITEXT)
  code!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  location!: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL)
  estimatedCost!: number;

  @Column
  remarks?: string;

  @AllowNull(false)
  @Default('active')
  @Column
  status!: RecordStatus;
}
