import {Dialect} from 'sequelize';
import {Sequelize} from 'sequelize-typescript';

import profilesData from './@seed/profiles.json';
import config from './config';
import Profile from './models/profile-model';

const sequelize = new Sequelize(
  config.DB.DB_NAME,
  config.DB.USER_NAME,
  config.DB.PASSWORD,
  {
    host: config.DB.HOST,
    port: Number(config.DB.PORT),
    dialect: config.DB.DIALECT as Dialect,
    models: [`${__dirname}/models`],
    define: {underscored: true},
    logging: !config.IS_PROD ? console.log : false,
  }
);

async function seed() {
  await Profile.bulkCreate(profilesData, {
    updateOnDuplicate: ['username', 'type', 'status'],
  });
}

async function enableExtensions() {
  await sequelize.query(
    'CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;'
  );
}

export async function dbInit() {
  await sequelize.authenticate();
  await enableExtensions();
  if (config.DB.SYNC) await sequelize.sync({alter: true});
  if (config.DB.SEED) await seed();
}

export default sequelize;
