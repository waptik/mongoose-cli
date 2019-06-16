#!/usr/bin/env node

import clc from 'cli-color';
import getYArgs from './core/yargs';
import Promise from 'bluebird';
import { isEmpty } from 'lodash';

const yargs = getYArgs();

Promise.coroutine.addYieldHandler(yieldedValue => {
  if (Array.isArray(yieldedValue)) {
    return Promise.all(yieldedValue);
  }
});

Promise.coroutine.addYieldHandler(yieldedValue => {
  if (isEmpty(yieldedValue)) {
    return Promise.resolve(yieldedValue);
  }
});

import init from './commands/init';
//import migrate from './commands/migrate';
// import migrateUndo from './commands/migrate_undo';
// import migrateUndoAll from './commands/migrate_undo_all';
// import migrationGenerate from './commands/migration_generate';
import modelGenerate from './commands/model_generate';

import helpers from './helpers/index';

helpers.view.teaser();

const cli = yargs
  .help()
  .version()
  // .command('db:migrate', 'Run pending migrations', migrate)
  // .command('db:migrate:status', 'List the status of all migrations', migrate)
  // .command('db:migrate:undo', 'Reverts a migration', migrateUndo)
  // .command('db:migrate:undo:all', 'Revert all migrations ran', migrateUndoAll)
  .command('init', 'Initializes project', init)
  .command('init:config', 'Initializes configuration', init)
  .command('init:migrations', 'Initializes migrations', init)
  .command('init:models', 'Initializes models', init)
  // .command(['migration:generate', 'migration:create'], 'Generates a new migration file', migrationGenerate)
  .command(['model:generate', 'model:create'], 'Generates a model and its migration', modelGenerate)
  .wrap(yargs.terminalWidth())
  .strict();

const args = cli.argv;

clc.white(args);

// if no command then show help
if (!args._[0]) {
  clc.white(cli.showHelp());
}
