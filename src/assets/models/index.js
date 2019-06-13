'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(<%= configFile %>)[env];
const db = {};

if (config.database.use_env_variable) {
  mongoose.connect(process.env[config.use_env_variable], config);
} else if (config.database.url) {
  mongoose.connect(config.database.url, config.database.config);
} else if (config.database.config.dbName) {
  mongoose.connect(`${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}`, config.database.config);
} else {
 mongoose.connect(`${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`, config.database.config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = importModels(path.join(__dirname, file));
    db[model.name] = model;
  });


db.mongoose = mongoose;

module.exports = db;


/**
 * Everything here is not to be touched
 */

// save imported models
importCache = {};

function stack() {
  const orig = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const err = new Error();
  Error.captureStackTrace(err, stack);
  const errStack = err.stack;
  Error.prepareStackTrace = orig;
  return errStack;
}

  /**
   * Imports a model defined in another file. Imported models are cached, so multiple
   * calls to import with the same path will not load the file multiple times.
   *
   * @credit https://github.com/sequelize/sequelize/blob/master/lib/sequelize.js#L466
   *
   * @param {string} importPath The path to the file that holds the model you want to import. If the part is relative, it will be resolved relatively to the calling file
   *
   * @returns {Model} Imported model, returned from cache if was already imported
   */
  importModels(importPath) {
    // is it a relative path?
    if (path.normalize(importPath) !== path.resolve(importPath)) {
      // make path relative to the caller
      const callerFilename = stack()[1].getFileName();
      const callerPath = path.dirname(callerFilename);

      importPath = path.resolve(callerPath, importPath);
    }

    if (!importCache[importPath]) {
      let defineCall = arguments.length > 1 ? arguments[1] : require(importPath);
      if (typeof defineCall === 'object') {
        // ES6 module compatibility
        defineCall = defineCall.default;
      }
      importCache[importPath] = defineCall(this, DataTypes);
    }

    return importCache[importPath];
  }

