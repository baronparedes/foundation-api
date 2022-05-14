import {AggregateOptions, FindOptions, Op} from 'sequelize';

import {ProjectAttr, TransactionAttr, VoucherAttr} from '../@types/entities';
import {DisburseProjectFund} from '../@types/models';
import {iLike} from '../@utils/helpers-sequelize';
import {VERBIAGE} from '../constants';
import Project from '../models/project-model';
import Transaction from '../models/transaction-model';
import Voucher from '../models/voucher-model';
import BaseService from './@base-service';

export function mapProject(data: Project): ProjectAttr {
  return {
    id: Number(data.id),
    name: data.name,
    code: data.code,
    location: data.location,
    estimatedCost: data.estimatedCost,
    status: data.status,
    remarks: data.remarks,
  };
}

export function mapVoucher(data: Voucher): VoucherAttr {
  return {
    id: Number(data.id),
    projectId: Number(data.projectId),
    description: data.description,
    processedBy: data.processedBy,
    series: data.series,
    totalCost: Number(data.totalCost),
    closed: data.closed,
    remarks: data.remarks,
  };
}

export function mapTransaction(data: Transaction): TransactionAttr {
  return {
    id: Number(data.id),
    voucherId: data.voucherId,
    accountId: data.accountId,
    projectId: data.projectId,
    amount: Number(data.amount),
    details: data.details,
    processedBy: data.processedBy,
    transactionType: data.transactionType,
    checkIssuingBank: data.checkIssuingBank,
    checkNumber: data.checkNumber,
    checkPostingDate: data.checkPostingDate,
  };
}

export default class ProjectService extends BaseService {
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

  public async getProjectCost(id: number) {
    const opts: AggregateOptions<Transaction> = {
      where: {
        projectId: id,
      },
    };
    const result = await Transaction.sum('amount', opts);
    return result;
  }

  public async getVouchers(id: number) {
    const result = await Voucher.findAll({where: {projectId: id}});
    return result.map(d => mapVoucher(d));
  }

  public async getTransactions(id: number) {
    const result = await Transaction.findAll({where: {projectId: id}});
    return result.map(d => mapTransaction(d));
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
    result.remarks = data.remarks;
    result.status = data.status;
    await result.save();
    return mapProject(result);
  }

  public async depositFund(id: number, details: TransactionAttr) {
    await Transaction.create({
      ...details,
      projectId: id,
      amount: details.amount * 1,
    });
  }

  public async disburseFund(id: number, details: DisburseProjectFund) {
    return await this.repository.transaction(async () => {
      const {
        description,
        processedBy,
        accountId,
        amount,
        series,
        transactionType,
        checkIssuingBank,
        checkNumber,
        checkPostingDate,
        remarks,
      } = details;
      const voucher: VoucherAttr = {
        description,
        processedBy,
        projectId: id,
        series,
        totalCost: amount,
        remarks,
      };
      const savedVoucher = await Voucher.create(voucher);
      const trans: TransactionAttr = {
        accountId,
        projectId: id,
        voucherId: savedVoucher.id,
        amount: amount * -1,
        details: description,
        processedBy,
        transactionType,
        checkIssuingBank,
        checkNumber,
        checkPostingDate,
      };
      await Transaction.create(trans);
    });
  }
}
