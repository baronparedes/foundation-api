import faker from 'faker';

import {generateAccount} from '../../@utils/fake-data';
import {initInMemoryDb, SEED} from '../../@utils/seeded-test-data';
import AccountService from '../account-service';

describe('AccountService', () => {
  const target = new AccountService();

  beforeAll(async () => {
    await initInMemoryDb();
  });

  it('should get by id', async () => {
    const expected = faker.random.arrayElement(SEED.ACCOUNTS);
    const actual = await target.getById(Number(expected.id));
    expect(actual).toEqual(expected);
  });

  it('should get all', async () => {
    const actual = await target.getAll();
    expect(actual).toEqual(SEED.ACCOUNTS);
  });

  it('should get all by name', async () => {
    const expected = faker.random.arrayElement(SEED.ACCOUNTS);
    const actualByName = await target.getAll(expected.name);
    expect(actualByName).toEqual([expected]);
  });

  describe('when managing accounts', () => {
    it('should create a new account', async () => {
      const expected = generateAccount();

      const actual = await target.create(expected);
      expect(actual).toEqual(expected);

      const actualList = await target.getAll();
      expect(actualList).toHaveLength(SEED.ACCOUNTS.length + 1);
    });

    it('should update an account', async () => {
      const expected = generateAccount();
      const created = await target.create(expected);
      const updated = {...generateAccount(), id: created.id};

      const actual = await target.update(Number(created.id), updated);
      expect(actual).toEqual({
        ...updated,
        id: created.id,
        name: created.name, // Name is immutable
      });
    });
  });
});
