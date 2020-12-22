import fs from 'fs';
import yargs from 'yargs';
import path from 'path';

function loadRCFile(optionsPath) {
  const rcFile = optionsPath || path.resolve(process.cwd(), '.mongooserc') || path.resolve(process.cwd(), 'mongoose.json');
  const rcFileResolved = path.resolve(rcFile);
  return fs.existsSync(rcFileResolved) ? JSON.parse(JSON.stringify(require(rcFileResolved))) : {};
}

const args = yargs
  .help(false)
  .version(false)
  .config(loadRCFile(yargs.argv.optionsPath));

export default function getYArgs() {
  return args;
}

export function _baseOptions(yargs) {
  return yargs
    .option('config', {
      describe: 'The path to the config file',
      type: 'string'
    })
    .option('debug', {
      describe: 'When available show various debug information',
      default: false,
      type: 'boolean'
    })
    .option('env', {
      describe: 'The environment to run the command in',
      default: 'development',
      type: 'string'
    })
    .option('migrations-path', {
      describe: 'The path to the migrations folder',
      default: 'migrations',
      type: 'string'
    })
    .option('models-path', {
      describe: 'The path to the models folder',
      default: 'models',
      type: 'string'
    })
    .option('options-path', {
      describe: 'The path to a JSON file with additional options',
      default: './',
      type: 'string'
    })
    .option('seeders-path', {
      describe: 'The path to the seeders folder',
      default: 'seeders',
      type: 'string'
    });
}
