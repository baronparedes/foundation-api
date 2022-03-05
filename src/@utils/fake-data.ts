import faker from 'faker';

import {ProfileType, RecordStatus} from '../@types';
import {ProfileAttr} from '../@types/entities';
import {AuthProfile, RegisterProfile} from '../@types/models';

export const generateAuthProfile = (
  type: ProfileType = 'unit owner'
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

export const generateProfile = (
  type: ProfileType = 'unit owner'
): ProfileAttr => {
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
