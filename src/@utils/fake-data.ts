import faker from 'faker';

import {ProfileType, RecordStatus} from '../@types';
import {ProfileAttr, ProjectAttr} from '../@types/entities';
import {AuthProfile, RegisterProfile} from '../@types/models';

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
