import _ from 'lodash';
import helpers from './index';

const storage = {
  migration: 'mongodb',
  seeder: 'none',
};
const storageCollectionName = {
  migration: 'mongoose_migrations_meta',
  seeder: 'mongoose_seeder_data',
};

module.exports = {
  getStorageOption(property, fallback) {
    return helpers.config.readConfig()[property] || fallback;
  },

  getStorage(type) {
    return this.getStorageOption(type + 'Storage', storage[type]);
  },

  getCollectionName(type) {
    return this.getStorageOption(type + 'StorageCollectionName', storageCollectionName[type]);
  },

  getSchema(type) {
    return this.getStorageOption(type + 'StorageCollectionSchema', undefined);
  },

  getStorageOptions(type, extraOptions) {
    const options = {};

    if (this.getStorage(type) === 'mongoose') {
      options.collectionName = this.getCollectionName(type);
    }

    _.assign(options, extraOptions);

    return options;
  },
};
