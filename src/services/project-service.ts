import {FindOptions, Op} from 'sequelize';

import {ProjectAttr} from '../@types/entities';
import {iLike} from '../@utils/helpers-sequelize';
import {VERBIAGE} from '../constants';
import Project from '../models/project-model';
import {mapProject} from './@mappers';

export default class ProjectService {
  public async getAll(search?: string) {
    const criteria = (column: string) => {
      return iLike(column, search);
    };
    const opts: FindOptions<Project> = {
      where: {
        [Op.or]: [criteria('name'), criteria('code')],
      },
    };
    const result = await Project.findAll(search ? opts : {});
    return result.map(p => mapProject(p));
  }

  public async getById(id: number) {
    const result = await Project.findByPk(id);
    if (!result) {
      throw new Error(VERBIAGE.NOT_FOUND);
    }
    return mapProject(result);
  }

  public async create(project: ProjectAttr) {
    const result = await Project.create(project);
    return mapProject(result);
  }

  public async update(id: number, data: ProjectAttr) {
    const result = await Project.findByPk(id);
    if (!result) {
      throw new Error(VERBIAGE.NOT_FOUND);
    }
    result.name = data.name;
    result.location = data.location;
    result.estimatedCost = data.estimatedCost;
    result.remarks = data.remarks ?? undefined;
    await result.save();
    return mapProject(result);
  }
}
