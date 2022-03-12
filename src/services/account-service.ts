import {FindOptions, Op} from 'sequelize';

import {AccountAttr} from '../@types/entities';
import {iLike} from '../@utils/helpers-sequelize';
import {VERBIAGE} from '../constants';
import Account from '../models/account-model';

export function mapAccount(data: Account): AccountAttr {
  return {
    id: Number(data.id),
    name: data.name,
    status: data.status,
    remarks: data.remarks,
  };
}

export default class AccountService {
  public async getAll(search?: string) {
    const criteria = (column: string) => {
      return iLike(column, search);
    };
    const opts: FindOptions<Account> = {
      where: {
        [Op.or]: [criteria('name')],
      },
    };
    const result = await Account.findAll(search ? opts : {});
    return result.map(p => mapAccount(p));
  }

  public async getById(id: number) {
    const result = await Account.findByPk(id);
    if (!result) {
      throw new Error(VERBIAGE.NOT_FOUND);
    }
    return mapAccount(result);
  }

  public async create(project: AccountAttr) {
    const result = await Account.create(project);
    return mapAccount(result);
  }

  public async update(id: number, data: AccountAttr) {
    const result = await Account.findByPk(id);
    if (!result) {
      throw new Error(VERBIAGE.NOT_FOUND);
    }
    result.remarks = data.remarks;
    result.status = data.status;
    await result.save();
    return mapAccount(result);
  }
}
