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

            console.log('\n\ninit() 1st then: ', config);

          } catch (e) {
            api.error = e;

            console.log('\n\ninit() 1st then: ', api.error);

          }
        }

        console.log('\n\ninit() 1st then, return config: ', config);

        return config;
      })
      .then(config => {
        if (typeof config === 'object' || config === undefined) {

          console.log('\n\ninit() 2nd then: ', config);

          return config;
        } else if (config.length === 1) {

          console.log('\n\ninit() 2nd then, return promisify: \n', Bluebird.promisify(config)());

          return Bluebird.promisify(config)();
        } else {

          console.log('\n\ninit() 2nd then, return config(): ', config());

          return config();
        }
      })
      .then(config => {
        api.rawConfig = config;

        console.log('\n\ninit() 3rd then, rawConfig: ', api.rawConfig);

      })
      .then(() => {
        // Always return the full config api

        console.log('\n\ninit() 3rd then, return api: ', api);

        return api;
      })
      .catch(e => {
        console.log('init error: ', e);
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
              config: {
                useNewUrlParser: true
              }
            }
          },
          test: {
            database: {
              url: 'mongodb://localhost/mongoose_test',
              config: {
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
              config: {
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
        console.log('Api: ', api.init());

        throw new Error('\nApi: ' + api.config + '\nBluebird: ' + Bluebird.resolve() + '\nError reading "' + api.relativeConfigFile() + '". Error: ' + api.error + '\nConfig relative path: ' + api.relativeConfigFile() + '\nConfig file: ' + api.getConfigFile() + '\n');
      }

      if (typeof api.rawConfig !== 'object') {
        throw new Error('Config must be an object or a promise for an object: ' + api.relativeConfigFile());
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

      // The Mongoose library needs a function passed in to its logging option
      if (api.rawConfig.logging && !_.isFunction(api.rawConfig.logging)) {
        api.rawConfig.logging = console.log;
      }

      // in case url is present - we overwrite the configuration
      if (api.rawConfig.url) {
        api.rawConfig = _.merge(api.rawConfig, api.parseDbUrl(api.rawConfig.url));
      } else if (api.rawConfig.use_env_variable) {
        api.rawConfig = _.merge(api.rawConfig, api.parseDbUrl(process.env[api.rawConfig.use_env_variable]));
      }

      api.config = api.rawConfig;
    }
    return api.config;
  },

  filteredUrl (url, config) {
    const regExp = new RegExp(':?' + _.escapeRegExp(config.password) + '@');
    return url.replace(regExp, ':*****@');
  },

  urlStringToConfigHash (urlString) {
    try {
      const urlParts = url.parse(urlString);
      let result = {
        database: urlParts.pathname.replace(/^\//, ''),
        host: urlParts.hostname,
        port: urlParts.port,
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
