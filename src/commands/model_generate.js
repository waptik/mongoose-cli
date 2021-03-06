import { _baseOptions } from '../core/yargs';

import helpers from '../helpers';
import clc from 'cli-color';

exports.builder = yargs =>
  _baseOptions(yargs)
    .option('name', {
      describe: 'Defines the name of the new model',
      type: 'string',
      demandOption: true
    })
    .option('attributes', {
      describe: 'A list of attributes',
      type: 'string',
      demandOption: true
    })
    .option('force', {
      describe: 'Forcefully re-creates model with the same name',
      type: 'string',
      demandOption: false
    }).argv;

exports.handler = function (args) {
  ensureModelsFolder();
  checkModelFileExistence(args);

  try {
    helpers.model.generateFile(args);
  } catch (err) {
    helpers.view.error(err.message);
  }

  helpers.view.log('New model was created at', clc.blueBright(helpers.path.getModelPath(args.name)), '.');

  process.exit(0);
};

function ensureModelsFolder () {
  if (!helpers.path.existsSync(helpers.path.getModelsPath())) {
    helpers.view.error(
      'Unable to find models path (' +
      helpers.path.getModelsPath() +
      '). Did you run ' +
      clc.blueBright('mongoose init') +
      '?',
    );
  }
}

function checkModelFileExistence (args) {
  const modelPath = helpers.path.getModelPath(args.name);

  if (args.force === undefined && helpers.model.modelFileExists(modelPath)) {
    helpers.view.notifyAboutExistingFile(modelPath);
    process.exit(1);
  }
}
