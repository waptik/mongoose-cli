import { _baseOptions } from '../core/yargs';
import { getMigrator, ensureCollectionSchema } from '../core/migrator';

import helpers from '../helpers';

exports.builder = yargs =>
  _baseOptions(yargs).option('to', {
    describe: 'Revert to the provided migration',
    default: 0,
    type: 'string'
  }).argv;

exports.handler = async function (args) {
  await helpers.config.init();

  await migrationUndoAll(args);

  process.exit(0);
};

function migrationUndoAll (args) {
  return getMigrator('migration', args)
    .then(migrator => {
      return ensureCollectionSchema(migrator)
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