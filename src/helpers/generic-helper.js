import path from 'path';

const resolve = require('resolve').sync;
import getYArgs from '../core/yargs';

const args = getYArgs().argv;

const generic = {
  getEnvironment: () => {
    return args.env || process.env.NODE_ENV || 'development';
  },

  getMongoose: file => {
    const resolvePath = file ? path.join('mongoose', file) : 'mongoose';
    const resolveOptions = { basedir: process.cwd() };

    let mongoosePath;

    try {
      mongoosePath = require.resolve(resolvePath, resolveOptions);
    } catch (e) {}

    try {
      mongoosePath = mongoosePath || resolve(resolvePath, resolveOptions);
    } catch (e) {
      console.error(
        'Unable to resolve mongoose package in ' + process.cwd() + '.\n Are you sure you installed mongoose package?',
      );
      process.exit(1);
    }

    return require(mongoosePath);
  },
};

module.exports = generic;
module.exports.default = generic;
