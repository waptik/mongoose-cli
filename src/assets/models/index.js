'use strict';

const fs = require('fs');
const path = require('path');
const Mongoose = require('mongoose');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(<%= configFile %>)[env];
const db = {};
const models = Mongoose.modelNames();

let mongoose;
if (config.use_env_variable) {
  mongoose = mongoose.connect(process.env[config.use_env_variable], config);
} else {
  sequelize = Mongoose.connect(`${config.database.protocol}://${config.username}:${config.password}@${config.database.host}:${databse.port}/${config.database.name}`, database.config);
}

models.forEach(model => {
    db[model] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.mongoose = mongoose;

module.exports = db;
