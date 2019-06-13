import Umzug from 'umzug';
import Bluebird from 'bluebird';
import _ from 'lodash';
import { resolve } from 'path';
import helpers from '../helpers/index';

// let's get the mongoose package if installed on the user's machine
const Mongoose = helpers.generic.getMongoose();

export function logMigrator(s) {
  if (s.indexOf('Executing') !== 0) {
    helpers.view.log(s);
  }
}

function getMongooseInstance() {
  let config = null;

  try {
    config = helpers.config.readConfig();
  } catch (e) {
    helpers.view.error(e);
  }

  config = _.defaults(config, { logging: logMigrator });

  try {
    Mongoose.connect(config.database.url, config.database.options);
    return Mongoose;
  } catch (e) {
    helpers.view.error(e);
  }
}

// mongoose instance things related
const mongoose = getMongooseInstance();

export function getMigrator(type, args) {
  return Bluebird.try(() => {
    if (!(helpers.config.configFileExists() || args.url)) {
      helpers.view.error(
        'Cannot find "' +
          helpers.config.getConfigFile() +
          '". Have you initialized mongoose-cmd in your project by running "mongoose init"?',
      );
      process.exit(1);
    }

    const migrator = connection => {
      const sOptions = {};
      sOptions.connection = connection;
      new Umzug({
        storage: resolve(__dirname, 'storage'),
        storageOptions: helpers.umzug.getStorageOptions(type, sOptions),
        logging: helpers.view.log,
        migrations: {
          params: [connection, Promise],
          path: helpers.path.getPath(type),
          pattern: /\.js$/,
          wrap: fun => {
            if (fun.length === 3) {
              return Bluebird.promisify(fun);
            } else {
              return fun;
            }
          },
        },
      });
    };

    return mongoose.connection.then(res => migrator(res)).catch(e => helpers.view.error(e));
  });
}

export function ensureCurrentMetaSchema(migrator) {
  const connection = migrator.options.storageOptions.connection.connection;
  const collectionName = migrator.options.storageOptions.collectionName;

  return ensureMetaTable(connection, collectionName)
    .then(collection => {
      const fields = Object.keys(collection);

      if (fields.length === 3 && (fields.indexOf('createdAt') || fields.indexOf('created_at')) >= 0) {
        return;
      }
    })
    .catch(() => {});
}

function ensureMetaTable(connection, collectionName) {
  const array = [];

  return connection.then(res => {
    if (
      res.db.listCollections().toArray((err, names) => {
        if (err) {
          throw new Error(`Something went wrong ${err}`);
        }

        names.map(c => {
          array.push(c.name);
        });

        if (array.indexOf(collectionName) === -1) {
          throw new Error('No Collection for migraions found.');
        }
      })
    )
      return;
  });
}
