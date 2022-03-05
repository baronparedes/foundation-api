import {Sequelize} from 'sequelize-typescript';

import {ProfileAttr} from '../@types/entities';
import {useHash} from '../hooks/use-hash';
import Profile from '../models/profile-model';
import {generateProfile} from './fake-data';

const {hash} = useHash();

export const PROFILE_CREDS = 'testpassword';

export const PROFILE_ADMIN: ProfileAttr = {
  ...generateProfile(),
  id: 1,
  username: 'testadmin',
  password: hash(PROFILE_CREDS),
  type: 'admin',
  status: 'active',
};

export const PROFILE_USER: ProfileAttr = {
  ...generateProfile(),
  id: 2,
  username: 'testuser',
  password: hash(PROFILE_CREDS),
  type: 'unit owner',
  status: 'active',
};

export const PROFILE_STAKEHOLDER: ProfileAttr = {
  ...generateProfile(),
  id: 3,
  username: 'teststakeholder',
  password: hash(PROFILE_CREDS),
  type: 'stakeholder',
  status: 'active',
};

export const PROFILE_INACTIVE: ProfileAttr = {
  ...generateProfile(),
  id: 4,
  username: 'testinactive',
  password: hash(PROFILE_CREDS),
  status: 'inactive',
};

export const SEED = {
  PROFILES: [PROFILE_ADMIN, PROFILE_USER, PROFILE_STAKEHOLDER],
};

async function seedTestData() {
  await Profile.bulkCreate([...SEED.PROFILES, PROFILE_INACTIVE]);
}

export async function initInMemoryDb(opts?: {
  debug?: boolean;
  persist?: boolean;
}) {
  const sequelize = new Sequelize({
    host: opts?.persist ? './test-db.sqlite' : ':memory:',
    dialect: 'sqlite',
    define: {underscored: true},
    models: [`${process.cwd()}/src/models`],
    logging: opts?.debug ? console.log : false,
  });
  await sequelize.authenticate();
  await sequelize.sync({force: true});
  await seedTestData();
  return sequelize;
}
