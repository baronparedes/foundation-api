import {
  AllowNull,
  Column,
  DataType,
  Model,
  NotEmpty,
  Table,
} from 'sequelize-typescript';

import {ProjectAttr} from '../@types/entities';

@Table({
  indexes: [{unique: true, fields: ['name', 'code']}],
})
class Project extends Model implements ProjectAttr {
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

  @AllowNull(true)
  @Column
  remarks?: string;
}

export default Project;
