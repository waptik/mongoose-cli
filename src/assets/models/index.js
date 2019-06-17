'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(<%= configFile %>)[env];
const db = {};

if (config.database.url) {
  mongoose.connect(config.database.url, config.database.config);
} else if (config.database.config.dbName) {
  mongoose.connect(`${protocol}://${username}:${password}@${host}:${port}`, config.database.config);
} else {
  mongoose.connect(`${protocol}://${username}:${password}@${host}:${port}/${database}`, config.database.config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.resolve(__dirname, file));
    db[model.name] = model;
  });

db.mongoose = mongoose;

module.exports = db;
