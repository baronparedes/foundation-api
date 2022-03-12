import faker from 'faker';

import {generateAccount} from '../../@utils/fake-data';
import AccountService from '../../services/account-service';
import {AccountController} from '../account-controller';

describe('AccountController', () => {
  it('should get all', async () => {
    const searchCriteria = faker.random.words();
    const data = [generateAccount(), generateAccount()];
    const mock = jest
      .spyOn(AccountService.prototype, 'getAll')
      .mockReturnValueOnce(new Promise(resolve => resolve(data)));
    const target = new AccountController();
    const actual = await target.getAll(searchCriteria);
    expect(actual).toStrictEqual(data);
    expect(mock).toBeCalledWith(searchCriteria);
    expect(mock).toBeCalledTimes(1);
  });

  it('should create account details', async () => {
    const data = generateAccount();
    const mock = jest
      .spyOn(AccountService.prototype, 'update')
      .mockReturnValueOnce(new Promise(resolve => resolve(data)));
    const target = new AccountController();
    const actual = await target.updateAccount(Number(data.id), data);

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(data.id, data);
    expect(actual).toBe(data);
  });

  it('should update account details', async () => {
    const data = generateAccount();
    const mock = jest
      .spyOn(AccountService.prototype, 'create')
      .mockReturnValueOnce(new Promise(resolve => resolve(data)));
    const target = new AccountController();
    const actual = await target.createAccount(data);

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith(data);
    expect(actual).toBe(data);
  });
});
