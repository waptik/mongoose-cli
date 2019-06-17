'use strict';

const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

if (config.database.url) {
  mongoose.connect(config.database.url, config.database.config);
} else {
  //const d = `${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`;

  mongoose.connect(`${config.database.protocol}://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`, config.database.config);
}

console.log('mongoose: ', mongoose.connection);
