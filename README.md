<h1 align="center">Welcome to mongoosejs-cli 👋</h1>
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

> A command line interface (CLI) for Mongoose to generate models and migrations ith ease.

### 🏠 [Homepage](https://github.com/waptik/mongoose-cli)

## Prerequisites

- node >=11.0.0
- yarn >= 1.16.0
- mongoosejs >= 5.5.12

## Install

- You can install it globally

```sh
yarn global add mongoosejs-cli
```

- or locally

```sh
yarn add mongoosejs-cli
```
## Note
We'll be using the following shorthand for the package name depending on your scope of installation:
- [mongoose]
  - globally:  `mongoose`
  - locally: `node .\node_modules\.bin\mongoose`


## Usage

To display list of commands, do the following

```sh
[mongoose]
```

We recommend that after viewing the lis of commands, first thing to do, is to generate the required files and directories needed to get started. It can achieved by entering the following command.

```sh
[mongoose] init
```

This will generate the following:

```sh
- config/ => the directory containing all your configuration files
  config.json => the default configuration files that contains the database connection strings based on the environment(NODE_ENV). You can add extra environments as well.
- models/ => the directory that contains all your mongoose models you generated through the package
  index.js => this file does the database connection and imports all your models
- migrations/ => directory containing all your migration files
```

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