import { _baseOptions } from '../core/yargs';

import _ from 'lodash';
import helpers from '../helpers';
import fs from 'fs';
import clc from 'cli-color';

exports.builder = yargs =>
  _baseOptions(yargs).option('name', {
    describe: 'Defines the name of the migration',
    type: 'string',
    demandOption: true
  }).argv;

const generateMigrationName = args => {
  return _.trimStart(_.kebabCase(args.name), '-');
};

exports.handler = function (args) {
  helpers.init.createMigrationsFolder();


  fs.writeFileSync(
    helpers.path.getMigrationPath(generateMigrationName(args)),
    helpers.template.render(
      'migrations/skeleton.js',
      {},
      {
        beautify: false
      },
    ),
  );

  helpers.view.log('New migration was created at', clc.blueBright(helpers.path.getMigrationPath(generateMigrationName(args))), '.');

  process.exit(0);
};
