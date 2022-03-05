import faker from 'faker';

import {generateProject} from '../../@utils/fake-data';
import ProjectService from '../../services/project-service';
import {ProjectController} from '../project-controller';

describe('ProjectController', () => {
  it('should get all', async () => {
    const searchCriteria = faker.random.words();
    const data = [generateProject(), generateProject()];
    const mock = jest
      .spyOn(ProjectService.prototype, 'getAll')
      .mockReturnValueOnce(new Promise(resolve => resolve(data)));
    const target = new ProjectController();
    const actual = await target.getAll(searchCriteria);
    expect(actual).toStrictEqual(data);
    expect(mock).toBeCalledWith(searchCriteria);
    expect(mock).toBeCalledTimes(1);
  });

  it('should create project details', async () => {
    const data = generateProject();
    const mock = jest
      .spyOn(ProjectService.prototype, 'update')
      .mockReturnValueOnce(new Promise(resolve => resolve(data)));
    const target = new ProjectController();
    const actual = await target.updateProject(Number(data.id), data);

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(data.id, data);
    expect(actual).toBe(data);
  });

  it('should update project details', async () => {
    const data = generateProject();
    const mock = jest
      .spyOn(ProjectService.prototype, 'create')
      .mockReturnValueOnce(new Promise(resolve => resolve(data)));
    const target = new ProjectController();
    const actual = await target.createProject(data);

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(data);
    expect(actual).toBe(data);
  });
});
