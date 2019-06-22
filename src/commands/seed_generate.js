import { _baseOptions } from '../core/yargs';
import _ from 'lodash';
import helpers from '../helpers';
import fs from 'fs';
import clc from 'cli-color';



exports.builder =
  yargs =>
    _baseOptions(yargs)
      .option('name', {
        describe: 'Defines the name of the seed',
        type: 'string',
        demandOption: true
      })
      .argv;


const generateSeederName = args => {
  return _.trimStart(_.kebabCase(args.name), '-');
};

exports.handler = function (args) {
  helpers.init.createSeedersFolder();

  fs.writeFileSync(
    helpers.path.getSeederPath(generateSeederName(args)),
    helpers.template.render('seeders/skeleton.js', {}, {
      beautify: false
    })
  );

  helpers.view.log(
    'New seed was created at',
    clc.blueBright(helpers.path.getSeederPath(generateSeederName(args))),
    '.'
  );

  process.exit(0);
};
