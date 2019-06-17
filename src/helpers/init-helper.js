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
      helpers.view.ok(
        'Successfully created ' + clc.blueBright(folderName) + ' folder at "' + clc.blueBright(folder) + '".',
      );
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
          configFile: "__dirname + '/" + relativeConfigPath.replace(/\\/g, '/') + "'",
          // the following are used to bypass `config` not found property issue
          database: '${config.database.name}',
          host: '${config.database.host}',
          username: '${config.database.username}',
          password: '${config.database.password}',
          port: '${config.database.port}',
          protocol: '${config.database.protocol}'
        },
        {
          beautify: false
        },
      );

      const writeModelIndexFile = helpers.asset.write(indexPath, renderModelIndex);

      writeModelIndexFile;
    }
  }
};

module.exports = init;
module.exports.default = init;
