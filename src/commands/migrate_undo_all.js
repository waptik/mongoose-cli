import { _baseOptions } from '../core/yargs';
import { getMigrator, ensureCurrentMetaSchema } from '../core/migrator';

import helpers from '../helpers';

exports.builder = yargs =>
  _baseOptions(yargs).option('to', {
    describe: 'Revert to the provided migration',
    default: 0,
    type: 'string'
  }).argv;

exports.handler = async function (args) {

  await migrationUndoAll(args);

  process.exit(0);
};

function migrationUndoAll (args) {
  return getMigrator('migration', args)
    .then(migrator => {
      return ensureCurrentMetaSchema(migrator)
        .then(() => migrator.executed())
        .then(migrations => {
          if (migrations.length === 0) {
            helpers.view.log('No executed migrations found.');
            process.exit(0);
          }
        })
        .then(() => migrator.down({ to: args.to || 0 }));
    })
    .catch(e => helpers.view.error(e));
}


// readConfig () {

//   try {
//     api.config = require(api.getConfigFile());
//     api.rawConfig = api.config;
//   } catch (e) {
//     throw new Error(
//       'Error occured when looking for "' +
//         api.relativeConfigFile() + '". Kindly bootstrap the project using "mongoose init" comand.'
//     );
//   }

//   const env = helpers.generic.getEnvironment();

//   if (api.rawConfig === undefined) {
//     throw new Error(
//       'Error reading "' +
//       api.relativeConfigFile() +
//       '". Error: ' + api.error
//     );
//   }

//   if (typeof api.rawConfig !== 'object') {
//     throw new Error(
//       'Config must be an object: ' +
//       api.relativeConfigFile()
//     );
//   }

//   helpers.view.log('Loaded configuration file "' + api.relativeConfigFile() + '".');

//   if (api.rawConfig[env]) {
//     helpers.view.log('Using environment "' + env + '".');

//     api.rawConfig = api.rawConfig[env];
//   }


//   if (api.rawConfig.database.logging && !_.isFunction(api.rawConfig.database.logging)) {
//     api.rawConfig.database.logging = console.log;
//   }


//   // in case url is present - we overwrite the configuration
//   if (api.rawConfig.database.url) {
//     api.rawConfig.database = _.merge(api.rawConfig.database, api.parseDbUrl(api.rawConfig.database.url));
//   }

//   return api.rawConfig;
// },
