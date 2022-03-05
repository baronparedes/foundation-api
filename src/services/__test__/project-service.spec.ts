import faker from 'faker';

import {generateProject} from '../../@utils/fake-data';
import {initInMemoryDb, SEED} from '../../@utils/seeded-test-data';
import ProjectService from '../project-service';

describe('ProjectService', () => {
  const target = new ProjectService();

  beforeAll(async () => {
    await initInMemoryDb();
  });

  it('should get by id', async () => {
    const expected = faker.random.arrayElement(SEED.PROJECTS);
    const actual = await target.getById(Number(expected.id));
    expect(actual).toEqual(expected);
  });

  it('should get all', async () => {
    const actual = await target.getAll();
    expect(actual).toEqual(SEED.PROJECTS);
  });

  it('should get all by code or name', async () => {
    const expected = faker.random.arrayElement(SEED.PROJECTS);
    const actualByCode = await target.getAll(expected.code);
    expect(actualByCode).toEqual([expected]);

    const actualByName = await target.getAll(expected.name);
    expect(actualByName).toEqual([expected]);
  });

  describe('when managing projects', () => {
    it('should create a new project', async () => {
      const expected = generateProject();

      const actual = await target.create(expected);
      expect(actual).toEqual(expected);

      const actualList = await target.getAll();
      expect(actualList).toHaveLength(SEED.PROJECTS.length + 1);
    });

    it('should update a project', async () => {
      const expected = generateProject();
      const created = await target.create(expected);
      const updated = {...generateProject(), id: created.id};

      const actual = await target.update(Number(created.id), updated);
      expect(actual).toEqual({
        ...updated,
        id: created.id,
        code: created.code, // Code is immutable
      });
    });
  });
});
