import path from 'path';
import _ from 'lodash';
import helpers from './index';

const storage = {
  migration: 'mongodb',
  seeder: 'none'
};
const storageCollectionName = {
  migration: 'mongoose_migrations_meta',
  seeder: 'mongoose_seeder_data'
};

const storageJsonName = {
  migration: 'mongoose-migrations.json',
  seeder: 'mongoose-seeders.json'
};

module.exports = {
  getStorageOption (property, fallback) {
    return helpers.config.readConfig()[property] || fallback;
  },

  getStorage (type) {
    return this.getStorageOption(type + 'Storage', storage[type]);
  },

  getStoragePath (type) {
    const fallbackPath = path.join(process.cwd(), storageJsonName[type]);

    return this.getStorageOption(type + 'StoragePath', fallbackPath);
  },

  getCollectionName (type) {
    return this.getStorageOption(type + 'StorageCollectionName', storageCollectionName[type]);
  },

  getStorageOptions (type, extraOptions) {
    const options = {};

    if (this.getStorage(type) === 'json') {
      options.path = this.getStoragePath(type);
    } else if (this.getStorage(type) === 'mongodb') {
      options.collectionName = this.getCollectionName(type);
    } else {
      options.collectionName = this.getCollectionName(type);
    }

    _.assign(options, extraOptions);

    return options;
  }
};
