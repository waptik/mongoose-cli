<h1 align="center">Welcome to mongoosejs-cli 👋</h1>
<p>
  <a href="https://badge.fury.io/js/mongoosejs-cli">
    <img alt="npm version" src="https://badge.fury.io/js/mongoosejs-cli.svg" target="_blank" />
  </a>
  <a href="https://github.com/waptik/mongoose-cli#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/waptik/mongoose-cli/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/waptik/mongoose-cli/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://travis-ci.org/waptik/mongoose-cli">
    <img alt="Build Status" src="https://travis-ci.org/waptik/mongoose-cli.svg?branch=master" target="_blank" />
  </a>
  <a href="https://greenkeeper.io/waptik/mongoose-cli">
    <img alt="Greenkeeper badge" src="https://badges.greenkeeper.io/waptik/mongoose-cli.svg" target="_blank" />
  </a>
</p>

[![npm](https://nodei.co/npm/mongoosejs-cli.png)](https://www.npmjs.com/package/mongoosejs-cli)

### 🏠 [Homepage](https://github.com/waptik/mongoose-cli)

![mongoosejs-cli logo](https://github.com/waptik/mongoose-cli/blob/master/.github/images/logo.svg)

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [CLI Options](#options)
- [Contributing](#contributing)
- [FAQ](#faq)
- [Documentation](#documentation)
- [Credits](#credits)
- [License](#license)

## Introduction
This package, Mongoosejs-cli, is a package for nodejs to help generate and run migrations and seeders for mongoosejs with ease.

>Note that this is an unofficial CLI package for [mongoosejs](https://github.com/Automattic/mongoose).

## Prerequisites🔨

- node >=11.0.0
- yarn >= 1.16.0 || npm >= 6.0.0
- mongoosejs >= 5.5.12

## Installation🛠

### Globally
There are two ways to of installing and using this package:

```sh
yarn global add mongoosejs-cli
```

> - Usage
>   - mongoose

### Locally

```sh
yarn add mongoosejs-cli
```

> - Usage
>   - npx mongoosejs-cli

### Note 📓
It is recommended to install the package in your project(local). We'll be using the local approach in the following examples.


## Usage

Make sure you have mongoose already installed in your project before proceeding.

### To display list of options that the command has, do the following

```sh
npx mongoosejs-cli
```
You'll see the following on your terminal:

```sh
Mongoosee CLI [Node: 11.10.0, CLI: 1.0.5, ODM: 5.5.12]

mongoose [command]

Commands:
  mongoose db:migrate                        Run pending migrations
  mongoose db:migrate:status                 List the status of all migrations
  mongoose db:migrate:undo                   Reverts a migration
  mongoose db:migrate:undo:all               Revert all migrations ran
  mongoose db:seed                           Run specified seeder
  mongoose db:seed:undo                      Deletes data from the database
  mongoose db:seed:all                       Run every seeder
  mongoose db:seed:undo:all                  Deletes data from the database
  mongoose init                              Initializes project
  mongoose init:config                       Initializes configuration
  mongoose init:migrations                   Initializes migrations
  mongoose init:models                       Initializes models
  mongoose init:seeders                      Initializes seeders
  mongoose migration:generate                Generates a new migration file             [aliases: migration:create]
  mongoose model:generate                    Generates a model and its migration            [aliases: model:create]
  mongoose seed:generate                     Generates a new seed file                       [aliases: seed:create]

Options:
  --help     Show help                                                                                    [boolean]
  --version  Show version number                                                                          [boolean]
```

### To initialize the project

We recommend that after viewing the lis of commands, first thing to do, is to generate the required files and directories needed to get started. It can achieved by entering the following command.

```sh
npx mongoosejs-cli init
```

This will generate the following:

```sh
 config/
  config.json
 models/
  index.js
 migrations/
 seeders/
```


- config/ => the directory containing all your configuration files
  -  config.json => the default configuration files that contains the database connection strings based on the environment(NODE_ENV). You can add extra environments as well.
- models/ => the directory that contains all your mongoose models you generated through the package
  -  index.js => this file does the database connection and imports all your models
- migrations/ => directory containing all your migration files
- seeders/ => directory containing all your seed files

## Options

### Changing path

By default, mongoosejs-cli generates the migrations, seeders and models directories and files in the root directory of your project. To change this behaviour, create a new file called `.mongooserc` manually or use the the following command:

```sh
touch .mongooserc
```

and paste the following code inside the new created file

```js
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'database.json'),
  'models-path': path.resolve('db', 'models'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
}
```

Now the CLI will look for its
- configuration settings inside ./config/database.json
- models files inside ./db/models/
- migration files inside ./db/migrations/
- seed files inside ./db/seeders/

### Configuration file

By default the CLI will try to use the file `config/config.js`. You can modify that path either via the `--config` flag or via the option mentioned earlier. Here is how a configuration file might look like (this is the one that `npx mongoosejs-cli init` generates):

```json
{
  "development": {
    "database": {
      "url": "mongodb://localhost/mongoose_dev",
      "options": {
        "useNewUrlParser": true
      }
    }
  },
  "test": {
    "database": {
      "url": "mongodb://localhost/mongoose_test",
      "options": {
        "useNewUrlParser": true
      }
    }
  },
  "production": {
    "database": {
      "protocol": "mongodb",
      "username": "root",
      "password": "password",
      "name": "database_production",
      "host": "localhost",
      "port": "",
      "options": {
        "useNewUrlParser": true
      }
    }
  }
}
```


### Configuration for connecting over SRV

In case you are using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or any other services that supports srv, kindly remove database name known as `"name"` from the database main object and assign its value to a new string called `"dbName"` in the options object, such as the following.

```json
{

  "production": {
    "database": {
      "protocol": "mongodb+srv",
      "username": "root",
      "password": "password",
      "host": "subdomain.mongodb.com",
      "port": "",
      "options": {
        "useNewUrlParser": true,
        "dbName": "database_production",
      }
    }
  }
}
```

In case you want to use a url string instead, do the following

```json
{

  "production": {
    "database": {
      "url": "mongodb+srv://root:password@subdomain.mongodb.com/database_production",
      "options": {
        "useNewUrlParser": true,
        "dbName": "database_production",
      }
    }
  }
}
```

More coming soon...

## Contributing🤝
If you love this package, there are different ways in which you can contribute.

<details>
<summary> 👍 Show you Support</summary>

Give a ⭐️ if this project helped you!
</details>

<details><summary> General Issues or Feature Requests</summary>

### Reporting issues or bugs🐛

> Please make sure to read the full guidelines. Your issue may be closed without warning if you do not.

Before reporting a new issue, kindly check [issues page](https://github.com/waptik/mongoose-cli/issues) to see if similar issues haven't been solved yet. Else, go ahead and create a new issue.

> Github issues should follow specified template. When you start creating a new issue, an empty template will be made available to you.

Please make sure issue you are reporting is strictly related to Mongoosejs CLI.

### Proposing new features
If you want to propose new features to Mongoosejs CLI, you may ignore issue template. You still need to clearly state new feature. Feature request should give various examples, API suggestions and references to support idea behind it.

### Fixing Bugs or Implementing Features

1. Preparing your environment

Start by cloning Mongoosejs CLI repo

```sh
$ git clone git@github.com:waptik/mongoose-cli.git

$ git clone https://github.com/waptik/mongoose-cli.git # Using HTTPS
```

Make sure you have all required dependencies, you will need

- Node v10 or above
- Yarn v1.16 or above

Now go to cloned repository folder

```sh
$ cd /path/to/cloned/repository
```

Install required modules

```sh
$ yarn
```

### Running tests

```sh
$ yarn test
```

Test can take about 7 to 10 minutes to finish, subjected to hardware configuration.
</details>

<details><summary>Improving Documentation</summary>

If you want to improve or expand our documentation you can start with this readme file.
</details>

## FAQ
The Mongoosejs Command Line Interface (CLI) Frequently Asked Question

### Initialize mongoose to create necessary files in the project
```
$ npx mongoosejs-cli init
```

### How can I generate a model?
Specify model name with `--name` argument. List of table fields can be passed with `--attributes` option. Note that the datatypes are using [Mongoose SchemaTypes](https://mongoosejs.com/docs/schematypes.html) when defining them using the CLI.
```
$ npx mongoosejs-cli model:create --name User --attributes name:String,state:Boolean,birth:Date,card:Number
```

You can create your own custom datatypes as plugins after the model file has been generated for you. Refer to [Mongoose Plugins](https://mongoosejs.com/docs/plugins.html), on how to do so.

### How can I create a migration?
Specify migration name with `--name` argument
```
$ npx mongoosejs-cli migration:create --name <migration_name>
```

### How do call/use a model defined?
You can call/use a model(eg: Player) by doing the following:
```js
const models = require('path_to_models_folder');

const players = await models.Player.find({});

console.log(players) // will print players collection
```

### What is the command to execute all migrations?
```
$ npx mongoosejs-cli db:migrate
```
### How can I make a migrations rollback?
```
$ npx mongoosejs-cli db:migrate:undo:all
```

### How can I create a seeder?
Specify seeder name with `--name` argument
```
$ npx mongoosejs-cli seed:create --name <seeder_name>
```

### How can I run the seeders?
```
$ npx mongoosejs-cli db:seed:all
```

### How can I make the seeders rollback?
```
$ npx mongoosejs-cli db:seed:undo:all
```

### Do you have an example of how the structure of the project look like?
Yes. Please check the [examples](https://github.com/waptik/mongoose-cli/blob/master/examples/) folder in this project. Screenshots can also be found [here](https://github.com/waptik/mongoose-cli/blob/master/.github/images/screenshots)


## Documentation📓

- [Mongoosejs Documentation](https://mongoosejs.com/docs/index.html)
- [CLI Options](#options)
- [Frequently Asked Questions](#faq)


## Credits👌
This package would not have been made possible if not for the following:
- [Mongoosejs](https://github.com/Automattic/mongoose) Contributors and maintainers for the awesome ORM specially for mongodb on nodejs
- [Sequelize](https://github.com/sequelize) for their [CLI](https://github.com/sequelize/cli), which Mongoosejs-cli structure was heavily based on.
- [Kefranabg](https://github.com/kefranabg), for his [readme-md-generator](https://github.com/kefranabg/readme-md-generator) package which generated the skeleton for this readme file.
- Nodejs, Yarnpkg, NPM etc...

## License📝

Copyright © 2019 [Stephane Mensah](https://github.com/waptik).<br />
This project is [MIT](https://github.com/waptik/mongoose-cli/blob/master/LICENSE) licensed.

## Author

👤 **Stephane Mensah**

* Twitter: [@_waptik](https://twitter.com/_waptik)
* Github: [@waptik](https://github.com/waptik)


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
