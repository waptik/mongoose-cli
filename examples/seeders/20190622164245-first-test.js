'use strict';

module.exports = {
  up: models => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return models.Test.bulkWrite([
        {
          insertOne: {
          document: {
            name: 'first test'
          }
        }
      }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    */
    return models.Test.bulkWrite([
      {
        insertOne: {
          document: {
            name: 'first test'
          }
        }
      }
    ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: models => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return models.Test.bulkWrite([
        {
        deleteOne: {
          filter: {
            name: 'first test'
          }
        }
      }
      ]).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    */

    return models.Test.bulkWrite([
      {
        deleteOne: {
          filter: {
            name: 'first test'
          }
        }
      }
    ]).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
    });
  }
  
};
