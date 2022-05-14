import faker from 'faker';

import {TransactionAttr} from '../../@types/entities';
import {DisburseProjectFund} from '../../@types/models';
import {
  generateDisburseProjectFund,
  generateProject,
  generateTransaction,
} from '../../@utils/fake-data';
import {initInMemoryDb, SEED} from '../../@utils/seeded-test-data';
import Transaction from '../../models/transaction-model';
import ProjectService from '../project-service';

describe('ProjectService', () => {
  let target: ProjectService;

  beforeAll(async () => {
    const sequelize = await initInMemoryDb();
    target = new ProjectService(sequelize);
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

    it('should deposit project funds', async () => {
      const project = await target.create(generateProject());
      const account = faker.random.arrayElement(SEED.ACCOUNTS);
      const profile = faker.random.arrayElement(SEED.PROFILES);
      const data: TransactionAttr = {
        ...generateTransaction(),
        accountId: Number(account.id),
        processedBy: Number(profile.id),
        projectId: Number(project.id),
      };

      await target.depositFund(Number(project.id), data);
      const projectCost = await target.getProjectCost(Number(project.id));
      expect(projectCost).toEqual(data.amount);

      const savedTransaction = await Transaction.findOne({
        where: {
          accountId: Number(account.id),
          projectId: Number(project.id),
          processedBy: Number(profile.id),
          amount: data.amount * 1,
          details: data.details,
          transactionType: data.transactionType,
          checkIssuingBank: data.checkIssuingBank,
          checkNumber: data.checkNumber,
          checkPostingDate: data.checkPostingDate,
        },
      });
      expect(savedTransaction).not.toBeNull();
    });

    it('should disburse project funds', async () => {
      const project = await target.create(generateProject());
      const account = faker.random.arrayElement(SEED.ACCOUNTS);
      const profile = faker.random.arrayElement(SEED.PROFILES);
      const data: DisburseProjectFund = {
        ...generateDisburseProjectFund(),
        accountId: Number(account.id),
        processedBy: Number(profile.id),
      };

      await target.disburseFund(Number(project.id), data);

      const projectCost = await target.getProjectCost(Number(project.id));
      expect(projectCost).toEqual(data.amount * -1);

      const vouchers = await target.getVouchers(Number(project.id));
      const savedVoucher = vouchers.find(v => {
        v.projectId === Number(project.id) &&
          v.processedBy === Number(profile.id) &&
          v.description === data.description &&
          v.series === data.series &&
          v.totalCost === data.amount &&
          v.remarks === data.remarks;
      });
      expect(savedVoucher).not.toBeNull();

      const transactions = await target.getTransactions(Number(project.id));
      const savedTransaction = transactions.find(t => {
        t.voucherId === Number(savedVoucher?.id) &&
          t.accountId === Number(account.id) &&
          t.projectId === Number(project.id) &&
          t.processedBy === Number(profile.id) &&
          t.amount === data.amount * -1 &&
          t.details === data.description &&
          t.transactionType === data.transactionType &&
          t.checkIssuingBank === data.checkIssuingBank &&
          t.checkNumber === data.checkNumber &&
          t.checkPostingDate === data.checkPostingDate;
      });
      expect(savedTransaction).not.toBeNull();
    });
  });
});
