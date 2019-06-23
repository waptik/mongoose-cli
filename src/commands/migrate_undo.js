import { _baseOptions } from '../core/yargs';
import { getMigrator, ensureCollectionSchema } from '../core/migrator';

import helpers from '../helpers';

exports.builder = yargs =>
  _baseOptions(yargs).option('name', {
    describe: 'Name of the migration to undo',
    type: 'string'
  }).argv;

exports.handler = async function (args) {
  await helpers.config.init();

  await migrateUndo(args);

  process.exit(0);
};

function migrateUndo (args) {
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
        .then(() => {
          if (args.name) {
            return migrator.down(args.name);
          } else {
            return migrator.down();
          }
        });
    })
    .catch(e => helpers.view.error(e));
}
