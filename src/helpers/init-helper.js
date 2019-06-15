import clc from 'cli-color';
import helpers from './index';
import path from 'path';
import fs from 'fs';

function createFolder (folderName, folder, force) {
  if (force && fs.existsSync(folder) === true) {
    helpers.view.warn('Deleting the ' + clc.blueBright(folderName) + ' folder. (--force)');

    try {
      fs.readdirSync(folder).forEach(filename => {
        fs.unlinkSync(path.resolve(folder, filename));
      });
    } catch (e) {
      helpers.view.error(e);
    }

    try {
      fs.rmdirSync(folder);
      helpers.view.ok('Successfully deleted the ' + clc.blueBright(folderName) + ' folder.');
    } catch (e) {
      helpers.view.error(e);
    }
  }

  try {
    if (fs.existsSync(folder) === false) {
      helpers.asset.mkdirp(folder);
      helpers.view.ok('Successfully created ' + clc.blueBright(folderName) + ' folder at "' + folder + '".');
    } else {
      helpers.view.error(clc.blueBright(folderName) + ' folder at "' + clc.blueBright(folder) + '" already exists.');
    }
  } catch (e) {
    helpers.view.error(e);
  }
}

const init = {
  createMigrationsFolder: force => {
    createFolder('migrations', helpers.path.getPath('migration'), force);
  },

  createModelsFolder: force => {
    createFolder('models', helpers.path.getModelsPath(), force);
  },

  createModelsIndexFile: force => {
    const modelsPath = helpers.path.getModelsPath();
    const indexPath = path.resolve(modelsPath, helpers.path.addFileExtension('index'));

    if (!helpers.path.existsSync(modelsPath)) {
      helpers.view.error('Models folder not available.');
    } else if (helpers.path.existsSync(indexPath) && !force) {
      helpers.view.notifyAboutExistingFile(indexPath);
    } else {

      const relativeConfigPath = path.relative(helpers.path.getModelsPath(), helpers.config.getConfigFile());

      const renderModelIndex = helpers.template.render(
        'models/index.js',
        {
          configFile: "__dirname + '/" + relativeConfigPath.replace(/\\/g, '/') + "'"
        },
        {
          beautify: false
        },
      )

      helpers.view.info('model Index path: ' + indexPath + '\n\n' + 'Relative config path: ' + relativeConfigPath + '\n\n');

      const writeModelIndexFile = helpers.asset.write(
        indexPath,
        renderModelIndex,
      );

      helpers.view.info('Render model index file: ' + renderModelIndex + '\n\n' + 'Write to model index file: ' + writeModelIndexFile + '\n\n');

      writeModelIndexFile;
    }
  }
};

module.exports = init;
module.exports.default = init;
