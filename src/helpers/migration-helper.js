import _ from 'lodash';
import helpers from './index';

const Mongoose = helpers.generic.getMongoose();

module.exports = {
  getCollectionName (modelName) {
    return Mongoose.pluralize(modelName);
  },

  generateCollectionCreationFileContent (args) {
    return helpers.template.render('migrations/create-table.js', {
      tableName: this.getCollectionName(args.name),
      attributes: helpers.model.transformAttributes(args.attributes),
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  },

  generateMigrationName (args) {
    return _.trimStart(_.kebabCase('create-' + args.name), '-');
  },

  generateCollectionCreationFile (args) {
    const migrationName = this.generateMigrationName(args);
    const migrationPath = helpers.path.getMigrationPath(migrationName);

    helpers.asset.write(migrationPath, this.generateCollectionCreationFileContent(args));
  }
};
