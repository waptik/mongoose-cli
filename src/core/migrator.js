import Umzug from 'umzug';
import Bluebird from 'bluebird';
import helpers from '../helpers/';

export function getMigrator (type, args) {

  const { models } = require(helpers.config.getModelsIndexFile());
  const mongoose = require(helpers.config.getModelsIndexFile());


  return Bluebird.try(() => {
    if (!(helpers.config.configFileExists() || args.url)) {
      helpers.view.error(
        'Cannot find "' +
        helpers.config.getConfigFile() +
        '". Have you initialized mongoosejs-cli in your project by running "mongoose init"?',
      );
      process.exit(1);
    }
    const sOptions = {};
    sOptions.connection = mongoose.connection;

    const migrator = new Umzug({
      storage: helpers.umzug.getStorage(type),
      storageOptions: helpers.umzug.getStorageOptions(type, sOptions),
      logging: helpers.view.log,
      migrations: {
        params: [models, mongoose],
        path: helpers.path.getPath(type),
        pattern: /\.js$/,
        wrap: fun => {
          if (fun.length === 3) {
            return Bluebird.promisify(fun);
          } else {
            return fun;
          }
        }
      }
    });

    try {
      return migrator;
    } catch (e) {
      helpers.view.error(e);
    }
  });
}

export function ensureCollectionSchema (migrator) {
  const connection = migrator.options.storageOptions.connection;
  const collectionName = migrator.options.storageOptions.collectionName;

  return ensureCollection(connection, collectionName)
    .then(collection => {
      const fields = Object.keys(collection);

      if (fields.length === 3 && (fields.indexOf('createdAt') || fields.indexOf('created_at')) >= 0) {
        return;
      }
    })
    .catch(() => { });
}

function ensureCollection (connection, collectionName) {
  return connection.then(() => {

    if (!connection.collections[collectionName]) {
      throw new Error(`No migrations collection for ${collectionName} was found.`);
    }

    return;
  });
}
