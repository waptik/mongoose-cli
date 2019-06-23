import Bluebird from 'bluebird';
import path from 'path';
import fs from 'fs';
import url from 'url';
import _ from 'lodash';
import helpers from './index';
import getYArgs from '../core/yargs';

const args = getYArgs().argv;

const api = {
  config: undefined,
  rawConfig: undefined,
  error: undefined,

  init () {
    return Bluebird.resolve()
      .then(() => {
        let config;

        if (args.url) {
          config = api.parseDbUrl(args.url);
        } else {
          try {
            config = require(api.getConfigFile());
          } catch (e) {
            api.error = e;
          }
        }
        return config;
      })
      .then(config => {
        if (typeof config === 'object' || config === undefined) {
          return config;
        } else if (config.length === 1) {
          return Bluebird.promisify(config)();
        } else {
          return config();
        }
      })
      .then(config => {
        api.rawConfig = config;
      })
      .then(() => {
        // Always return the full config api
        return api;
      });
  },

  getConfigFile () {
    if (args.config) {
      return path.resolve(process.cwd(), args.config);
    }

    const defaultPath = path.resolve(process.cwd(), 'config', 'config.json');
    const alternativePath = defaultPath.replace('.json', '.js');

    return helpers.path.existsSync(alternativePath) ? alternativePath : defaultPath;
  },

  getModelsIndexFile () {
    return path.resolve(process.cwd(), 'models', 'index.js');
  },

  modelsIndexFileExists () {
    const Path = path.resolve(process.cwd(), 'models', 'index.js');

    return helpers.path.existsSync(Path);
  },

  relativeConfigFile () {
    return path.relative(process.cwd(), api.getConfigFile());
  },

  configFileExists () {
    return helpers.path.existsSync(api.getConfigFile());
  },

  getDefaultConfig () {
    return (
      JSON.stringify(
        {
          development: {
            database: {
              url: 'mongodb://localhost/mongoose_dev',
              options: {
                useNewUrlParser: true
              }
            }
          },
          test: {
            database: {
              url: 'mongodb://localhost/mongoose_test',
              options: {
                useNewUrlParser: true
              }
            }
          },
          production: {
            database: {
              protocol: 'mongodb',
              username: 'root',
              password: 'password',
              name: 'database_production',
              host: 'localhost',
              port: '',
              options: {
                useNewUrlParser: true
                //dbName: "" // uncomment this line if you use something like mongo atlas
              }
            }
          }
        },
        undefined,
        2,
      ) + '\n'
    );
  },


  writeDefaultConfig () {
    const configPath = path.dirname(api.getConfigFile());

    if (!helpers.path.existsSync(configPath)) {
      helpers.asset.mkdirp(configPath);
    }

    fs.writeFileSync(api.getConfigFile(), api.getDefaultConfig());
  },

  readConfig () {
    if (!api.config) {
      const env = helpers.generic.getEnvironment();

      if (api.rawConfig === undefined) {
        throw new Error(
          'Error reading "' +
          api.relativeConfigFile() +
          '". Error: ' + api.error
        );
      }

      if (typeof api.rawConfig !== 'object') {
        throw new Error(
          'Config must be an object or a promise for an object: ' +
          api.relativeConfigFile()
        );
      }

      if (args.url) {
        helpers.view.log('Parsed url ' + api.filteredUrl(args.url, api.rawConfig));
      } else {
        helpers.view.log('Loaded configuration file "' + api.relativeConfigFile() + '".');
      }

      if (api.rawConfig[env]) {
        helpers.view.log('Using environment "' + env + '".');

        api.rawConfig = api.rawConfig[env];
      }

      // The Sequelize library needs a function passed in to its logging option
      if (api.rawConfig.database.logging && !_.isFunction(api.rawConfig.database.logging)) {
        api.rawConfig.database.logging = console.log;
      }

      // in case url is present - we overwrite the configuration
      if (api.rawConfig.database.url) {
        api.rawConfig.database = _.merge(api.rawConfig.database, api.parseDbUrl(api.rawConfig.database.url));
      }

      api.config = api.rawConfig;
    }
    return api.config;
  },


  readConf () {

    try {
      api.config = require(api.getConfigFile());
      api.rawConfig = api.config;
    } catch (e) {
      throw new Error(
        'Error occured when looking for "' +
        api.relativeConfigFile() + '". Kindly bootstrap the project using "mongoose init" comand.'
      );
    }

    const env = helpers.generic.getEnvironment();

    if (api.rawConfig === undefined) {
      throw new Error(
        'Error reading "' +
        api.relativeConfigFile() +
        '". Error: ' + api.error
      );
    }

    if (typeof api.rawConfig !== 'object') {
      throw new Error(
        'Config must be an object: ' +
        api.relativeConfigFile()
      );
    }

    helpers.view.log('Loaded configuration file "' + api.relativeConfigFile() + '".');

    if (api.rawConfig[env]) {
      helpers.view.log('Using environment "' + env + '".');

      api.rawConfig = api.rawConfig[env];
    }


    if (api.rawConfig.database.logging && !_.isFunction(api.rawConfig.database.logging)) {
      api.rawConfig.database.logging = console.log;
    }


    // in case url is present - we overwrite the configuration
    if (api.rawConfig.database.url) {
      api.rawConfig.database = _.merge(api.rawConfig.database, api.parseDbUrl(api.rawConfig.database.url));
    }

    return api.rawConfig;
  },

  filteredUrl (uri, config) {
    const regExp = new RegExp(':?' + (config.password || '') + '@');
    return uri.replace(regExp, ':*****@');
  },

  urlStringToConfigHash (urlString) {
    try {
      const urlParts = url.parse(urlString);
      let result = {
        name: urlParts.pathname.replace(/^\//, ''),
        host: urlParts.hostname,
        port: urlParts.port ? urlParts.port : '27017',
        protocol: urlParts.protocol.replace(/:$/, ''),
        ssl: urlParts.query ? urlParts.query.indexOf('ssl=true') >= 0 : false
      };

      if (urlParts.auth) {
        result = _.assign(result, {
          username: urlParts.auth.split(':')[0],
          password: urlParts.auth.split(':')[1]
        });
      }

      return result;
    } catch (e) {
      throw new Error('Error parsing url: ' + urlString);
    }
  },

  parseDbUrl (urlString) {
    return api.urlStringToConfigHash(urlString);
  }
};

module.exports = api;
