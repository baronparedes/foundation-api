import faker from 'faker';

import {ProfileType, RecordStatus, TransactionType} from '../@types';
import {
  AccountAttr,
  ProfileAttr,
  ProjectAttr,
  TransactionAttr,
} from '../@types/entities';
import {
  AuthProfile,
  DisburseProjectFund,
  RegisterProfile,
} from '../@types/models';

export const generateAuthProfile = (
  type: ProfileType = 'user'
): AuthProfile => {
  return {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    mobileNumber: faker.phone.phoneNumber(),
    status: faker.random.arrayElement<RecordStatus>(['active', 'inactive']),
    type,
  };
};

export const generateRegisterProfile = (): RegisterProfile => {
  return {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    mobileNumber: faker.phone.phoneNumber(),
  };
};

export const generateProfile = (type: ProfileType = 'user'): ProfileAttr => {
  return {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    mobileNumber: faker.phone.phoneNumber(),
    status: faker.random.arrayElement<RecordStatus>(['active', 'inactive']),
    type,
    remarks: faker.random.words(),
  };
};

export const generateProject = (): ProjectAttr => {
  return {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    code: faker.random.alphaNumeric(5),
    location: faker.address.city(),
    estimatedCost: Number(faker.finance.amount(undefined, undefined, 2)),
    remarks: faker.random.words(),
    status: faker.random.arrayElement<RecordStatus>(['active', 'inactive']),
  };
};

export const generateAccount = (): AccountAttr => {
  return {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    remarks: faker.random.words(),
    status: faker.random.arrayElement<RecordStatus>(['active', 'inactive']),
  };
};

export const generateDisburseProjectFund = (): DisburseProjectFund => {
  return {
    accountId: faker.datatype.number(),
    amount: Number(faker.finance.amount()),
    description: faker.random.words(),
    processedBy: faker.datatype.number(),
    series: faker.random.alphaNumeric(),
    transactionType: faker.random.arrayElement<TransactionType>([
      'cash',
      'check',
    ]),
    checkIssuingBank: faker.finance.accountName(),
    checkNumber: faker.random.alphaNumeric(),
    checkPostingDate: faker.date.future(),
    remarks: faker.random.words(),
  };
};

export const generateTransaction = (): TransactionAttr => {
  return {
    accountId: faker.datatype.number(),
    amount: Number(faker.finance.amount()),
    details: faker.random.words(),
    processedBy: faker.datatype.number(),
    transactionType: faker.random.arrayElement<TransactionType>([
      'cash',
      'check',
    ]),
    checkIssuingBank: faker.finance.accountName(),
    checkNumber: faker.random.alphaNumeric(),
    checkPostingDate: faker.date.future(),
    projectId: faker.datatype.number(),
    voucherId: faker.datatype.number(),
  };
};
