#!/usr/bin/env node

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

import helpers from './helpers/index';

helpers.view.teaser();

const cli = yargs
  .help()
  .version()
  .command('init', 'Initializes project', init)
  .command('init:config', 'Initializes configuration', init)
  .command('init:migrations', 'Initializes migrations', init)
  .command('init:models', 'Initializes models', init)
  .command('init:seeders', 'Initializes seeders', init)
  .wrap(yargs.terminalWidth())
  .strict();

const args = cli.argv;

// if no command then show help
if (!args._[0]) {
  cli.showHelp();
}
