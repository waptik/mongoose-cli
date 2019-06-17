# Welcome to mongoosejs-cli 👋
<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D11.0.0-blue.svg" />
  <a href="https://github.com/waptik/mongoose-cli#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/waptik/mongoose-cli/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/waptik/mongoose-cli/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://twitter.com/_waptik">
    <img alt="Twitter: _waptik" src="https://img.shields.io/twitter/follow/_waptik.svg?style=social" target="_blank" />
  </a>
</p>
[![Build Status](https://travis-ci.org/waptik/mongoose-cli.svg?branch=master)](https://travis-ci.org/waptik/mongoose-cli) [![Greenkeeper badge](https://badges.greenkeeper.io/waptik/mongoose-cli.svg)](https://greenkeeper.io/)


> A command line interface (CLI) for Mongoose to generate models and migrations ith ease.

### 🏠 [Homepage](https://github.com/waptik/mongoose-cli)

## Prerequisites

- node >=11.0.0
- yarn >= 1.16.0
- mongoosejs >= 5.5.12

## Install

### Globally

```sh
yarn global add mongoosejs-cli
```

### Locally

```sh
yarn add mongoosejs-cli
```
## Note
We'll be using the following shorthand for the package name's command depending on your scope of installation:
> - [mongoose_pkg_name]
>   - globally:  `mongoose`
>   - locally: `node .\node_modules\.bin\mongoose`


## Usage

### To display list of commands, do the following

```sh
[mongoose_pkg_name]
```

### To initialize the project

We recommend that after viewing the lis of commands, first thing to do, is to generate the required files and directories needed to get started. It can achieved by entering the following command.

```sh
[mongoose_pkg_name] init
```

This will generate the following:

```sh
 config/
  config.json
 models/
  index.js
 migrations/
```


- config/ => the directory containing all your configuration files
-  config.json => the default configuration files that contains the database connection strings based on the environment(NODE_ENV). You can add extra environments as well.
- models/ => the directory that contains all your mongoose models you generated through the package
-  index.js => this file does the database connection and imports all your models
- migrations/ => directory containing all your migration files

## Run tests

```sh
yarn test
```

## Author

👤 **Stephane Mensah**

* Twitter: [@_waptik](https://twitter.com/_waptik)
* Github: [@waptik](https://github.com/waptik)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/waptik/mongoose-cli/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [Stephane Mensah](https://github.com/waptik).<br />
This project is [MIT](https://github.com/waptik/mongoose-cli/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_