/**
 * @class MongooseStorage
 */
export default class MongooseStorage {
  /**
   * Constructs MongoDB collection storage.
   *
   * @param {Object} [options]
   * Required either connection and collectionName OR collection
   * @param {String} [options.connection] - a connection to target database established with MongoDB Driver
   * @param {String} [options.collectionName] - name of migration collection in MongoDB
   * @param {String} [options.collection] - reference to a MongoDB Driver collection
   */
  constructor ({ connection, collectionName, collection }) {
    this.connection = connection;
    this.collection = collection;
    this.collectionName = collectionName || 'migrations';

    if (!this.connection && !this.collection) {
      throw new Error('MongoDB Connection or Collection required');
    }

    if (!this.collection) {
      this.collection = this.connection.collection(this.collectionName);
    }
  }

  /**
   * Logs migration to be considered as executed.
   *
   * @param {String} migrationName - Name of the migration to be logged.
   * @returns {Promise}
   */
  logMigration (migrationName) {
    return this.collection.insertOne({ name: migrationName, created_at: Date.now() });
  }

  /**
   * Unlogs migration to be considered as pending.
   *
   * @param {String} migrationName - Name of the migration to be unlogged.
   * @returns {Promise}
   */
  unlogMigration (migrationName) {
    return this.collection.removeOne({ name: migrationName });
  }

  /**
   * Gets list of executed migrations.
   *
   * @returns {Promise.<String[]>}
   */
  executed () {
    return this.collection
      .find({})
      .sort({ name: 1 })
      .toArray()
      .then(records => records.map(r => r.name));
  }
}
