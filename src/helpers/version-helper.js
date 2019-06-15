import path from 'path';
import helpers from './index';

const packageJson = require(path.resolve(__dirname, '..', '..', 'package.json'));

module.exports = {
  getCliVersion () {
    return packageJson.version;
  },

  getOdmVersion () {
    return helpers.generic.getMongoose('package.json').version;
  },

  getNodeVersion () {
    return process.version.replace('v', '');
  }
};
