const fs = require('fs');
const path = require('path');
const Mongoose = require('mongoose');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(<%= configFile %>)[env];

if (config.database.url) {
  Mongoose.connect(config.database.url, config.database.options);
} else if (config.database.config.dbName) {
  Mongoose.connect(`${protocol}://${username}:${password}@${host}:${port}`, config.database.options);
} else {
  Mongoose.connect(`${protocol}://${username}:${password}@${host}:${port}/${database}`, config.database.options);
}

const db = () => {
  const m = {};

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = require(path.resolve(__dirname, file))(Mongoose);
      m[model.modelName] = model;
    });

  return m;
}


const models = db();
const mongoose = Mongoose;

module.exports = mongoose;
module.exports.default = models;