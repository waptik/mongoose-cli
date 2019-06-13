import _ from 'lodash';
import helpers from './index';

module.exports = {
  generateTableCreationFileContent(args) {
    return helpers.template.render('migrations/create-table.js', {
      tableName: this.getTableName(args.name),
      attributes: helpers.model.transformAttributes(args.attributes),
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
  },

  generateMigrationName(args) {
    return _.trimStart(_.kebabCase('create-' + args.name), '-');
  },

  generateTableCreationFile(args) {
    const migrationName = this.generateMigrationName(args);
    const migrationPath = helpers.path.getMigrationPath(migrationName);

    helpers.asset.write(migrationPath, this.generateTableCreationFileContent(args));
  },
};
